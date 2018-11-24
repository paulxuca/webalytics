import 'chai/register-should'
import * as fs from 'fs'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import * as path from 'path'
import metadata from '../../src'

function loadExample(name: string) {
  const filePath = path.join(__filename, '../../../../../cache', name)
  return fs.readFileSync(filePath, 'utf-8')
}

@suite('Acceptance:Articles')
export class Test {
  @test
  'nytimes.com'() {
    const html = loadExample('nytimes.article.com.html')
    const data = metadata(html, 'https://www.nytimes.com')
    data.should.be.an('object')
    data.title.should.be.equal(
      'Black Friday 2018: A Not-So-Wild Day for American Shoppers'
    )
    data.description.should.be.equal(
      'The holiday shopping season is upon us. Follow along with our reporters here.'
    )
    data.url.should.be.equal('https://www.nytimes.com')
    data.image.should.be.equal(
      'https://static01.nyt.com/images/2018/11/23/business/23SHOPBRIEF-moon-01/23SHOPBRIEF-moon-01-facebookJumbo.jpg'
    )
    data.feeds.should.be.deep.equal([
      'https://www.nytimes.com/2018/11/22/business/black-friday.html',
      'android-app://com.nytimes.android/nytimes/reader/id/100000006225132',
      'https://www.nytimes.com/svc/oembed/json/?url=https%3A%2F%2Fwww.nytimes.com%2F2018%2F11%2F22%2Fbusiness%2Fblack-friday.html',
    ])
    data.favicon.should.be.equal(
      'https://www.nytimes.com/vi-assets/static-assets/apple-touch-icon-319373aaf4524d94d38aa599c56b8655.png'
    )
    data.keywords.length.should.be.equal(0)
    data.author.should.be.equal('')
  }
}
