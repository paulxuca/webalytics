import 'chai/register-should'
import * as cheerio from 'cheerio'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import Parser from '../src/parser'

@suite('Parser')
export class Test {
  @test
  'initializes with html snippet produces internal cheerio dom'() {
    const html = '<html><head><title>abc</title></head><body /></html>'
    const parser = new Parser(html)
    parser.html.should.be.equal(html)
    parser.$.should.be.instanceOf(Function)
  }
}
