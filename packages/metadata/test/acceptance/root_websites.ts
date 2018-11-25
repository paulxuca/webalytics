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
    const data = metadata(html, 'https://www.nytimes.com')
    data.should.be.an('object')
    data.title.should.be.equal('Breaking News, World News & Multimedia')
    data.description.should.be.equal(
      'The New York Times: Find breaking news, multimedia, reviews & opinion on Washington, business, sports, movies, travel, books, jobs, education, real estate, cars & more at nytimes.com.'
    )
    data.url.should.be.equal('https://www.nytimes.com')
    data.image.should.be.equal(
      'https://static01.nyt.com/newsgraphics/images/icons/defaultPromoCrop.png'
    )
    data.feeds.should.be.deep.equal([
      'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    ])
    data.favicon.should.be.equal(
      'https://www.nytimes.com/vi-assets/static-assets/apple-touch-icon-319373aaf4524d94d38aa599c56b8655.png'
    )
    data.keywords.length.should.be.equal(78)
    data.author.should.be.equal('')
  }

  @test
  'kreuzfahrt-prozente.de'() {
    const html = loadExample('kreuzfahrt-prozente.de.html')
    const data = metadata(html, 'https://kreuzfahrt-prozente.de')
    data.should.be.an('object')
    data.title.should.be.equal(
      'Kreuzfahrt-Prozente.de - AIDA Stornokabinen, Restkabinen, Preissenkungen und Kreuzfahrt-Schnäppchen mit Flug und Bordguthaben'
    )
    data.description.should.be.equal(
      'Mit Kreuzfahrt-Prozente.de finden Sie: Günstige Kreuzfahrten, Schnäppchen, Stornokabinen, Last Minute Kreuzfahrten, Restplätze für AIDA, Mein Schiff & Co.'
    )
    data.url.should.be.equal('https://kreuzfahrt-prozente.de')
    data.image.should.be.equal(
      'https://kreuzfahrt-prozente.de/wp-content/uploads/2015/06/Kreuzfahrt-Prozente-OG-AIDA.jpg'
    )
    data.feeds.should.be.deep.equal([
      'https://kreuzfahrt-prozente.de/feed/',
      'https://kreuzfahrt-prozente.de/feed/atom/',
      'https://kreuzfahrt-prozente.de/comments/feed/',
    ])
    data.favicon.should.be.equal(
      'https://kreuzfahrt-prozente.de/img/icons/apple-icon-57x57.png'
    )
    data.keywords.length.should.be.equal(0)
    data.author.should.be.equal('Kreuzfahrt-Prozente.de')
  }
}
