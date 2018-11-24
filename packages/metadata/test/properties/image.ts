import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata from '../../src'

@suite('Image')
export class Test {
  @test
  'does extract empty string if nothing is found'() {
    const html = '<html/>'
    const data = metadata(html)
    data.image.should.be.equal('')
  }

  @test
  'does extract imageUrl from opengraph if found with meta:name identifier'() {
    const tag = '<meta name="og:image" content="abc" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.image.should.be.equal('abc')
  }

  @test
  'does extract imageUrl from opengraph if found with meta:property identifier'() {
    const tag = '<meta property="og:image" content="abc" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.image.should.be.equal('abc')
  }

  @test
  'does extract imageUrl from twitter if found with meta:name identifier'() {
    const tag = '<meta name="twitter:image" content="abc" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.image.should.be.equal('abc')
  }

  @test
  'does extract imageUrl from twitter if found with meta:property identifier'() {
    const tag = '<meta property="twitter:image" content="abc" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.image.should.be.equal('abc')
  }
}
