import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import metadata from '../../src'

@suite('AuthoFeedsr')
export class Test {
  @test
  'does extract empty array if nothing is found'() {
    const html = '<html/>'
    const data = metadata(html)
    data.feeds.should.be.deep.equal([])
  }

  @test
  'does extract feed url if found with rss+xml identifier'() {
    const tag = '<link type="application/rss+xml" href="/feed" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.feeds.should.be.deep.equal(['/feed'])
  }

  @test
  'does extract feed url if found with atom+xml identifier'() {
    const tag = '<link type="application/atom+xml" href="/feed" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.feeds.should.be.deep.equal(['/feed'])
  }

  @test
  'does extract feed url if found with alternate identifier'() {
    const tag = '<link rel="alternate" href="/feed" />'
    const html = `<html><head>${tag}</head><body /></html>`
    const data = metadata(html)
    data.feeds.should.be.deep.equal(['/feed'])
  }

  @test
  'does extract feed urls if multiple are found'() {
    const tag1 = '<link type="application/rss+xml" href="/feed" />'
    const tag2 = '<link type="application/atom+xml" href="/feed" />'
    const tag3 = '<link rel="alternate" href="/feed" />'
    const html = `<html><head>${tag1}${tag2}${tag3}</head><body /></html>`
    const data = metadata(html)
    data.feeds.should.be.deep.equal(['/feed', '/feed', '/feed'])
  }
}
