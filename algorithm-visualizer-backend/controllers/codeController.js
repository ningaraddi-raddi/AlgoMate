



const axios = require("axios");

/**
 * Injects tracing calls into the user's C++ function code.
 * This version is generic and works by modifying the user's code string.
 * @param {string} userCode - The C++ code for the recursive function.
 * @param {string} functionName - The name of the function to trace.
 * @param {number} testInput - The initial input value for the function.
 * @returns {string} The full C++ source code ready for execution.
 */
function wrapUserCode(userCode, functionName, testInput) {
  // 1. Inject traceEnter() at the beginning of the function.
  // Finds the first opening brace '{' after the function signature.
  let modifiedCode = userCode.replace(
    new RegExp(`(int\\s+${functionName}\\s*\\(int\\s+n\\)\\s*\\{)`),
    `$1\n  traceEnter("${functionName}", to_string(n));`
  );

  // 2. Wrap every return statement to inject traceExit().
  // This regex finds 'return ...;' and wraps it to capture the value first.
  modifiedCode = modifiedCode.replace(/return\s+(.*?);/g, (match, group1) => {
    // Create a block to correctly scope the temporary result variable.
    return `{
    int __res = ${group1};
    traceExit("${functionName}", to_string(n), to_string(__res));
    return __res;
  }`;
  });

  // 3. Assemble the full C++ code with helpers and the main driver.
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

// --- USER FUNCTION (NOW WITH TRACING INJECTED) ---
${modifiedCode}

// --- DRIVER ---
int main() {
    cout << "TRACE_BEGIN" << endl;
    int result = ${functionName}(${testInput});
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
  // Isolate the trace part of the output
  const traceOutput = stdout.substring(
    stdout.indexOf("TRACE_BEGIN") + 11,
    stdout.indexOf("TRACE_END")
  );
  const lines = traceOutput.split("\n").filter(line => line.trim() !== "");
  let result = null;

  // Find the final result from the line after TRACE_END
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

// --- Controller ---
exports.runCode = async (req, res) => {
  const { userCode, functionName, testInput } = req.body;

  if (!userCode || !functionName || testInput === undefined) {
    return res.status(400).json({ error: "Missing userCode, functionName, or testInput" });
  }

  // Use the corrected wrapping function
  const fullCode = wrapUserCode(userCode, functionName, testInput);

  try {
    // Send code to Judge0 API
    const submission = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: fullCode,
        language_id: 54, // C++ (GCC 9.2.0)
      },
      {
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, // Ensure this is set in your .env file
        },
      }
    );

    const { stdout, stderr, compile_output, status } = submission.data;

    if (status.id > 3) { // Any status above "Accepted" is an error
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
};





