import Metadata from './metadata'
import Parser from './parser'

export default function(html: string, url: string = ''): Metadata {
  const parser = new Parser(html, url)
  parser.scan()
  const results = parser.results()
  return results
}
