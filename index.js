var StreamArchivier = require('./lib/infrastructure/StreamArchivier');
var Workbook = require('./lib/domain/workbook');
var Actions = require('./lib/actions');
var Column = require('./lib/domain/workbook/worksheet/Column');
var Row = require('./lib/domain/workbook/worksheet/Row');
var Cell = require('./lib/domain/workbook/worksheet/Cell');
var MergedCells = require('./lib/domain/workbook/worksheet/MergedCells');

/**
 * @constructor
 */
function WorkbookStream() {
    this.streamArchivier = new StreamArchivier();
    this.workbook = new Workbook();
    this.workbook.pipe(this.streamArchivier);
};

module.exports = {
    WorkbookStream: WorkbookStream,
    worksheet: {
        Column: Column,
        Row: Row,
        Cell: Cell,
        MergedCells: MergedCells
    },
    actions: Actions
};

WorkbookStream.prototype.setReadStream = function (readStream) {
    readStream.pipe(this.workbook);
    return this.streamArchivier;
};
