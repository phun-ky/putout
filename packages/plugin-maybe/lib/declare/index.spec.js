'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['maybe/declare', declare],
    ],
});

test('plugin-maybe: declare: report', (t) => {
    t.report('declare', `Declare 'maybeArray', it referenced but not defined`);
    t.end();
});

test('plugin-maybe: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-maybe: declare: transform: maybe-first', (t) => {
    t.transform('maybe-first');
    t.end();
});

test('plugin-maybe: declare: transform: maybe-call', (t) => {
    t.transform('maybe-call');
    t.end();
});
