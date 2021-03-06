import Metadata from './metadata'
import { Parser } from './parser'

export * from './parser'

/**
 * Convenience method for processing a html document and extracting all
 * possible metadata fields at once.
 *
 * @param html utf-8 string containing html
 * @param url optional base url of the html document (for normalizing links)
 */
export default function(html: string, url: string = ''): Metadata {
  return Parser.scan(html, url)
}
