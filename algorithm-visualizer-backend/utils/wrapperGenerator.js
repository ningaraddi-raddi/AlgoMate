import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Step 1: Parse user C++ code using Clang AST parser
 */
export function parseCPPFileForFunctions(code) {
  const tmpFile = path.join(__dirname, 'tmp.cpp');
  fs.writeFileSync(tmpFile, code);

  // Run Clang AST parser (compiled from ast_parser.cpp)
  const output = execSync(`./ast_parser ${tmpFile}`).toString();

  const functions = [];
  let currentFunc = null;

  output.split('\n').forEach(line => {
    if (line.startsWith('FUNC_NAME')) {
      currentFunc = { name: line.split(' ')[1], args: [], returnType: null };
      functions.push(currentFunc);
    } else if (line.startsWith('RET_TYPE') && currentFunc) {
      currentFunc.returnType = line.split(' ')[1];
    } else if (line.startsWith('ARGS') && currentFunc) {
      const argsStr = line.replace('ARGS ', '').trim();
      if (argsStr.length) {
        currentFunc.args = argsStr.split(' ').map(a => {
          const [name, type] = a.split(':');
          return { name, type };
        });
      }
    }
  });

  return functions;
}

/**
 * Step 2: Generate traced wrapper for a recursive function
 */
export function generateTraceWrapper(func) {
  const argList = func.args.map(a => `${a.type} ${a.name}`).join(', ');
  const argPrints = func.args.map(a => `${a.name}=" << ${a.name}`).join(' << ", " << ');

  return `
${func.returnType} traced_${func.name}(${argList}) {
    std::cout << "[CALL] ${func.name}(${argPrints})\\n";
    ${func.returnType} result = ${func.name}(${func.args.map(a => a.name).join(', ')});
    std::cout << "[RET] ${func.name}(${argPrints}) = " << result << "\\n";
    return result;
}`;
}

/**
 * Step 3: Generate main driver
 */
export function generateMainDriver(func, testInputs) {
  const args = testInputs.map((v, i) => {
    if (Array.isArray(v)) {
      return `std::vector<int> v${i} = {${v.join(',')}}`;
    } else if (typeof v === 'number') {
      return `int arg${i} = ${v}`;
    }
  });

  const callArgs = testInputs.map((v, i) => (Array.isArray(v) ? `v${i}` : `arg${i}`));

  return `
int main() {
    ${args.join(';\n    ')};
    std::cout << traced_${func.name}(${callArgs.join(', ')}) << std::endl;
    return 0;
}`;
}
