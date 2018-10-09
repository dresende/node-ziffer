const should = require("should");
const ziffer = require("..");

describe("Options", () => {
	it("Should keep base ones between .format() calls", () => {
		var n = ziffer({ decimals: 2 });

		// default
		n.format(12.3456).should.equal("12,35");
		// exception
		n.format(12.3456, { decimals: 3 }).should.equal("12,346");
		// default
		n.format(12.3456).should.equal("12,35");

		// nasty edge cases
		n.format(9.945, { decimals: 0 }).should.equal("10");
		n.format(9.945, { decimals: 1 }).should.equal("9,9");
		n.format(9.945, { decimals: 2 }).should.equal("9,95");
		n.format(9.945, { decimals: 3 }).should.equal("9,945");
		n.format(9.945, { decimals: 4 }).should.equal("9,9450");
		n.format(9.945, { decimals: 5 }).should.equal("9,94500");
	});
});
