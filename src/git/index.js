const prompts = require("prompts");

const { writeFile } = require("../utils");

const gitHooksList = [
  { title: "lint-staged", value: "lint-staged", selected: true },
  { title: "commitlint", value: "commitizen", selected: true },
  { title: "husky", value: "husky", selected: true },
];
async function initGitHooks() {
  const { gitHooks } = await prompts([
    {
      type: "multiselect",
      name: "gitHooks",
      message: "git-hooks",
      choices: gitHooksList,
    },
  ]);

  const res = {};
  gitHooks.reduce((a, b) => {
    a[[b]] = b;
    return a;
  }, res);

  return Promise.resolve(res);
}
function initGitHooksFile(config) {
  const { gitHooks } = config
  let lintStaged = {}
  let commitlint = {}
  const husky = {}
  const devDependencies = {}

  if (gitHooks['lint-staged']) {
    lintStaged = {
      "lint-staged": {
        "/src/**/*.{js,jsx,ts,tsx,vue}": [
          "eslint --cache --fix",
          "prettier --write",
          "git add"
        ],
        "/src/**/*.{css,scss,less}": [
          "stylelint --cache --fix",
          "prettier --write",
          "git add"
        ],
        "**/*.md": [
          "prettier --write",
          "git add"
        ]
      },
    }
    Object.assign(devDependencies, { "lint-staged": "^12.5.0" })
  }
  if (gitHooks.commitizen) {

    Object.assign(devDependencies, { "commitizen": "^4.3.0", "cz-conventional-changelog": "^3.3.0" })
    commitlint = {
      "config": {
        "commitizen": {
          "path": "./node_modules/cz-conventional-changelog"
        }
      },
    }
  }
  if (gitHooks.husky) {
    Object.assign(devDependencies, { "husky": "^7.0.4" })
  }

  Object.assign(config.files.pkg, lintStaged, commitlint)

  Object.assign(config.files.pkg.devDependencies, devDependencies);

}
async function renderGitHooks(config) {
  // const { projectPath, eslint, pkg } = config;
}
module.exports = { initGitHooks, initGitHooksFile, renderGitHooks };
