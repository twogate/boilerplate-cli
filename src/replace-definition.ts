import * as yaml from 'js-yaml'
import * as fs from 'fs'
import * as path from 'path'

interface Definition {
  startSigil: string
  endSigil: string
  templateDir: string
  outDir: string
  replaces: Replaces
}

interface Replaces {
  [filePath: string]: Placeholder
}

interface Placeholder {
  [placeholder: string]: string | number | boolean | null
}

export default class ReplaceDefinition {
  definition: Definition
  templateBasePath: string
  outputBasePath: string

  constructor(filePath: string) {
    this.definition = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
    this.templateBasePath = path.resolve(path.dirname(filePath), this.definition.templateDir)
    this.outputBasePath = path.resolve(path.dirname(filePath), this.definition.outDir)
    console.log('templateBasePath', this.templateBasePath)
    console.log('outputBasePath', this.outputBasePath)
  }

  replace() {
    Object.keys(this.definition.replaces).forEach(filePath => this.scanEachFile(filePath))
  }

  scanEachFile(filePath: string) {
      const resolvedPath = path.resolve(this.templateBasePath, filePath)
      console.log('resolvedPath' , resolvedPath)
      const contents = fs.readFileSync(resolvedPath, 'utf8')
      console.log(contents)
      console.log(resolvedPath)
      console.log(this.definition.replaces[filePath])
  }

  replaceEachPlaceholder() {

  }
}

