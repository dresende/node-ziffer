const should = require("should");
const ziffer = require("..");

describe("Option: decimal", () => {
	it("Should default to comma", () => {
		const n = ziffer();

		n.format(1.23456).should.equal("1,23456");
	});

	it("Should accept any string", () => {
		const n = ziffer({ decimal: ";;" });

		n.format(1.23456).should.equal("1;;23456");
		n.format(1.234).should.equal("1;;234");
		n.format(1).should.equal("1");
	});

	it("Should allow a one-time change", () => {
		const n = ziffer({ decimal: ";;" });

		n.format(1.23456).should.equal("1;;23456");
		n.format(1.23456, { decimal: "." }).should.equal("1.23456");
		n.format(1.23456).should.equal("1;;23456");
	});
});
