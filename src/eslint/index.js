const prompts = require("prompts");
const rules = require("./rules");
const { initTypescriptESlint } = require("./Typescript");
const { initVueESlintrc } = require("./vue");
const { writeFile } = require("../utils");



async function initESLint() {
  return prompts([
    {
      type: "toggle",
      name: "Typescript",
      message: "Use Typescript?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ]);
}
function initESLintFile(config) {
  config.files.eslintrc = {
    env: {
      browser: true,
      es2023: true,
    },
    extends: ["prettier"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["eslint-plugin-jsdoc"],
    overrides: [],
    globals: {
      process: true,
      __dirname: true,
    },
    rules,
  };

  initTypescriptESlint(config);

  initVueESlintrc(config);
}

function renderESLint(config) {
  const { files, projectPath } = config;
  const { eslintrc } = files;

  writeFile(`${projectPath}/.eslintrc`, eslintrc);
}
module.exports = { initESLint, renderESLint, initESLintFile };
