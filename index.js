"use strict";

module.exports = (options) => {
	return new Formatter(options);
};

class Formatter {
	constructor(options = {}) {
		this.options = merge({
			radix     : ",",
			thousands : " ",
			inprefix  : "",
			insuffix  : "",
			outprefix : "",
			outsuffix : "",
			negative  : "left",
			blocksize : 3,
			decimals  : -1
		}, options);
	}

	/**

	Format number according to these parts:

	- <outprefix>
	- (<negative>)?
	- <inprefix>
	- (<number:blocksize><thousands>)*<number:blocksize>
	- (<radix><number:decimals>)?
	- <insuffix>
	- (<negative>)?
	- <outsuffix>

	1. option outprefix string
	2. if number is negative and:
	   - if option negative is paren, add open parenthesis
	   - else if option negative is left, add minus
	3. option inprefix string
	4. for every integer part in option blocksize blocks, add option thousands string separator
	5. if decimals add option radix string and decimals
	6. option insuffix string
	7. if number is negative and:
	   - if option negative is paren, add open parenthesis
	   - else if option negative is right, add minus
	8. option outsuffix string

	 **/
	format(number = 0, additional_options = {}) {
		let options  = merge(this.options, additional_options);
		let negative = (number < 0);

		if (options.decimals != -1) {
			number = number.toFixed(options.decimals);
		}

		let integer   = "" + Math.floor(Math.abs(number));
		let decimal   = ("" + Math.abs(number)).substr(integer.length + 1);
		let formatted = "";

		for (let i = integer.length - 1; i >= 0; i -= options.blocksize) {
			let from = i - options.blocksize + 1;

			formatted = (from >= 0
			          ? integer.substr(from, options.blocksize)
			          : integer.substr(0, options.blocksize + from))
			          + formatted;

			if (from > 0 && options.thousands.length) {
				formatted = options.thousands + formatted;
			}
		}

		if (options.decimals != 0 && decimal.length) {
			formatted += options.radix + decimal;
		}

		formatted = options.inprefix + formatted + options.insuffix;

		if (negative) {
			if (options.negative == "paren") {
				formatted = "(" + formatted + ")";
			} else if (options.negative == "right") {
				formatted += "-";
			} else {
				formatted = "-" + formatted;
			}
		}

		formatted = options.outprefix + formatted + options.outsuffix;

		return formatted;
	}
}

function merge(base, obj) {
	var ret = {};

	for (let k in base) {
		if (typeof obj[k] != "undefined") continue;

		ret[k] = base[k];
	}

	for (let k in obj) {
		ret[k] = obj[k];
	}

	return ret;
}
