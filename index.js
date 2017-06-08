"use strict";

module.exports = (options) => {
	return new Formatter(options);
};

class Formatter {
	constructor(options = {}) {
		this.options = merge({
			decimal   : ",",
			thousands : " ",
			inprefix  : "",
			insuffix  : "",
			outprefix : "",
			outsuffix : "",
			negative  : "left",
			group     : 3,
			decimals  : -1,
			digits    : null
		}, options);
	}

	/**

	Format number according to these parts:

	- <outprefix>
	- (<negative>)?
	- <inprefix>
	- (<number:group><thousands>)*<number:group>
	- (<decimal><number:decimals>)?
	- <insuffix>
	- (<negative>)?
	- <outsuffix>

	1. option outprefix string
	2. if number is negative and:
	   - if option negative is paren, add open parenthesis
	   - else if option negative is left, add minus
	3. option inprefix string
	4. for every integer part in option group blocks, add option thousands string separator
	5. if decimals add option decimal string and decimals
	6. option insuffix string
	7. if number is negative and:
	   - if option negative is paren, add open parenthesis
	   - else if option negative is right, add minus
	8. option outsuffix string

	 **/
	format(number = 0, additional_options = {}) {
		if (isNaN(+number) || !isFinite(+number)) return "-";

		let options  = merge(this.options, additional_options);
		let negative = (number < 0);
		let integer, decimal;

		if (options.decimals !== -1) {
			number               = Math.abs(number).toFixed(options.decimals);
			[ integer, decimal ] = number.split(".");
		} else {
			integer = "" + Math.floor(Math.abs(number));
			decimal = ("" + Math.abs(number)).substr(integer.length + 1);
		}

		let formatted = this.__format_decimals(options, integer, decimal);

		formatted = options.inprefix + formatted + options.insuffix;

		if (negative) {
			if (options.negative === "paren") {
				formatted = "(" + formatted + ")";
			} else if (options.negative === "right") {
				formatted += "-";
			} else {
				formatted = "-" + formatted;
			}
		}

		formatted = options.outprefix + formatted + options.outsuffix;

		if (options.digits && options.digits.length === 10) {
			formatted = formatted.replace(/\d/g, (d) => options.digits[d]);
		}

		return formatted;
	}

	unformat(formatted, additional_options = {}) {
		let options    = merge(this.options, additional_options);
		let negative   = false;

		// strip out prefix/suffix
		formatted = strip(formatted.trim(), options.outprefix, options.outsuffix);

		// detect negative format
		[ formatted, negative ] = this.__unformat_negative(options, formatted);

		// strip in prefix/suffix
		formatted = strip(formatted.trim(), options.inprefix, options.insuffix);

		// strip thousands and convert digits
		formatted = this.__unformat_decimals(options, formatted);

		formatted = parseFloat(formatted, 10);

		if (isNaN(formatted)) return null;

		if (negative) {
			formatted *= -1;
		}

		if (options.decimals === -1) {
			return formatted;
		}

		return +(formatted.toFixed(options.decimals));
	}

	__unformat_negative(options, formatted) {
		if (options.negative === "paren") {
			if (formatted[0] === "(" && formatted[formatted.length - 1] === ")") {
				return [ formatted.substr(1, formatted.length - 2), true ];
			}
		} else if (options.negative === "right") {
			if (formatted[formatted.length - 1] === "-") {
				return [ formatted.substr(0, formatted.length - 1), true ];
			}
		} else {
			if (formatted[0] === "-") {
				return [ formatted.substr(1), true ];
			}
		}

		return [ formatted, false ];
	}

	__unformat_decimals(options, formatted) {
		if (options.thousands.length) {
			formatted = formatted.split(options.thousands);

			if (options.decimal.length && options.decimal === options.thousands && options.decimals !== 0) {
				formatted = formatted.slice(0, formatted.length - 1).join("") + options.decimal + formatted[formatted.length - 1];
			} else {
				formatted = formatted.join("");
			}
		}

		if (options.decimal.length) {
			formatted = formatted.replace(options.decimal, ".");
		}

		if (options.digits && options.digits.length === 10) {
			formatted = formatted.replace(new RegExp("[" + options.digits + "]", "g"), (c) => options.digits.indexOf(c));
		}

		return formatted;
	}

	__format_decimals(options, integer, decimal) {
		let formatted = "";

		if (options.thousands.length && ((Array.isArray(options.group) && options.group.length) || options.group > 0)) {
			if (!Array.isArray(options.group)) {
				options.group = [ options.group ];
			}

			let g         = 0;
			let from      = integer.length - options.group[g];

			for (let i = integer.length - 1; i >= 0; i -= options.group[g]) {
				formatted = (from >= 0
				          ? integer.substr(from, options.group[g])
				          : integer.substr(0, options.group[g] + from))
				          + formatted;

				if (from > 0 && options.thousands.length) {
					formatted = options.thousands + formatted;
				}

				if (g < options.group.length - 1) {
					g += 1;
				}

				from -= options.group[g];
			}
		} else  {
			formatted = integer;
		}

		if (options.decimals !== 0 && decimal.length) {
			formatted += options.decimal + decimal;
		}

		return formatted;
	}
}

function merge(base, obj) {
	var ret = {};

	for (let k in base) {
		if (typeof obj[k] !== "undefined") continue;

		ret[k] = base[k];
	}

	for (let k in obj) {
		ret[k] = obj[k];
	}

	return ret;
}

function strip(text, left, right) {
	return strip_right(strip_left(text, left), right);
}

function strip_left(text, left) {
	if (left.length && text.substr(0, left.length) === left) {
		return text.substr(left.length);
	}

	return text;
}

function strip_right(text, right) {
	if (right.length && text.substr(text.length - right.length) === right) {
		return text.substr(0, text.length - right.length);
	}

	return text;
}
