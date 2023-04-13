const clear = require('clear');
const { clone } = require('./download');
const prompts = require('prompts')


async function downloadTemplate(templateName, projectName) {
  clear()
  await clone(`github:moloch-z/${templateName}-template#main`, projectName);
}

const templates = [
  { title: 'vue3', value: 'vue3' },
  { title: 'vue3-library', value: 'lib' },
  { title: 'react', value: 'react', disabled: true }
]

const canUseTemplates = templates.filter(t => !t.disabled)
const canUseTemplatesName = canUseTemplates.map(t => t.value)
function useTemplate(projectName) {
  prompts([
    {
      type: "select",
      name: "template",
      message: "select template",
      choices: templates,
    },
  ]).then(({ template }) => {
    downloadTemplate(template, projectName)
  })
}

module.exports = {
  templates,
  canUseTemplates,
  canUseTemplatesName,
  downloadTemplate,
  useTemplate
}