'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const tryCatch = require('try-catch');

const babel = require('./parsers/babel');
const customParser = require('./custom-parser');

test('putout: parser: custom parser: object', (t) => {
    const source = 'hello';
    const parse = stub();
    const parser = {
        parse,
    };
    
    let isJSX;
    let isTS;
    
    const options = {
        isJSX,
        isTS,
    };
    
    customParser(source, parser, options);
    
    t.calledWith(parse, [source, options]);
    t.end();
});

test('putout: parser: custom parser: typescript + jsx: ambiguity', (t) => {
    const source = `
        const boundaryElement = <HTMLElement1>e.target;
   `;
    
    const args = [
        source,
        babel, {
            isTS: true,
        },
    ];
    
    const [error] = tryCatch(customParser, ...args);
    
    t.notOk(error);
    t.end();
});

