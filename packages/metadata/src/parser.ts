import * as cheerio from 'cheerio'
import Metadata from './metadata'

/**
 * Incremental HTML parser and optimized selectors for common data fields
 */
export class Parser {
  /**
   * Convenience method for processing a html document and extracting all
   * possible metadata fields at once.
   *
   * @param html utf-8 string containing html
   * @param url optional base url of the html document (for normalizing links)
   */
  static scan(html: string, url: string = '') {
    return new Parser(html, url).scan()
  }

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

  /**
   * @param html utf-8 string containing html
   * @param url optional base url of the html document (for normalizing links)
   */
  constructor(html: string, url: string = '') {
    this.html = html
    this.url = url
    this.$ = cheerio.load(html, { decodeEntities: true })
  }

  /**
   * execute all selects and return a proper [[Metadata]] object
   */
  scan() {
    this.title = this.selectTitle()
    this.description = this.selectDescription()
    return this.results()
  }

  /**
   * select the best title from the the [[html]] and return it
   */
  selectTitle() {
    return (
      this.$(`meta[property='og:title']`).attr('content') ||
      this.$(`meta[name='og:title']`).attr('content') ||
      this.$(`meta[property='twitter:title']`).attr('content') ||
      this.$(`meta[name='twitter:title']`).attr('content') ||
      this.$('title').text() ||
      ''
    )
  }

  /**
   * select the best description from the the [[html]] and return it
   */
  selectDescription() {
    return (
      this.$(`meta[property='description']`).attr('content') ||
      this.$(`meta[name='description']`).attr('content') ||
      this.$(`meta[property='og:description']`).attr('content') ||
      this.$(`meta[name='og:description']`).attr('content') ||
      this.$(`meta[property='twitter:description']`).attr('content') ||
      this.$(`meta[name='twitter:description']`).attr('content') ||
      this.$('title').text() ||
      ''
    )
  }

  /**
   * transform [[this]] instance into a plain [[Metadata]] object
   */
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
