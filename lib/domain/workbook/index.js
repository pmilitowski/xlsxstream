var Column = require('./worksheet/Column');
var Row = require('./worksheet/Row');
var Cell = require('./worksheet/Cell');
var Transform = require('stream').Transform;
var StreamArchivier = require('../../infrastructure/StreamArchivier');
var Worksheet = require('./Worksheet');
var Override = require('./contentType/Override');
var ContentType = require('../workbook/contentType');
var ContentTypeToXml = require('../ObjectToXml/ContentTypeToXml');
var WorkbookXml = require('../ObjectToXml/WorkbookXml');
var RelationshipXml = require('../ObjectToXml/RelationshipXml');
var Relationship = require('./Relationship');
var MergedCells = require('./worksheet/MergedCells');

var util = require('util');

/**
 * @constructor
 */
function Workbook() {
    Transform.call(this);

    this.worksheets = [];
    this.rowTypes = {};
    this.activeFile;
};

util.inherits(Workbook, Transform);

module.exports = Workbook;

Workbook.actions = {
    /**
    * @example
    * {action: WorkbookStream.actions.ADD_WORKSHEET, name: 'worksheet name'}
    * @description require params: name
    */
    ADD_WORKSHEET: 'ADD_WORKSHEET',
    /**
    * @example
    * {action: WorkbookStream.actions.CLOSE_WORKSHEET}
    */
    CLOSE_WORKSHEET: 'CLOSE_WORKSHEET',
    /**
     * @example
     * {action: WorkbookStream.actions.DECLARE_ROW, min: 2, max: 5, attributes: {width: 30, customWidth: true}}
     * @description require params: min, max
     */
    ADD_COLUMN: 'ADD_COLUMN',
    /**
    * @example
    * {action: WorkbookStream.actions.DEFINE_ROW, type: 'row type', attributes: {ht: 30, customHeight: true}, cells: [{name: 'field1'}, {name: 'field2'}]}
    * @requires type, cells
    */
    DEFINE_ROW: 'DEFINE_ROW',
    /**
    * @example
    * {action: WorkbookStream.actions.ADD_ROW, rowType: 'row type', rowData: {field1: value1, field2: value2}}
    * @requires min, max
    */
    ADD_ROW: 'ADD_ROW',
    /**
    * @example
    * @requires min, max
    */
    MERGE_CELLS: 'MERGE_CELLS',
    /**
    * @example
    * {action: WorkbookStream.actions.CLOSE_WORKBOOK}
    */
    CLOSE_WORKBOOK: 'CLOSE_WORKBOOK'
};

Workbook.prototype.getWorksheets = function () {
    return this.worksheets;
};
/**
 * 
 * @param {String} name 
 * @param {*} callback 
 */
Workbook.prototype.addWorksheet = function (name, callback) {
    var number = this.worksheets.length + 1;
    var worksheet = new Worksheet(name, number);
    this.activeFile = worksheet;
    this.worksheets.push(worksheet);
    this.push(JSON.stringify({
        action: StreamArchivier.actions.ADD_FILE,
        fileName: 'xl/worksheets/sheet' + number + '.xml'
    }));
    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: worksheet.getStartXml()
    }));
    callback();
};
Workbook.prototype.closeWorksheet = function (callback) {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: this.activeFile.getCloseXml()
    }));
    this.push(JSON.stringify({
        action: StreamArchivier.actions.CLOSE_FILE
    }));

    this.activeFile = null;
    callback();
};
Workbook.prototype.closeWorkbook = function (callback) {
    this.addContentTypeFile();
    this.addWorkBookFile();
    this.addArchiveRelationshipFile();
    this.addWorkbookRelationshipFile();
    this.addStylesFile();

    this.push(JSON.stringify({
        action: StreamArchivier.actions.CLOSE_ARCHIVE
    }));
    callback();
};
Workbook.prototype.addContentTypeFile = function () {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.ADD_FILE,
        fileName: '[Content_Types].xml'
    }));

    var overrides = this.worksheets.map(function (worksheet) {
        return new Override(
            'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml',
            '/xl/worksheets/sheet' + worksheet.getSheetId() + '.xml');
    });
    var contentType = new ContentType(overrides);
    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: ContentTypeToXml.getXml(contentType)
    }));
    this.push(JSON.stringify({
        action: StreamArchivier.actions.CLOSE_FILE
    }));
};
Workbook.prototype.addWorkBookFile = function () {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.ADD_FILE,
        fileName: 'xl/workbook.xml'
    }));
    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: WorkbookXml.getXml(this)
    }));
    this.push(JSON.stringify({
        action: StreamArchivier.actions.CLOSE_FILE
    }));
};
Workbook.prototype.addArchiveRelationshipFile = function () {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.ADD_FILE,
        fileName: '_rels/.rels'
    }));
    var workbookRelationship = new Relationship(
        'rId1',
        'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument',
        'xl/workbook.xml'
    );
    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: RelationshipXml.getXml([workbookRelationship])
    }));
    this.push(JSON.stringify({
        action: StreamArchivier.actions.CLOSE_FILE
    }));
};
Workbook.prototype.addWorkbookRelationshipFile = function () {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.ADD_FILE,
        fileName: 'xl/_rels/workbook.xml.rels'
    }));

    var worksheetRelations = this.getWorksheets().map(function (worksheet) {
        return new Relationship(
            worksheet.getId(),
            'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet',
            'worksheets/sheet' + worksheet.getSheetId() + '.xml'
        );
    });

    worksheetRelations.push(new Relationship(
        'style',
        'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles',
        'styles.xml'
    ));

    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: RelationshipXml.getXml(worksheetRelations)
    }));
    this.push(JSON.stringify({
        action: StreamArchivier.actions.CLOSE_FILE
    }));
};
Workbook.prototype.addStylesFile = function () {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.ADD_FILE,
        fileName: 'xl/styles.xml'
    }));

    var numFmt = [];
    var cellXfs = [];
    for (var key in Cell.numberFormats) {
        if (Cell.numberFormats.hasOwnProperty(key)) {
            numFmt[Cell.numberFormats[key]] = ('<numFmt numFmtId="' + Cell.numberFormats[key] + '" formatCode="' + key + '"/>');
            cellXfs[Cell.numberFormats[key]] = ('<xf xfId="0" numFmtId="' + Cell.numberFormats[key] + '"></xf>');
        }
    }

    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
            '<numFmts count="' + numFmt.length + '">' +
            numFmt.join('') +
            '</numFmts>' +
            '<cellStyleXfs count="1">' +
            '<xf numFmtId="0"></xf>' +
            '</cellStyleXfs>' +
            '<cellXfs count="' + numFmt.length + '">' +
            cellXfs.join('') +
            '</cellXfs>' +
            '</styleSheet>'
    }));
    this.push(JSON.stringify({
        action: StreamArchivier.actions.CLOSE_FILE
    }));
};

Workbook.prototype.declareRow = function (data, callback) {
    this.rowTypes[data.rowType] = data.params;
    callback();
};
Workbook.prototype.addRow = function (data, callback) {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: this.activeFile.getRowXml(this.rowTypes[data.rowType], data.rowData)
    }));
    callback();
};
Workbook.prototype.addColumn = function (data, callback) {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: this.activeFile.getColumnXml(data.params)
    }));
    callback();
};
Workbook.prototype.addMergeCells = function (data, callback) {
    this.push(JSON.stringify({
        action: StreamArchivier.actions.WRITE_DATA,
        data: this.activeFile.getMergeXml(new MergedCells(data.xMin, data.yMin, data.xMax, data.yMax))
    }));
    callback();
};

Workbook.prototype._transform = function (chunk, encoding, callback) {
    chunk = JSON.parse(chunk);
    switch (chunk.action) {
        case Workbook.actions.ADD_WORKSHEET:
            this.addWorksheet(chunk.name, callback);
            break;
        case Workbook.actions.CLOSE_WORKSHEET:
            this.closeWorksheet(callback);
            break;
        case Workbook.actions.CLOSE_WORKBOOK:
            this.closeWorkbook(callback);
            break;
        case Workbook.actions.DEFINE_ROW:
            this.declareRow(chunk, callback);
            break;
        case Workbook.actions.ADD_ROW:
            this.addRow(chunk, callback);
            break;
        case Workbook.actions.ADD_COLUMN:
            this.addColumn(chunk, callback);
            break;
        case Workbook.actions.MERGE_CELLS:
            this.addMergeCells(chunk, callback);
            break;
    }
};