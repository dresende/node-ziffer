const should = require("should");
const ziffer = require("..");

describe("Option: in/out prefix/suffix", () => {
	it("Should default to empty strings", () => {
		const n = ziffer();

		n.format(123).should.equal("123");
	});

	it("Should accept any combination", () => {
		const n = ziffer({ inprefix: "[", insuffix: "]" });

		n.format(123).should.equal("[123]");
		n.format(-123).should.equal("-[123]");
		n.format(-123, { insuffix: "", outsuffix: "]", negative: "right" }).should.equal("[123-]");
		n.format(-123, { inprefix: "", outprefix: "[" }).should.equal("[-123]");
		n.format(-123, { negative: "paren" }).should.equal("([123])");
		n.format(-123, { inprefix: "", outprefix: "[", negative: "paren" }).should.equal("[(123])");
		n.format(-123, { insuffix: "", outsuffix: "]", negative: "paren" }).should.equal("([123)]");
	});
});
