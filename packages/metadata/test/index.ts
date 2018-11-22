import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata, { Parser } from '../src'

@suite('Metadata')
export class Test {
  @test
  'default export works'() {
    const html = '<html><head><title>abc</title></head><body /></html>'
    const data = metadata(html)
    data.should.be.an('object')
    data.title.should.be.equal('abc')
  }

  @test
  'Parser export works'() {
    const html = '<html><head><title>abc</title></head><body /></html>'
    const data = Parser.scan(html)
    data.should.be.an('object')
    data.title.should.be.equal('abc')
  }
}
