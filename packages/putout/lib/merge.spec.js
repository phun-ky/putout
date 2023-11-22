'use strict';

const test = require('supertape');
const merge = require('./merge');

test('putout: merge', (t) => {
    const defaultConfig = {
        plugins: ['remove-unused-variables'],
    };
    
    const result = merge(defaultConfig, {
        plugins: ['extract-sequence-expressions'],
    });
    
    const expected = {
        plugins: [
            'extract-sequence-expressions',
            'remove-unused-variables',
        ],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: merge: ignore', (t) => {
    const defaultConfig = {
        plugins: ['remove-unused-variables'],
    };
    
    const result = merge(defaultConfig, {
        ignore: [
            '**/coverage',
            '!**/coverage',
        ],
    });
    
    const expected = {
        plugins: ['remove-unused-variables'],
        ignore: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: merge: rules', (t) => {
    const options = {
        rules: {
            'filesystem/remove-files': ['on', {
                names: ['*.md'],
            }],
        },
    };
    
    const result = merge({}, options);
    
    t.deepEqual(result, options);
    t.end();
});
