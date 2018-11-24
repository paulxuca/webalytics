import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata from '../../src'

@suite('Favicon')
export class Test {
  @test
  'does extract empty string if nothing is found'() {
    const html = '<html/>'
    const data = metadata(html)
    data.favicon.should.be.equal('')
  }

  @test
  'does extract author if found with apple-touch-icon identifier'() {
    const tag = '<link rel="apple-touch-icon" href="/icon" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.favicon.should.be.equal('/icon')
  }

  @test
  'does extract author if found with shortcut icon identifier'() {
    const tag = '<link rel="shortcut icon" href="/icon" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.favicon.should.be.equal('/icon')
  }

  @test
  'does extract author if found with icon identifier'() {
    const tag = '<link rel="icon" href="/icon" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.favicon.should.be.equal('/icon')
  }
}
