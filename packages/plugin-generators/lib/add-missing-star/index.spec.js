'use strict';

const {createTest} = require('@putout/test');
const convert = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['promises/add-missing-star', convert],
    ],
});

test('plugin-add-missing-star: exports: report: add-missing-star', (t) => {
    t.report('add-missing-star', `Add missing '*' in generator function`);
    t.end();
});

test('plugin-add-missing-star: no report: member', (t) => {
    t.noReport('member');
    t.end();
});

test('plugin-add-missing-star: transform: add-missing-star', (t) => {
    t.transform('add-missing-star');
    t.end();
});

test('plugin-add-missing-star: transform: yield-star', (t) => {
    t.transform('yield-star');
    t.end();
});
