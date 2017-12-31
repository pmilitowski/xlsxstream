var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: 'test',
    spec_files: [
        '*/**/*Spec.js'
    ]
});

jasmine.execute();