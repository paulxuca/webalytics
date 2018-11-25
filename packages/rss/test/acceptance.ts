import 'chai/register-should'
import * as fs from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import * as path from 'path'
import rss from '../src'

function loadExample(name: string) {
  const filePath = path.join(__filename, '../../../../cache', name)
  return fs.readFileSync(filePath, 'utf-8')
}

@suite('Acceptance')
export class Test {
  @test
  'nytimes.com'() {
    const html = loadExample('nytimes.feed.com.xml')
    const data = rss(html, 'https://www.nytimes.com')
    data.should.be.an('object')
    data.title.should.be.equal('NYT > Home Page')
    data.description.should.be.equal('')
    data.url.should.be.equal('https://www.nytimes.com')
    data.image.should.be.equal(
      'https://static01.nyt.com/images/misc/NYT_logo_rss_250x40.png'
    )
    data.items.length.should.be.equal(47)
    const item = data.items[0]
    item.title.should.be.equal(
      'U.S. Climate Report Warns of Damaged Environment and Shrinking Economy'
    )
    item.image.should.be.equal(
      'https://static01.nyt.com/images/2018/11/24/climate/24cli-report-2/merlin_146590158_372cbff0-acb2-4bf5-8308-f9b1c200405d-moth.jpg'
    )
    item.pubDate.should.be.equal('Sat, 24 Nov 2018 03:47:32 GMT')
    item.url.should.be.equal(
      'https://www.nytimes.com/2018/11/23/climate/us-climate-report.html?partner=rss&emc=rss'
    )
    item.keywords.length.should.be.equal(21)
  }
}
