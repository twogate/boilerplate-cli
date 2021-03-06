import * as fs from 'fs'
import { expect  } from 'chai'

import { ReplaceDefinition } from '../../src/replace-definition'

describe('replace-definition test', () => {
  let rd
  before(() => {
    rd = new ReplaceDefinition()
    rd.loadYamlDefinition('./test/fixtures/simple-replace/replacement.yaml', './test/tmp2')
    rd.replace()
  })

  it('override-output-replace - out 1', async () => {
    const out = fs.readFileSync('./test/tmp2/out-1.txt', 'utf8')
    const validOut = fs.readFileSync('./test/fixtures/simple-replace/valid-out-1.txt', 'utf8')
    expect(out).to.be.equal(validOut)
  })
  it('override-output-replace - out 2', async () => {
    const out = fs.readFileSync('./test/tmp2/out-2.txt', 'utf8')
    const validOut = fs.readFileSync('./test/fixtures/simple-replace/valid-out-2.txt', 'utf8')
    expect(out).to.be.equal(validOut)
  })
})
