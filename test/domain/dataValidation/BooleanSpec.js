var DataValidation = require('./../../../lib/domain/DataValidation');

describe("DataValidation - boolean - tests", function () {
    it("true, false are valid boolean", function () {
        expect(DataValidation.isValidBoolean(true)).toEqual(true);
        expect(DataValidation.isValidBoolean(false)).toEqual(true);
    });

    it("'true' is not valid boolean", function () {
        expect(DataValidation.isValidBoolean('true')).toEqual(false);
    });

    it("'false' is not valid boolean", function () {
        expect(DataValidation.isValidBoolean('false')).toEqual(false);
    });

    it("1 is not valid boolean", function () {
        expect(DataValidation.isValidBoolean(1)).toEqual(false);
    });

    it("0 is not valid boolean", function () {
        expect(DataValidation.isValidBoolean(0)).toEqual(false);
    });
});
