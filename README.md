# eql-engine

E-Learnig query language interpreter

## Usage

For node.js

```js
// npm install eql-engine
var eql = require('eql-engine');
```

```js

var query = eql.parse("select all:some text");
// do something with query

```

## Parsed queries

**SELECT** 

basic `select all:some text`

```js
{
  command: 'select',
  filters: [ { key: 'all', value: 'some text' } ]
}
```

## Licencia

Copyright(c) 2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)

Distrubuido bajo la licencia [GNU GPL v3](http://www.gnu.org/licenses/gpl-3.0.html)
