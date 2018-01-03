module.exports = {
    isValidBoolean: function (value) {
        return typeof value === 'boolean';
    },
    isValidUnsignedInt: function (value) {
        return typeof value === 'number' &&
            (value >= 0) && (value <= 4294967295) &&
            parseInt(value) === value;
    },
    isValidUnsignedByte: function (value) {
        return typeof value === 'number' &&
            (value >= 0) && (value <= 255) &&
            parseInt(value) === value;
    },
    isValidDouble: function (value) {
        return typeof value === 'number' && value === value;
    }
};