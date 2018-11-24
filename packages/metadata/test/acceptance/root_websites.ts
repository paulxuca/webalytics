import 'chai/register-should'
import * as fs from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import * as path from 'path'
import metadata, { Parser } from '../../src'

function loadExample(name: string) {
  const filePath = path.join(__filename, '../../../../../cache', name)
  return fs.readFileSync(filePath, 'utf-8')
}

@suite('Acceptance:RootWebsites')
export class Test {
  @test
  'nytimes.com'() {
    const html = loadExample('nytimes.com.html')
    const data = metadata(html, 'https://nytimes.com')
    data.should.be.an('object')
    data.title.should.be.equal('Breaking News, World News & Multimedia')
    data.description.should.be.equal(
      'The New York Times: Find breaking news, multimedia, reviews & opinion on Washington, business, sports, movies, travel, books, jobs, education, real estate, cars & more at nytimes.com.'
    )
    data.url.should.be.equal('https://nytimes.com')
    data.image.should.be.equal(
      'https://static01.nyt.com/newsgraphics/images/icons/defaultPromoCrop.png'
    )
    data.feeds.should.be.deep.equal([
      'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    ])
    data.favicon.should.be.equal(
      'https://nytimes.com/vi-assets/static-assets/apple-touch-icon-319373aaf4524d94d38aa599c56b8655.png'
    )
    data.keywords.length.should.be.equal(78)
    data.author.should.be.equal('')
  }
}
