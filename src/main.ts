import { ReplaceDefinition } from './replace-definition'

const replacementDefinition = process.argv[2]
if (replacementDefinition) {
  const rd = new ReplaceDefinition()
  rd.loadYamlDefinition(replacementDefinition)
  rd.replace()
} else {
  console.log('Specify a replacement definition YAML.')
}