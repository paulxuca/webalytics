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
    this.selectDescription()
    return this
  }

  selectTitle() {
    this.title =
      this.$(`meta[property='og:title']`).attr('content') ||
      this.$(`meta[name='og:title']`).attr('content') ||
      this.$(`meta[property='twitter:title']`).attr('content') ||
      this.$(`meta[name='twitter:title']`).attr('content') ||
      this.$('title').text() ||
      ''
  }

  selectDescription() {
    this.description =
      this.$(`meta[property='description']`).attr('content') ||
      this.$(`meta[name='description']`).attr('content') ||
      this.$(`meta[property='og:description']`).attr('content') ||
      this.$(`meta[name='og:description']`).attr('content') ||
      this.$(`meta[property='twitter:description']`).attr('content') ||
      this.$(`meta[name='twitter:description']`).attr('content') ||
      this.$('title').text() ||
      ''
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
