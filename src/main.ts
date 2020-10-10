import { ReplaceDefinition } from './replace-definition'

module.exports = function() {
  const replacementDefinition = process.argv[2]
  if (replacementDefinition) {
    const overrideOutputBasePath = process.argv[3]
    const rd = new ReplaceDefinition()
    rd.loadYamlDefinition(replacementDefinition, overrideOutputBasePath)
    rd.replace()
  } else {
    console.log('Specify a replacement definition YAML.')
  }
}
