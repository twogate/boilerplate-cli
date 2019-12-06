import * as fs from 'fs'
import { expect  } from 'chai'

import ReplaceDefinition from '../../src/replace-definition'

describe('replace-definition test', () => {
  it('replace1', async () => {
    const rd = new ReplaceDefinition('./test/fixtures/replace1/replacement.yaml')
    rd.replace()
    const out = fs.readFileSync('./test/tmp/out-1.txt', 'utf8')
    const validOut = fs.readFileSync('./test/fixtures/replace1/valid-out.txt', 'utf8')
    console.log(out)
    expect(out).to.be.equal(validOut)
  })
})
