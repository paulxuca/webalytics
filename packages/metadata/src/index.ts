import Metadata from './metadata'
import Parser from './parser'

export * from './Parser'

export default function(html: string, url: string = ''): Metadata {
  return Parser.scan(html, url)
}
