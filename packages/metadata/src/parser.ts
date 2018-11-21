import * as cheerio from 'cheerio'
import Metadata from './metadata'

export default class Parser {
  $: CheerioStatic
  html: string = ''
  title: string = ''
  description: string = ''
  url: string = ''
  image: string = ''
  feeds: string[] = []
  favicon: string = ''
  keywords: string[] = []
  author: string = ''

  constructor(html: string, url: string = '') {
    this.html = html
    this.url = url
    this.$ = cheerio.load(html, { decodeEntities: true })
  }

  // run all selects
  scan() {
    this.selectTitle()
    return this
  }

  selectTitle() {
    let result = ''
    result = this.$('title').text()
    this.title = result
  }

  results(): Metadata {
    const data: any = {}
    data.title = this.title
    data.description = this.description
    data.url = this.url
    data.image = this.image
    data.feeds = this.feeds
    data.favicon = this.favicon
    data.keywords = this.keywords
    data.author = this.author
    return data
  }
}
