import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { Parser } from '../src/parser'

@suite('Parser')
export class Test {
  @test
  'initialized with rss snippet produces internal cheerio dom'() {
    const rss = '<rss><title>abc</title></rss>'
    const parser = new Parser(rss)
    parser.rss.should.be.equal(rss)
    parser.$.should.be.instanceOf(Function)
  }
}
