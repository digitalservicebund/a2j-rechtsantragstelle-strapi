const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");
const tsconfigPath = path.join(projectRoot, "tsconfig.json");

const baseCompilerOptions = {
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES2019,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  esModuleInterop: true,
  jsx: ts.JsxEmit.React,
};

const loadCompilerOptions = () => {
  let options = { ...baseCompilerOptions };

  if (!fs.existsSync(tsconfigPath)) {
    return options;
  }

  try {
    const tsconfigContent = fs.readFileSync(tsconfigPath, "utf8");
    const parsed = ts.parseConfigFileTextToJson(tsconfigPath, tsconfigContent);

    if (!parsed.error && parsed.config && parsed.config.compilerOptions) {
      options = {
        ...options,
        ...parsed.config.compilerOptions,
      };
    }
  } catch (error) {
    // Ignore tsconfig parsing errors and fallback to defaults
  }

  return options;
};

module.exports = {
  compilerOptions: loadCompilerOptions(),
  loadCompilerOptions,
};
