import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata, { Parser } from '../src'

@suite('RSS')
export class Test {
  @test
  'default export works'() {
    const rss = '<rss><title>abc</title></rss>'
    const data = metadata(rss)
    data.should.be.an('object')
    data.title.should.be.equal('abc')
  }

  @test
  'Parser export works'() {
    const rss = '<rss><title>abc</title></rss>'
    const data = Parser.scan(rss)
    data.should.be.an('object')
    data.title.should.be.equal('abc')
  }
}
