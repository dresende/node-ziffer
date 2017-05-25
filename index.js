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
			decimals  : -1
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
		let options  = merge(this.options, additional_options);
		let negative = (number < 0);

		if (options.decimals != -1) {
			number = number.toFixed(options.decimals);
		}

		let integer   = "" + Math.floor(Math.abs(number));
		let decimal   = ("" + Math.abs(number)).substr(integer.length + 1);
		let formatted = "";

		if (options.thousands.length && options.group > 0) {
			for (let i = integer.length - 1; i >= 0; i -= options.group) {
				let from = i - options.group + 1;

				formatted = (from >= 0
				          ? integer.substr(from, options.group)
				          : integer.substr(0, options.group + from))
				          + formatted;

				if (from > 0 && options.thousands.length) {
					formatted = options.thousands + formatted;
				}
			}
		} else {
			formatted = integer;
		}

		if (options.decimals != 0 && decimal.length) {
			formatted += options.decimal + decimal;
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

	unformat(formatted, additional_options = {}) {
		let options    = merge(this.options, additional_options);
		let negative   = false;
		let strip_left = (text) => {
			if (!text.length) return;
			if (formatted.substr(0, text.length) != text) return;

			formatted = formatted.substr(text.length);
		};
		let strip_right = (text) => {
			if (!text.length) return;
			if (formatted.substr(formatted.length - text.length) != text) return;

			formatted = formatted.substr(0, formatted.length - text.length);
		};

		formatted = formatted.trim();

		strip_left(options.outprefix);
		strip_right(options.outsuffix);

		if (options.negative == "paren") {
			if (formatted[0] == "(" && formatted[formatted.length - 1] == ")") {
				formatted = formatted.substr(1, formatted.length - 2);
				negative  = true;
			}
		} else if (options.negative == "right") {
			if (formatted[formatted.length - 1] == "-") {
				formatted = formatted.substr(0, formatted.length - 1);
				negative  = true;
			}
		} else {
			if (formatted[0] == "-") {
				formatted = formatted.substr(1);
				negative  = true;
			}
		}

		strip_left(options.inprefix);
		strip_right(options.insuffix);

		if (options.thousands.length) {
			formatted = formatted.split(options.thousands);

			if (options.decimal.length && options.decimal == options.thousands && options.decimals != 0) {
				formatted = formatted.slice(0, formatted.length - 1).join("") + options.decimal + formatted[formatted.length - 1];
			} else {
				formatted = formatted.join("");
			}
		}

		if (options.decimal.length) {
			formatted = formatted.replace(options.decimal, ".");
		}

		formatted = parseFloat(formatted, 10);

		if (isNaN(formatted)) return null;

		if (negative) {
			formatted *= -1;
		}

		if (options.decimals == -1) {
			return formatted;
		}

		return +(formatted.toFixed(options.decimals));
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
