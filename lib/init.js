const fs = require("fs");

const {
  initESLint,
  initStylelint,
  initPrettier,
  initGitHooks,
  initESLintFile,
  initPrettierFile,
  initStylelintFile,
  initGitHooksFile,
  renderESLint,
  renderStylelint,
  renderGitHooks,
  renderPrettier,
  renderPackage,
} = require("../src/index.js");

let projectConfig = {};


async function init(projectName) {
  projectConfig = {
    files: {
      pkg: {
        name: projectName,
        version: "0.0.0",
        description: "",
        main: "index.js",
        scripts: {
          start: "node index.js",
        },
        license: "ISC",
        devDependencies: {
          eslint: "^8.32.0",
          "eslint-config-prettier": "^8.6.0",
          "eslint-plugin-jsdoc": "^39.6.9",
          "eslint-plugin-prettier": "^4.2.1",
        },
      },
    },
  };
  projectConfig.name = projectName
  const cwd = process.cwd();
  projectConfig.cwd = cwd;
  projectConfig.projectPath = `${cwd}\/${projectName}`;

  projectConfig.eslint = await initESLint();
  projectConfig.stylelint = await initStylelint();
  projectConfig.prettier = await initPrettier();
  projectConfig.gitHooks = await initGitHooks();
  initFiles(projectConfig)
  renderTemplate(projectConfig)
}

function initFiles(config) {
  initESLintFile(config);
  initStylelintFile(config);
  initPrettierFile(config);
  initGitHooksFile(config);
}

function renderTemplate(config) {
  const { projectPath } = config;
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }
  renderESLint(config);
  renderStylelint(config);
  renderPrettier(config);
  renderGitHooks(config);
  renderPackage(config);
}
module.exports = {
  init
}