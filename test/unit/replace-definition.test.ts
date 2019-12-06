import * as fs from 'fs'
import { expect  } from 'chai'

import ReplaceDefinition from '../../src/replace-definition'

describe('replace-definition test', () => {
  let rd
  before(() => {
    rd = new ReplaceDefinition('./test/fixtures/replace1/replacement.yaml')
    rd.replace()
  })

  it('replace1 - out 1', async () => {
    const out = fs.readFileSync('./test/tmp/out-1.txt', 'utf8')
    const validOut = fs.readFileSync('./test/fixtures/replace1/valid-out-1.txt', 'utf8')
    expect(out).to.be.equal(validOut)
  })
  it('replace1 - out 2', async () => {
    const out = fs.readFileSync('./test/tmp/out-2.txt', 'utf8')
    const validOut = fs.readFileSync('./test/fixtures/replace1/valid-out-2.txt', 'utf8')
    expect(out).to.be.equal(validOut)
  })
})
