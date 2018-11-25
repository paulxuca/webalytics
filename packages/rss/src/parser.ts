import * as cheerio from 'cheerio'
import { URL } from 'url'
import { Feed, Item } from './interfaces'
import { parseItem } from './parse_item'

/**
 * Incremental RSS parser and optimized selectors for common data fields
 */
export class Parser {
  /**
   * Convenience method for processing a rss feed and extracting all
   * possible metadata fields and items at once.
   *
   * @param rss utf-8 string containing rss or atom xml
   * @param url optional base url of the rss document (for normalizing links)
   */
  static scan(rss: string, url: string = '') {
    return new Parser(rss, url).scan()
  }

  $: CheerioStatic
  rss: string = ''
  title: string = ''
  description: string = ''
  url: string = ''
  image: string = ''
  items: Item[] = []

  /**
   * @param html utf-8 string containing rss or atom xml
   * @param url optional base url of the html document (for normalizing links)
   */
  constructor(rss: string, url: string = '') {
    this.rss = rss
    this.url = url
    this.$ = cheerio.load(rss, { decodeEntities: true, xmlMode: true })
  }

  /**
   * execute all selects and return a proper [[Metadata]] object
   */
  scan() {
    this.title = this.selectTitle()
    this.description = this.selectDescription()
    this.image = this.selectImage()
    this.items = this.selectItems()
    return this.results()
  }

  /**
   * select the best title from the the [[rss]] and return it
   */
  selectTitle() {
    return (
      this.$('title')
        .first()
        .text() || ''
    )
  }

  /**
   * select the best description from the the [[rss]] and return it
   */
  selectDescription() {
    return (
      this.$('description')
        .first()
        .text() || ''
    )
  }

  /**
   * select the best image url from the the [[rss]] and return it
   */
  selectImage() {
    return this.normalizeURL(this.$('image url').text() || '')
  }

  /**
   * select the best image url from the the [[rss]] and return it
   */
  selectItems(): Item[] {
    const list: Item[] = []
    this.$('item,entry').each((_, element) => {
      list.push(parseItem(element))
    })
    list.forEach(item => (item.image = this.normalizeURL(item.image)))
    list.forEach(item => (item.url = this.normalizeURL(item.url)))
    return list
  }

  /**
   * transform [[this]] instance into a plain [[Metadata]] object
   */
  results(): Feed {
    const data: any = {}
    data.title = this.title
    data.description = this.description
    data.url = this.url
    data.image = this.image
    data.items = this.items
    return data
  }

  /**
   * when a base url is given in addition to the rss document, normalize all
   * urls (images, feeds) to be absolute
   */
  private normalizeURL(url: string) {
    const base = this.url || undefined // empty string will produce bad stuff
    const isRelative = !/^https?/.test(url)
    return base && isRelative ? new URL(url, base).toString() : url
  }
}
