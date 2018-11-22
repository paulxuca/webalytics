import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata from '../../src'

@suite('Author')
export class Test {
  @test
  'does extract empty string if nothing is found'() {
    const html = '<html/>'
    const data = metadata(html)
    data.author.should.be.equal('')
  }

  @test
  'does extract author if found with meta:name identifier'() {
    const tag = '<meta name="author" content="john" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.author.should.be.equal('john')
  }

  @test
  'does extract author if found with meta:property identifier'() {
    const tag = '<meta property="author" content="john" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.author.should.be.equal('john')
  }

  @test
  'does extract twitter author if found with meta:name identifier'() {
    const tag = '<meta name="twitter:creator" content="john" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.author.should.be.equal('john')
  }

  @test
  'does extract twitter author if found with meta:property identifier'() {
    const tag = '<meta property="twitter:creator" content="john" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.author.should.be.equal('john')
  }

  @test
  'does extract opengraph author if found with meta:name identifier'() {
    const tag = '<meta name="og:site_name" content="john" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.author.should.be.equal('john')
  }

  @test
  'does extract opengraph author if found with meta:property identifier'() {
    const tag = '<meta property="og:site_name" content="john" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.author.should.be.equal('john')
  }
}
