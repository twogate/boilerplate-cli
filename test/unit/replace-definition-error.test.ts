import * as fs from 'fs'
import { expect  } from 'chai'

import ReplaceDefinition from '../../src/replace-definition'

describe('replace-definition error test', () => {
  it('should throw "`startSigil` must be specified" error', async () => {
    expect(() => new ReplaceDefinition('./test/fixtures/error/start-sigil.yaml').replace()).to.throw('Replacement Definition Syntax Error: `startSigil` must be specified')
  })
  it('should throw "`endSigil` must be specified" error', async () => {
    expect(() => new ReplaceDefinition('./test/fixtures/error/end-sigil.yaml').replace()).to.throw('Replacement Definition Syntax Error: `endSigil` must be specified')
  })
  it('should throw "`templateDir` must be specified" error', async () => {
    expect(() => new ReplaceDefinition('./test/fixtures/error/template-dir.yaml').replace()).to.throw('Replacement Definition Syntax Error: `templateDir` must be specified')
  })
  it('should throw "`outDir` must be specified" error', async () => {
    expect(() => new ReplaceDefinition('./test/fixtures/error/out-dir.yaml').replace()).to.throw('Replacement Definition Syntax Error: `outDir` must be specified')
  })
  it('should throw "`template` must be specified" error', async () => {
    expect(() => new ReplaceDefinition('./test/fixtures/error/template.yaml').replace()).to.throw('Replacement Definition Syntax Error: `replaces[].template` must be specified')
  })
})
