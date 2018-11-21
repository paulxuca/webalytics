import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata from '../src'

@suite('Metadata')
export class Test {
  @test
  'can parse simple html snippets'() {
    const html = '<html><head><title>abc</title></head><body /></html>'
    const data = metadata(html)
    data.should.be.an('object')
    data.title.should.be.equal('abc')
  }
}
