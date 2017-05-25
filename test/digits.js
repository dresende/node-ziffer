const should = require("should");
const ziffer = require("..");

describe("Option: digits", () => {
	it("Should default to null", () => {
		const n = ziffer();

		n.format(123.456).should.equal("123,456");
	});

	it("Should accept a string with 10 symbols to replace from 0 to 9", () => {
		const n = ziffer();

		n.format(123.456, { digits: "٠١٢٣٤٥٦٧٨٩" }).should.equal("١٢٣,٤٥٦");
	});

	it("Should be able to unformat into common decimals again", () => {
		const n = ziffer();

		n.unformat("١٢٣,٤٥٦", { digits: "٠١٢٣٤٥٦٧٨٩" }).should.equal(123.456);
	});
});
