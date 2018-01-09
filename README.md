# xlsxstream

**xlsxstream** is a module that creates xlsx files based on data sent through the stream. This allows you to create large xlsx files with little memory usage.
The condition of the module's operation is the correct connection of streams. The best way is to use **pipe** function.

# Menu

- [Installation](#installation)
- [Example](#example)
- [Create worksheet from stream](#create-worksheet-from-stream)
- [Add many worksheets](#add-many-worksheets)
- [Worksheet](#worksheet)
  * [Column](#column)
  * [Row](#row)
  * [Merge cells](#merge-cells)


## Installation

```
npm install --save @pmilitowski/xlsxstream
```
## Example

```js
var PassThrough = require('stream').PassThrough;
var Xlsxstream = require('@pmilitowski/xlsxstream');
var Worksheet = Xlsxstream.worksheet;

var fs = require('fs');
var writeStream = fs.createWriteStream('./example.xlsx');
var passThrough = new PassThrough();

var workbookStream = new Xlsxstream.WorkbookStream();

workbookStream
  .setReadStream(passThrough)
  .setWriteStream(writeStream);

passThrough.push(Xlsxstream.actions.addWorksheet('WorksheetName'));

var row = new Worksheet.Row();
row.addCell(new Worksheet.Cell('field1'));
row.addCell(new Worksheet.Cell('field2'));
passThrough.push(Xlsxstream.actions.defineRow(row));

passThrough.push(Xlsxstream.actions.addRow(row, {
  field1: 'value1',
  field2: 'value2'
}));
passThrough.push(Xlsxstream.actions.addRow(row, {
  field1: 'value3',
  field2: 'value4'
}));

passThrough.push(Xlsxstream.actions.closeWorksheet());
passThrough.push(Xlsxstream.actions.closeWorkbook());
```

## Create worksheet from stream

```js
var fs = require('fs');
var readStream = fs.createReadStream('./example.csv');
var csv = require('csvtojson');

var Transform = require('stream').Transform;
var Xlsxstream = require('@pmilitowski/xlsxstream');
var Worksheet = Xlsxstream.worksheet;

var writeStream = fs.createWriteStream('./example.xlsx');

var row = new Worksheet.Row();
row.addCell(new Worksheet.Cell('field1'));
row.addCell(new Worksheet.Cell('field2'));

var transform = new Transform();
transform._transform = function (chunk, encoding, callback) {
  var value = JSON.parse(chunk.toString());
  this.push(Xlsxstream.actions.addRow(row, value));
  callback();
};
transform._flush = function (callback) {
  this.push(Xlsxstream.actions.closeWorksheet());
  this.push(Xlsxstream.actions.closeWorkbook());
  callback();
  console.log('finish');
};

var dataStream = csv({ noheader: true })
  .fromStream(readStream)
  .pipe(transform);

transform.push(Xlsxstream.actions.addWorksheet('WorksheetName'));
transform.push(Xlsxstream.actions.defineRow(row));

var workbookStream = new Xlsxstream.WorkbookStream();

workbookStream
  .setReadStream(dataStream)
  .setWriteStream(writeStream);
```
## Add many worksheets

```js
var PassThrough = require('stream').PassThrough;
var Xlsxstream = require('@pmilitowski/xlsxstream');
var Worksheet = Xlsxstream.worksheet;

var fs = require('fs');
var writeStream = fs.createWriteStream('./example.xlsx');
var passThrough = new PassThrough();

var workbookStream = new Xlsxstream.WorkbookStream();

workbookStream
  .setReadStream(passThrough)
  .setWriteStream(writeStream);

passThrough.write(Xlsxstream.actions.addWorksheet('WorksheetName1'));

var row = new Worksheet.Row();
row.addCell(new Worksheet.Cell('field1'));
row.addCell(new Worksheet.Cell('field2'));
passThrough.push(Xlsxstream.actions.defineRow(row));

passThrough.push(Xlsxstream.actions.addRow(row, {
  field1: 'value1',
  field2: 'value2'
}));
passThrough.push(Xlsxstream.actions.addRow(row, {
  field1: 'value3',
  field2: 'value4'
}));

passThrough.push(Xlsxstream.actions.closeWorksheet());
passThrough.push(Xlsxstream.actions.addWorksheet('WorksheetName2'));

passThrough.push(Xlsxstream.actions.addRow(row, {
  field1: 'value5',
  field2: 'value6'
}));
passThrough.push(Xlsxstream.actions.addRow(row, {
  field1: 'value7',
  field2: 'value8'
}));

passThrough.push(Xlsxstream.actions.closeWorksheet());
passThrough.push(Xlsxstream.actions.closeWorkbook());
```
## Worksheet
### Column
```js
var PassThrough = require('stream').PassThrough;
var Xlsxstream = require('@pmilitowski/xlsxstream');
var Worksheet = Xlsxstream.worksheet;

var fs = require('fs');
var writeStream = fs.createWriteStream('./example.xlsx');
var passThrough = new PassThrough();

var workbookStream = new Xlsxstream.WorkbookStream();

workbookStream
  .setReadStream(passThrough)
  .setWriteStream(writeStream);

passThrough.push(Xlsxstream.actions.addWorksheet('WorksheetName'));

// sets the width for columns 1 to 5
var minColumn = 1;
var maxColumn = 5;
var column = new Worksheet.Column(minColumn, maxColumn);
column.setWidth(30);
passThrough.push(Xlsxstream.actions.addColumn(column));

passThrough.push(Xlsxstream.actions.closeWorksheet());
passThrough.push(Xlsxstream.actions.closeWorkbook());

```
### Row
```js
var PassThrough = require('stream').PassThrough;
var Xlsxstream = require('@pmilitowski/xlsxstream');
var Worksheet = Xlsxstream.worksheet;

var fs = require('fs');
var writeStream = fs.createWriteStream('./example.xlsx');
var passThrough = new PassThrough();

var workbookStream = new Xlsxstream.WorkbookStream();

workbookStream
  .setReadStream(passThrough)
  .setWriteStream(writeStream);

passThrough.push(Xlsxstream.actions.addWorksheet('WorksheetName'));

var row = new Worksheet.Row();
row.setHeight(30);

var cell1 = new Worksheet.Cell('field1');
cell1.setIsFormula(true);
row.addCell(cell1);

var cell2 = new Worksheet.Cell('field2');
cell2.setType(Worksheet.Cell.types.NUMBER);
row.addCell(cell2);

var cell3 = new Worksheet.Cell('field3');
cell3.setType(Worksheet.Cell.types.NUMBER);
row.addCell(cell3);

var cell4 = new Worksheet.Cell('field4');
cell4
  .setType(Worksheet.Cell.types.NUMBER)
  .setNumberFormat(Worksheet.Cell.numberFormats['YYYY-MM-DD HH:MM']);
row.addCell(cell4);

passThrough.push(Xlsxstream.actions.defineRow(row));
passThrough.push(Xlsxstream.actions.addRow(row, {
  field1: 'SUM(B1:C1)',
  field2: 4,
  field3: 9,
  field4: '2017-06-05'
}));

passThrough.push(Xlsxstream.actions.closeWorksheet());
passThrough.push(Xlsxstream.actions.closeWorkbook());
```
### Merge cells
```js
var PassThrough = require('stream').PassThrough;
var Xlsxstream = require('@pmilitowski/xlsxstream');
var Worksheet = Xlsxstream.worksheet;

var fs = require('fs');
var writeStream = fs.createWriteStream('./example.xlsx');
var passThrough = new PassThrough();

var workbookStream = new Xlsxstream.WorkbookStream();

workbookStream
  .setReadStream(passThrough)
  .setWriteStream(writeStream);

passThrough.push(Xlsxstream.actions.addWorksheet('WorksheetName'));

// Merge A1:B1 cells
passThrough.push(Xlsxstream.actions.mergeCells(new Worksheet.MergedCells(1, 2, 1, 1)));

passThrough.push(Xlsxstream.actions.closeWorksheet());
passThrough.push(Xlsxstream.actions.closeWorkbook());
```