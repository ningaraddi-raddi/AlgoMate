# API Documentation for Algorithm Visualizer Backend

## Health Check Endpoint

### GET /

- Description: Simple health check endpoint to verify the backend server is running.
- URL: `/`
- Method: GET
- Request Body: None
- Response:
  - Status 200 OK
  - Body: Plain text message `"Judge0 Backend API Running ✅"`

---

## Run Code with Tracing

### POST /api/code/run

- Description: Executes user-provided C++ recursive function code with tracing enabled. Returns the trace of function calls and results.
- URL: `/api/code/run`
- Method: POST
- Request Body (JSON):
  ```json
  {
    "userCode": "string",        // The C++ code for the recursive function
    "functionName": "string",    // The name of the function to trace
    "testInput": number          // The input value to pass to the function
  }
  ```
- Response Body (JSON):
  ```json
  {
    "status": {                  // Status object from Judge0 API
      "id": number,
      "description": "string"
    },
    "result": number|null,       // The final result of the function execution
    "steps": [                   // Array of trace steps
      {
        "type": "call" | "return",
        "label": "string",       // Function name
        "value": "string",       // Return value (only for return steps)
        "raw": "string"          // Raw trace line from output
      }
    ],
    "stdout": "string",          // Raw standard output from execution
    "stderr": "string",          // Standard error output, if any
    "compile_output": "string"   // Compiler output, if any
  }
  ```
- Error Responses:
  - 400 Bad Request: Missing required fields or code execution failure.
  - 500 Internal Server Error: Server error during code execution.

---

# Notes

- The backend uses the Judge0 API to compile and run the C++ code.
- The code is automatically modified to inject tracing calls for recursive function calls.
- The trace output is parsed and returned as structured steps for frontend visualization.
