var DataValidation = require('./../../../lib/domain/DataValidation');

describe("DataValidation - double - tests", function () {
    it("11.12 is valid double", function () {
        expect(DataValidation.isValidDouble(11.12)).toEqual(true);
    });

    it("-11.12 is valid double", function () {
        expect(DataValidation.isValidDouble(-11.12)).toEqual(true);
    });

    it("NaN is not valid double", function () {
        expect(DataValidation.isValidDouble(NaN)).toEqual(false);
    });
});
