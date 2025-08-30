




const express = require("express");
const axios = require("axios");
const router = express.Router();
const { Buffer } = require("buffer");

/**
 * Injects tracing calls into the user's C++ function code.
 * This version is generic and works by modifying the user's code string to trace
 * every recursive call.
 * @param {string} userCode - The C++ code for the recursive function.
 * @param {string} functionName - The name of the function to trace.
 * @param {number} testInput - The initial input value for the function.
 * @returns {string} The full C++ source code ready for execution.
 */
function wrapUserCode(userCode, functionName, testInput) {
  const tracedFunctionName = `traced_${functionName}`;

  let modifiedCode = userCode.replace(
    new RegExp(`\\b${functionName}\\s*\\(`, "g"),
    `${tracedFunctionName}(`
  );

  modifiedCode = modifiedCode.replace(
    new RegExp(`(int\\s+)${functionName}(\\s*\\(int\\s+n\\)\\s*\\{)`),
    `$1${tracedFunctionName}$2`
  );

  modifiedCode = modifiedCode.replace(
    new RegExp(`(int\\s+${tracedFunctionName}\\s*\\(int\\s+n\\)\\s*\\{)`),
    `$1\n  traceEnter("${functionName}", to_string(n));`
  );

  modifiedCode = modifiedCode.replace(/return\s+(.*?);/g, (match, group1) => {
    return `{
    int __res = ${group1};
    traceExit("${functionName}", to_string(n), to_string(__res));
    return __res;
  }`;
  });

  return `
#include <iostream>
#include <string>
using namespace std;

// --- TRACE HELPERS ---
void traceEnter(const string &func, const string &args) {
    cout << "[CALL] " << func << "(" << args << ")" << endl;
}

void traceExit(const string &func, const string &args, const string &result) {
    cout << "[RET] " << func << "(" << args << ") = " << result << endl;
}

// --- USER FUNCTION (MODIFIED FOR FULL TRACING) ---
${modifiedCode}

// --- DRIVER ---
int main() {
    cout << "TRACE_BEGIN" << endl;
    int result = ${tracedFunctionName}(${testInput});
    cout << "TRACE_END" << endl;
    cout << result << endl;
    return 0;
}
`;
}


/**
 * Parses the raw stdout from the executed code into structured steps for the frontend.
 * @param {string} stdout - The standard output from the Judge0 API.
 * @returns {{steps: Array, result: number|null}}
 */
function parseTrace(stdout) {
  const steps = [];
  const traceOutput = stdout.substring(
    stdout.indexOf("TRACE_BEGIN") + 11,
    stdout.indexOf("TRACE_END")
  );
  const lines = traceOutput.split("\n").filter(line => line.trim() !== "");
  let result = null;

  const resultMatch = stdout.match(/TRACE_END\s*(\d+)/);
  if (resultMatch) {
    result = parseInt(resultMatch[1], 10);
  }

  lines.forEach(line => {
    if (line.startsWith("[CALL]")) {
      const match = line.match(/\[CALL\]\s(\w+)\((.*)\)/);
      if (match) {
        steps.push({ type: "call", label: match[1], raw: line });
      }
    } else if (line.startsWith("[RET]")) {
      const match = line.match(/\[RET\]\s(\w+)\((.*)\)\s=\s(.*)/);
      if (match) {
        steps.push({ type: "return", label: match[1], value: match[3], raw: line });
      }
    }
  });

  return { steps, result };
}

// --- Route Handler ---
router.post("/run", async (req, res) => {
  const { userCode, functionName, testInput } = req.body;

  if (!userCode || !functionName || testInput === undefined) {
    return res.status(400).json({ error: "Missing userCode, functionName, or testInput" });
  }

  const fullCode = wrapUserCode(userCode, functionName, testInput);
  
  // --- FIX: Encode the source code in Base64 ---
  const encodedCode = Buffer.from(fullCode).toString("base64");

  try {
    // --- FIX: Change the API endpoint to use base64_encoded=true ---
    const submission = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
      {
        source_code: encodedCode, // Send the encoded code
        language_id: 54,
      },
      {
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    // --- FIX: Decode the response fields from Base64 ---
    const stdout = submission.data.stdout ? Buffer.from(submission.data.stdout, "base64").toString("utf-8") : "";
    const stderr = submission.data.stderr ? Buffer.from(submission.data.stderr, "base64").toString("utf-8") : "";
    const compile_output = submission.data.compile_output ? Buffer.from(submission.data.compile_output, "base64").toString("utf-8") : "";
    const status = submission.data.status;

    if (status.id > 3) {
        return res.status(400).json({
            error: "Code execution failed.",
            status,
            stderr,
            compile_output
        });
    }

    const parsed = parseTrace(stdout || "");

    res.json({
      status,
      result: parsed.result,
      steps: parsed.steps,
      stdout: stdout || "",
      stderr: stderr || "",
      compile_output: compile_output || "",
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "An error occurred while executing the code." });
  }
});

module.exports = router;








