import * as fs from 'fs'
import { expect  } from 'chai'

import recursiveMkdir from '../../src/recursive-mkdir';

describe('recursive-mkdir test', () => {
  it('relative', async () => {
    recursiveMkdir('./test/tmp/a/b/c')
    expect(fs.existsSync('./test/tmp/a/b')).to.be.true
  })
  it('absolute', async () => {
    recursiveMkdir('/tmp/twogateboilerplatecli/c/b/a')
    expect(fs.existsSync('/tmp/twogateboilerplatecli/c/b')).to.be.true
  })
})
