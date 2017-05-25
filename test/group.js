const should = require("should");
const ziffer = require("..")();

describe("Option: group", () => {
	it("Should default to 3", () => {
		ziffer.format(123456789).should.equal("123 456 789");
	});

	it("Should accept other sizes", () => {
		ziffer.format(123456789, { group: 1 }).should.equal("1 2 3 4 5 6 7 8 9");
		ziffer.format(123456789, { group: 2 }).should.equal("1 23 45 67 89");
		ziffer.format(123456789, { group: 4 }).should.equal("1 2345 6789");
		ziffer.format(123456789, { group: 5 }).should.equal("1234 56789");
		ziffer.format(123456789, { group: 6 }).should.equal("123 456789");

		// still preserves default
		ziffer.format(123456789).should.equal("123 456 789");
	});
});
