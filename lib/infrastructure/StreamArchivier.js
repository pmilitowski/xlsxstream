var Transform = require('stream').Transform;
var PassThrough = require('stream').PassThrough;
var ZipStream = require('zip-stream');

var util = require('util');

/**
 * @constructor
 */
function StreamArchivier() {
    this.archive = new ZipStream();
    Transform.call(this);
};

util.inherits(StreamArchivier, Transform);

module.exports = StreamArchivier;

StreamArchivier.actions = {
    ADD_FILE: 'ADD_FILE',
    WRITE_DATA: 'WRITE_DATA',
    CLOSE_FILE: 'CLOSE_FILE',
    CLOSE_ARCHIVE: 'CLOSE_ARCHIVE'
};

StreamArchivier.prototype.changeFile = function (data, callback) {
    this.passThrough = new PassThrough();
    this.archive.once('pipe', function () {
        callback();
    }.bind(this));

    this.archive.entry(this.passThrough, { name: data.fileName }, function (error) {
        if (error) {
            throw error;
        }
        this.emit('closeFile');
    }.bind(this));
};
StreamArchivier.prototype.closeFile = function (callback) {
    this.once('closeFile', function () {
        callback();
    }.bind(this));

    this.passThrough.end();
};
StreamArchivier.prototype.writeToFile = function (data, callback) {
    var ok = this.passThrough.write(data.data);
    if (!ok) {
        this.passThrough.once('drain', function () {
            callback();
        });
    } else {
        callback();
    }
};
StreamArchivier.prototype.closeArchive = function (callback) {
    this.archive.finish();
    callback();
}

StreamArchivier.prototype.setWriteStream = function (stream) {
    return this.archive.pipe(stream);
}

StreamArchivier.prototype._transform = function (chunk, encoding, callback) {
    chunk = JSON.parse(chunk);
    switch (chunk.action) {
        case StreamArchivier.actions.ADD_FILE:
            this.changeFile(chunk, callback);
            break;
        case StreamArchivier.actions.WRITE_DATA:
            this.writeToFile(chunk, callback);
            break;
        case StreamArchivier.actions.CLOSE_FILE:
            this.closeFile(callback);
            break;
        case StreamArchivier.actions.CLOSE_ARCHIVE:
            this.closeArchive(callback);
            break;
    }
};
