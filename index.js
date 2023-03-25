#!/usr/bin/env node

const { program } = require('commander');
const prompts = require('prompts')
const { downloadTemplate, useTemplate, canUseTemplatesName } = require('./lib/initTemplate')
const { init } = require('./lib/init')

program.version(require('./package.json').version)
  .option('-n, --name <string>', 'project name')
  .option('-t, --template <string>', 'use template name (support: vue3)')
  .action(async function (cmdArg) {
    let { name, template } = cmdArg

    if (!name) {
      const answer = await prompts([{
        type: 'text',
        name: 'name',
        message: 'Project name:',
        initial: 'project'
      }
      ])
      name = answer.name
    }
    if (canUseTemplatesName.includes(template)) {
      downloadTemplate(template, name)
      return
    }
    const { isUseTemplate } = await prompts([
      {
        type: "toggle",
        name: "isUseTemplate",
        message: "use template?",
        initial: true,
        active: "yes",
        inactive: "no",
      },
    ])
    if (isUseTemplate) {
      useTemplate(name)
      return
    }
    init(name)
    // console.log(cmdArg);
  }).parse(process.argv);

