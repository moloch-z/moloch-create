const prompts = require("prompts");
const fs = require("fs");
const { writeFile } = require("../utils");

async function initPrettier() {
  return await prompts([
    {
      type: "toggle",
      name: "vscode",
      message: "use vscode?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ]);
}
function initVSCodeFile(config) {
  const {
    prettier: { vscode },
  } = config;
  if (!vscode) {
    return;
  }
  config.files.vscodeConfig = {
    "editor.tabSize": 2,
    "typescript.updateImportsOnFileMove.enabled": "always",
    "javascript.updateImportsOnFileMove.enabled": "always",
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "editor.formatOnType": true,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true,
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "prettier.semi": false,
    "prettier.trailingComma": "none",
    "prettier.singleQuote": true,
    "prettier.endOfLine": "auto",
    "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"],
    "eslint.validate": ["vue", "typescript", "javascript", "javascriptreact"],
    "eslint.workingDirectories": [
      ".eslintrc",
      {
        mode: "location",
      },
    ],
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
  };
}
function initPrettierFile(config) {
  config.files.prettierrc = {
    printWidth: 140,
    singleQuote: true,
    semi: false,
    trailingComma: "none",
    bracketSameLine: true,
    arrowParens: "avoid",
    endOfLine: "auto",
    htmlWhitespaceSensitivity: "ignore",
    overrides: [
      {
        files: [".prettierrc", ".eslintrc", ".stylelintrc", ".lintstagedrc"],
        options: { parser: "json" },
      },
    ],
  };
  const devDependencies = {
    prettier: "^2.8.3",
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-prettier": "^4.2.1",
    "stylelint-config-prettier": "^9.0.3",
  };

  Object.assign(config.files.pkg.devDependencies, devDependencies);
  initVSCodeFile(config);
}

function renderPrettier(config) {
  const { files, projectPath } = config;
  const { prettierrc, vscodeConfig } = files;

  writeFile(`${projectPath}/.prettierrc`, prettierrc);

  const vscodePath = `${projectPath}/.vscode`;
  if (!fs.existsSync(vscodePath)) {
    fs.mkdirSync(vscodePath);
  }
  writeFile(`${vscodePath}/settings.json`, vscodeConfig);

}

module.exports = { initPrettier, initPrettierFile, renderPrettier };
