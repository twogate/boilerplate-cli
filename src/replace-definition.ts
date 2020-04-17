import * as yaml from 'js-yaml'
import * as fs from 'fs'
import { promises as fsPromises } from 'fs'
import * as path from 'path'
import escapeStringRegexp from "escape-string-regexp"
import recursiveMkdir from './recursive-mkdir'

export interface Definition {
  startSigil: string
  endSigil: string
  templateDir: string
  outDir: string
  replaces: Replace[]
}

export interface Replace {
  template: string
  out?: string
  placeholders?: Placeholder
}

export interface Placeholder {
  [placeholder: string]: string | number | boolean | null
}

export class ReplaceDefinition {
  definition: Definition = {
    startSigil: '',
    endSigil: '',
    templateDir: '',
    outDir: '',
    replaces: []
  }
  sigils: string[] = ['', '']
  templateBasePath: string = '.'
  outputBasePath: string = '.'

  constructor(definition?: Definition, templateBasePath?: string, outputBasePath?: string) {
  }

  loadYamlDefinition(filePath: string) {
    this.definition = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
    this.validateDefinition()
    this.sigils[0] = escapeStringRegexp(this.definition.startSigil)
    this.sigils[1] = escapeStringRegexp(this.definition.endSigil)
    this.templateBasePath = path.resolve(path.dirname(filePath), this.definition.templateDir)
    this.outputBasePath = path.resolve(path.dirname(filePath), this.definition.outDir)
  }

  validateDefinition() {
    if (!this.definition.startSigil) {
      throw new Error('Replacement Definition Syntax Error: `startSigil` must be specified')
    }
    if (!this.definition.endSigil) {
      throw new Error('Replacement Definition Syntax Error: `endSigil` must be specified')
    }
    if (!this.definition.templateDir) {
      throw new Error('Replacement Definition Syntax Error: `templateDir` must be specified')
    }
    if (!this.definition.outDir) {
      throw new Error('Replacement Definition Syntax Error: `outDir` must be specified')
    }
    if (!this.definition.replaces.every(replace => replace.template)) {
      throw new Error('Replacement Definition Syntax Error: `replaces[].template` must be specified')
    }
  }

  replace(): Promise<void>[] {
    return this.definition.replaces.map(replace => this.replaceFiles(replace))
  }

  replaceFiles(replace: Replace) {
    const templatePath = path.resolve(this.templateBasePath, replace.template)
    let outPath
    if (replace.out) {
      outPath = path.resolve(this.outputBasePath, replace.out)
    } else {
      outPath = path.resolve(this.outputBasePath, replace.template)
    }
    console.log('[templatePath]' , templatePath)
    console.log(' --> [outPath]' , outPath)
    recursiveMkdir(outPath)
    const template = fs.readFileSync(templatePath, 'utf8')
    if (replace.placeholders) {
      const replaced = this.replacePlaceholders(template, replace.placeholders)
      return fsPromises.writeFile(outPath, replaced)
    } else {
      return fsPromises.copyFile(templatePath, outPath)
    }
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

