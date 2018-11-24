# @webalytics/metadata

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Build Status](https://travis-ci.org/Anonyfox/webalytics.svg?branch=master)](https://travis-ci.org/Anonyfox/webalytics)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)

Given some HTML website, extract common metadata fields. Part of the
[Webalytics Toolbox](https://github.com/Anonyfox/webalytics).

## Installation

`npm install --save @webalytics/metadata`

## Extracted Properties (if possible)

```typescript
interface Metadata {
  title: string
  description: string
  url: string
  image: string
  feeds: string[]
  favicon: string
  keywords: string[]
  author: string
}
```

## Usage (convenience)

This package works out-of-the-box with any HTML document without further
configuration:

```typescript
import metadata from '@webalytics/metadata'

const html = '<html><head><title>abc</title></head><body></body></html>'
const data = metadata(html) // { title: 'abc' }
```

## Usage (convenience, with url aid)

When given an additional hint with the base url of the HTML document, relative
urls can be resolved correctly:

```typescript
import metadata from '@webalytics/metadata'

const url = 'http://example.com'
const html = '<html><head><link rel="icon" href="/fav" /></head><body /></html>'
const data = metadata(html, url) // { favicon: 'http://example.com/fav' }
```

## Usage (selective)

When the HTML document or snippet shall not be processed completely, use the
underlying parser class directly and select just the fields you want:

```typescript
import { Parser } from '@webalytics/metadata'

const url = 'http://example.com'
const html = '<html><head><title>abc</title></head><body></body></html>'
const document = new Parser(html, url) // same signature as default method
const title = document.selectTitle() // 'abc'
```

## Usage (fully customized)

If the pre-chosen selectors not suit you completely, you can also hook directly
into the underlying [cheerio](https://github.com/cheeriojs/cheerio) DOM selector
engine. It's like jQuery, but in node:

```typescript
import { Parser } from '@webalytics/metadata'

const url = 'http://example.com'
const html = '<html><head><title>abc</title></head><body></body></html>'
const document = new Parser(html, url) // same signature as default method
const title = document.$('title').text() // 'abc'
```

## License

[LGPL v3](https://github.com/Anonyfox/webalytics/blob/master/LICENSE.md). You
can use this code any way you want without restrictions, but I want bugfixes
and improvements to flow back to this repository to benefit everyone.
