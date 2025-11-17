const Module = require("module");
const { compilerOptions } = require("./ts-compiler-options");
const fs = require("fs");
const ts = require("typescript");

const extensions = Module._extensions;

if (!extensions[".ts"]) {
  extensions[".ts"] = function compileTS(module, filename) {
    const source = fs.readFileSync(filename, "utf8");
    const output = ts.transpileModule(source, {
      compilerOptions,
      fileName: filename,
      reportDiagnostics: false,
    });

    return module._compile(output.outputText, filename);
  };
}

if (!extensions[".tsx"]) {
  extensions[".tsx"] = extensions[".ts"];
}

module.exports = {
  compilerOptions,
};
