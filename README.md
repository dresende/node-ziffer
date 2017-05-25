## Ziffer

[![Build Status](https://secure.travis-ci.org/dresende/node-ziffer.png?branch=master)](http://travis-ci.org/dresende/node-ziffer)
[![](https://badge.fury.io/js/ziffer.svg)](https://npmjs.org/package/ziffer)
[![](https://gemnasium.com/dresende/node-ziffer.png)](https://gemnasium.com/dresende/node-ziffer)

NodeJS simple number formatter.

### Install

```sh
npm i ziffer
```

### Usage

```js
const ziffer = require("ziffer");
const euro   = ziffer({ inprefix: "€ ", decimals: 2 });

// prints "€ 12 345,68"
console.log(euro.format(12345.678));

// prints "-€ 12_345::7"
console.log(euro.format(-12345.678, { decimals: 1, thousands: "_", radix: "::" }));

// prints "(€ 12 345,68)"
console.log(euro.format(-12345.678, { negative: "paren" }));

// prints -12345.678
console.log(euro.unformat("(€ 12 345,68)", { negative: "paren" }));
```

### Options

When creating a ziffer formatter you can pass any of theses options in an optional object. Theses will be the defaults to subsequent `.format()` calls. You can also set an individual option in a specific call by passing a second options argument as seen above.

**List of Options**

- `radix`: separator between integer and fraction (default: comma)
- `thousands`: separator between integer blocks (default: space)
- `outprefix`: string prefix (default: none)
- `inprefix`: string prefix (default: none)
- `insuffix`: string suffix (default: none)
- `outsuffix`: string suffix (default: none)
- `negative`: how negative values are expressed - "left", "right" or parenthesis (default: left)
- `blocksize`: size of digit blocks separated by `thousands` (default: 3)
- `decimals`: number of decimals in fraction to round to (default: no rounding)

The reason there's an `in` and `out` prefix and suffix is because of how negative values are formatted. The negative characters (minus or parenthesis) are placed in between, which leaves you the opportunity to format any way you like.

Here's a weird example:

```js
const ziffer = require("ziffer");
const euro   = ziffer({
    outprefix : "<",
    inprefix  : "[",
    insuffix  : "]",
    outsuffix : ">",
    negative  : "paren"
});

// prints <([123])>
console.log(euro.format(-123));
// notice how parenthesis are place in between
```
