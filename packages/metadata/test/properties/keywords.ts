import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata from '../../src'

@suite('Keywords')
export class Test {
  @test
  'does extract empty array if nothing is found'() {
    const html = '<html/>'
    const data = metadata(html)
    data.keywords.should.be.deep.equal([])
  }

  @test
  'does extract comma separated words'() {
    const tag = '<meta name="keywords" content="a, b, c" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.keywords.should.be.deep.equal(['a', 'b', 'c'])
  }

  @test
  'does extract semicolon separated words'() {
    const tag = '<meta name="keywords" content="a; b; c" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.keywords.should.be.deep.equal(['a', 'b', 'c'])
  }
}
