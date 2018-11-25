# @webalytics/rss

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Build Status](https://travis-ci.org/Anonyfox/webalytics.svg?branch=master)](https://travis-ci.org/Anonyfox/webalytics)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)

Given some RSS or Atom feed xml, extract common metadata fields and items.
Part of the [Webalytics Toolbox](https://github.com/Anonyfox/webalytics).

## Installation

`npm install --save @webalytics/rss`

## Extracted Properties (if possible)

```typescript
interface Feed {
  title: string
  description: string
  url: string
  items: Item[]
}

interface Item {
  title: string
  description: string
  url: string
  image: string
  pubDate: string
  keywords: string[]
}
```

## Usage (convenience)

This package works out-of-the-box with any Rss/Atom feed without further
configuration:

```typescript
import rss from '@webalytics/rss'

const xml = '<rss><title>abc</title></rss>'
const data = rss(html) // { title: 'abc' }
```

## Usage (convenience, with url aid)

When given an additional hint with the base url of the feed document, relative
urls can be resolved correctly:

```typescript
import rss from '@webalytics/rss'

const url = 'http://example.com'
const xml = '<rss><image><url>/img</url></image></rss>'
const data = rss(xml, url) // { image: 'http://example.com/img' }
```

## License

[LGPL v3](https://github.com/Anonyfox/webalytics/blob/master/LICENSE.md). You
can use this code any way you want without restrictions, but I want bugfixes
and improvements to flow back to this repository to benefit everyone.
