const should = require("should");
const ziffer = require("..");

describe(".unformat()", () => {
	it("Should detect prefixes and suffixes", () => {
		const n = ziffer({ outprefix: "[", inprefix: "(" });

		n.unformat("[(123,456").should.equal(123.456);
		n.unformat("[(123,456)", { outsuffix: ")" }).should.equal(123.456);
	});

	it("Should detect negative values", () => {
		ziffer({ negative: "left" }).unformat("-123,456").should.equal(-123.456);
		ziffer({ negative: "right" }).unformat("123,456-").should.equal(-123.456);
		ziffer({ negative: "paren" }).unformat("(123,456)").should.equal(-123.456);
	});

	it("Should detect thousands separator", () => {
		ziffer({ thousands: ".." }).unformat("123..456..789..123").should.equal(123456789123);
		ziffer({ thousands: "" }).unformat("123456789123").should.equal(123456789123);
	});

	it("Should detect decimals and round", () => {
		ziffer({ decimals: 0 }).unformat("123,").should.equal(123);
		ziffer({ decimals: 0 }).unformat("123,456").should.equal(123);
		ziffer({ decimals: 0 }).unformat("1234,56").should.equal(1235);
		ziffer({ decimals: 2 }).unformat("123,456").should.equal(123.46);
	});
});
