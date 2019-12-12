import * as fs from 'fs'
import { expect  } from 'chai'

import ReplaceDefinition from '../../src/replace-definition'

describe('replace-definition dirtree test', () => {
  let rd
  before(() => {
    rd = new ReplaceDefinition('./test/fixtures/dir-tree/replacement.yml')
    rd.replace()
  })

  it('dirtree - depth 1', async () => {
    const exists = fs.existsSync('./test/tmp/depth1/d1-move-only.txt')
                && fs.existsSync('./test/tmp/depth1/d1-move-only2.txt')
    expect(exists).to.be.true
  })
  //it('simple-replace - out 2', async () => {
  //  const out = fs.readFileSync('./test/tmp/out-2.txt', 'utf8')
  //  const validOut = fs.readFileSync('./test/fixtures/simple-replace/valid-out-2.txt', 'utf8')
  //  expect(out).to.be.equal(validOut)
  //})
})
