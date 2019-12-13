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
                && fs.existsSync('./test/tmp/depth1/d1-template.c')
    expect(exists).to.be.true
  })

  it('dirtree - depth 2', async () => {
    const exists = fs.existsSync('./test/tmp/depth1/depth2/d2-template.txt')
                && fs.existsSync('./test/tmp/depth1/depth2/d2-template2.txt')
                && fs.existsSync('./test/tmp/depth1/depth2/d2-move-only.txt')
                && fs.existsSync('./test/tmp/depth1/depth2/d2-move-only2.txt')
    expect(exists).to.be.true
  })

  it('dirtree - depth 3', async () => {
     const exists = fs.existsSync('./test/tmp/depth1/depth2/depth3/d3-template.txt')
                 && fs.existsSync('./test/tmp/depth1/depth2/depth3/d3-template2.txt')
                 && fs.existsSync('./test/tmp/depth1/depth2/depth3/d3-move-only.txt')
    expect(exists).to.be.true
  })
})
