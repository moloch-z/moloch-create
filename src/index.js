
const eslint = require('./eslint')
const git = require('./git')
const prettier = require('./prettier')
const stylelint = require('./stylelint')
// const vue = require('./vue')
// const react = require('./react')
const utils = require("./utils");


async function renderPackage(config) {
  const {
    files: { pkg },
    projectPath,
  } = config;
  utils.writeFile(`${projectPath}/package.json`, pkg)
}

module.exports = {
  ...utils,
  renderPackage,
  ...eslint,
  ...stylelint,
  ...prettier,
  ...git,
  // ...vue,
  // ...react
}