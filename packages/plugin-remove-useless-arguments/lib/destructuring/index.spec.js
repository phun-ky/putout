'use strict';

const {createTest} = require('@putout/test');
const destructuring = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-arguments/destructuring', destructuring],
    ],
});

test('plugin-remove-useless-arguments: transform: second', (t) => {
    t.transform('second');
    t.end();
});

test('plugin-remove-useless-arguments: no report', (t) => {
    t.noReport('spread');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});

test('plugin-remove-useless-arguments: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});

test('plugin-remove-useless-arguments: destructuring: no transform: function as argument', (t) => {
    t.noTransform('fn-as-arg');
    t.end();
});

test('plugin-remove-useless-arguments: destructuring: no transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});

test('plugin-remove-useless-arguments: destructuring: no report: nested', (t) => {
    t.noReport('nested');
    t.end();
});
