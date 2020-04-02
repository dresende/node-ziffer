## Ziffer

[![Build Status](https://secure.travis-ci.org/dresende/node-ziffer.png?branch=master)](http://travis-ci.org/dresende/node-ziffer)
[![Code Climate](https://codeclimate.com/github/dresende/node-ziffer/badges/gpa.svg)](https://codeclimate.com/github/dresende/node-ziffer)
[![](https://badge.fury.io/js/ziffer.svg)](https://npmjs.org/package/ziffer)
[![Dependency Status](https://gemnasium.com/badges/github.com/dresende/node-ziffer.svg)](https://gemnasium.com/github.com/dresende/node-ziffer)

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
console.log(euro.format(-12345.678, { decimals: 1, thousands: "_", decimal: "::" }));

// prints "(€ 12 345,68)"
console.log(euro.format(-12345.678, { negative: "paren" }));

// prints -12345.678
console.log(euro.unformat("(€ 12 345,68)", { negative: "paren" }));
```

### Options

When creating a ziffer formatter you can pass any of these options in an optional object. These will be the defaults to subsequent `.format()` calls. You can also set an individual option in a specific call by passing a second options argument as seen above.

**List of Options**

- `decimal`: separator between integer and fraction (default: comma)
- `thousands`: separator between integer groups (default: space)
- `outprefix`: string prefix (default: none)
- `inprefix`: string prefix (default: none)
- `insuffix`: string suffix (default: none)
- `outsuffix`: string suffix (default: none)
- `negative`: how negative values are expressed - "left", "right" or parenthesis (default: left)
- `group`: size of digit groups separated by `thousands` (default: 3)
- `group_except`: exception for digit grouping (default: 4)
- `decimals`: number of decimals in fraction to round to (default: no rounding)
- `digits`: a string with 10 digits from 0 to 9 (default: empty, which means 0-9)

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

### Advanced

#### Group

Integer digit grouping can also be configured using a list of group sizes instead of a single number. This allows, for example, to group digits the way Hindi do.

```js
const ziffer = require("ziffer");
const hindi  = ziffer({
    decimal   : ".",
    thousands : ",",
    group     : [ 3, 2 ],
    decimals  : 2
});

// prints 12,34,56,789.00
console.log(hindi.format(123456789));
```

#### Digits

For example, converting numbers to Arabic numeral can be done like the following:

```js
const ziffer = require("ziffer");
const arab   = ziffer({
    digits : "٠١٢٣٤٥٦٧٨٩"
});

// prints ١٥٩
console.log(arab.format(159));
```
