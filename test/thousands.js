const should = require("should");
const ziffer = require("..");

describe("Option: thousands", () => {
	it("Should default to space", () => {
		const n = ziffer();

		n.format(123456).should.equal("123 456");
	});

	it("Should accept any string", () => {
		const n = ziffer({ thousands: "," });

		n.format(123456).should.equal("123,456");
		n.format(1234567).should.equal("1,234,567");
		n.format(12345678).should.equal("12,345,678");
		n.format(123456789).should.equal("123,456,789");
	});

	it("Should allow a one-time change", () => {
		const n = ziffer({ thousands: "," });

		n.format(1234567).should.equal("1,234,567");
		n.format(1234567, { thousands: "." }).should.equal("1.234.567");
		n.format(1234567).should.equal("1,234,567");
	});
});
