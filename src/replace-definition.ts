import * as yaml from 'js-yaml'
import * as fs from 'fs'
import * as path from 'path'
import escapeStringRegexp from "escape-string-regexp"

interface Definition {
  startSigil: string
  endSigil: string
  templateDir: string
  outDir: string
  replaces: Replace[]
}

interface Replace {
  template: string
  out: string
  placeholders: Placeholder
}

interface Placeholder {
  [placeholder: string]: string | number | boolean | null
}

export default class ReplaceDefinition {
  definition: Definition
  sigils: string[] = ['', '']
  templateBasePath: string
  outputBasePath: string

  constructor(filePath: string) {
    this.definition = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
    this.sigils[0] = escapeStringRegexp(this.definition.startSigil)
    this.sigils[1] = escapeStringRegexp(this.definition.endSigil)
    this.templateBasePath = path.resolve(path.dirname(filePath), this.definition.templateDir)
    this.outputBasePath = path.resolve(path.dirname(filePath), this.definition.outDir)
  }

  replace() {
    this.definition.replaces.forEach(replace => this.replaceFiles(replace))
  }

  replaceFiles(replace: Replace) {
      const templatePath = path.resolve(this.templateBasePath, replace.template)
      const outPath = path.resolve(this.outputBasePath, replace.out)
      console.log('[templatePath]' , templatePath)
      console.log('[outPath]' , outPath)
      const template = fs.readFileSync(templatePath, 'utf8')
      const replaced = this.replacePlaceholders(template, replace.placeholders)
      fs.writeFileSync(outPath, replaced)
  }

  replacePlaceholders(template: string, placeholders: Placeholder) {
    return Object.keys(placeholders).reduce((replacedContents, placeholderKey) =>
      replacedContents.replace(
        new RegExp(this.sigils[0] + '\\s*?' + escapeStringRegexp(placeholderKey) + '\\s*?' + this.sigils[1], 'g'),
        String(placeholders[placeholderKey])
      ),
      template
    )
  }
}

