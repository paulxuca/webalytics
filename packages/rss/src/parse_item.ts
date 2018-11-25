import * as cheerio from 'cheerio'
import { Item } from './interfaces'

export function parseItem(node: CheerioElement): Item {
  const $ = cheerio.load(node, { xmlMode: true })
  const result: any = {}
  result.title =
    $('title')
      .first()
      .text() || ''
  result.description =
    $('summary,description')
      .first()
      .text() || ''
  result.url = findUrl($)
  result.pubDate = $('updated,pubDate,pubdate')
    .first()
    .text()
  result.image = findImage($)
  result.keywords = findKeywords($)
  return result
}

function findUrl($: CheerioStatic): string {
  return (
    $('link')
      .first()
      .attr('href') ||
    $('link')
      .first()
      .text() ||
    ''
  )
}

function findImage($: CheerioStatic): string {
  const image =
    $('enclosure').attr('url') ||
    $('media\\:content, media\\:thumbnail, content').attr('url')
  if (image) {
    return image
  } else {
    const str = $('media\\:content, content\\:encoded, content').html()
    if (str) {
      try {
        const matchResults = str.match(
          /\ssrc=["']*(([^'"\s]+)\.(jpe?g)|(png))["'\s]/
        )
        return matchResults ? matchResults[1] : ''
      } catch (e) {
        return ''
      }
    } else {
      return ''
    }
  }
}

function findKeywords($: CheerioStatic): string[] {
  return $('category,categories')
    .map((_, e) => $(e).text())
    .get()
}
