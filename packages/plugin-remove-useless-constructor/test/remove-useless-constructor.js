'use strict';

const {createTest} = require('@putout/test');
const removeUselessConstructor = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-constructor', removeUselessConstructor],
    ],
});

test('plugin-remove-useless-constructor: report', (t) => {
    t.report('constructor', 'Avoid useless constructor');
    t.end();
});

test('plugin-remove-useless-constructor: transform', (t) => {
    t.transform('constructor');
    t.end();
});
