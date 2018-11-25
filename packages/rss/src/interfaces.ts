export interface Feed {
  title: string
  description: string
  url: string
  items: Item[]
}

export interface Item {
  title: string
  description: string
  url: string
  image: string
  pubDate: string
  keywords: string[]
}
