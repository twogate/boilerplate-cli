import * as fs from 'fs'
import { expect  } from 'chai'
import { doesNotMatch } from 'assert'

describe('e2e command execute test', () => {
  it('relative', (done) => {
    process.argv[2] = './test/fixtures/simple-replace/replacement.yaml'
    process.argv[3] = './test/tmp-e2e'
    require('../../src/main')
    setTimeout(() => {
      const out = fs.readFileSync('./test/tmp-e2e/out-1.txt', 'utf8')
      const validOut = fs.readFileSync('./test/fixtures/simple-replace/valid-out-1.txt', 'utf8')
      expect(out).to.be.equal(validOut)
      done()
    },1000)
  })
  it('absolute', (done) => {
    process.argv[2] = './test/fixtures/simple-replace/replacement.yaml'
    process.argv[3] = '/tmp/twogateboilerplatecli/e2e'
    require('../../src/main')
    setTimeout(() => {
      const out = fs.readFileSync('/tmp/twogateboilerplatecli/e2e/out-2.txt', 'utf8')
      const validOut = fs.readFileSync('./test/fixtures/simple-replace/valid-out-2.txt', 'utf8')
      expect(out).to.be.equal(validOut)
      done()
    },1000)
  })
})
