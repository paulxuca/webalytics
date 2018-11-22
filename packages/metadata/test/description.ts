import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata from '../src'

@suite('Description')
export class Test {
  @test
  'does extract empty string if nothing is found'() {
    const html = '<html/>'
    const data = metadata(html)
    data.description.should.be.equal('')
  }

  @test
  'does extract description from tag if found with meta:name identifier'() {
    const tag = '<meta name="description" content="abc" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.description.should.be.equal('abc')
  }

  @test
  'does extract description from tag if found with meta:property identifier'() {
    const tag = '<meta property="description" content="abc" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.description.should.be.equal('abc')
  }

  @test
  'does extract twitter title if found with meta:name identifier'() {
    const twitter = '<meta name="twitter:title" content="tw" />'
    const html = `<html><head>${twitter}</head><body /></html>`
    const data = metadata(html)
    data.title.should.be.equal('tw')
  }

  @test
  'does extract twitter title if found with meta:property identifier'() {
    const twitter = '<meta property="twitter:title" content="tw" />'
    const html = `<html><head>${twitter}</head><body /></html>`
    const data = metadata(html)
    data.title.should.be.equal('tw')
  }

  @test
  'does extract opengraph title if found with meta:name identifier'() {
    const opengraph = '<meta name="og:title" content="og" />'
    const html = `<html><head>${opengraph}</head><body /></html>`
    const data = metadata(html)
    data.title.should.be.equal('og')
  }

  @test
  'does extract opengraph title if found with meta:property identifier'() {
    const opengraph = '<meta property="og:title" content="og" />'
    const html = `<html><head>${opengraph}</head><body /></html>`
    const data = metadata(html)
    data.title.should.be.equal('og')
  }
}
