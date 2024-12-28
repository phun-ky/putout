'use strict';

const {operator, types} = require('putout');
const {
    isNumericLiteral,
    isExportNamedDeclaration,
} = types;
const {remove} = operator;

module.exports.report = () => 'Avoid unchanged zero declarations';
module.exports.fix = ({path, referencePaths}) => {
    for (const ref of referencePaths) {
        remove(ref);
    }
    
    remove(path);
};

module.exports.traverse = ({push}) => ({
    VariableDeclarator(path) {
        const {init, id} = path.node;
        
        if (!isNumericLiteral(init))
            return;
        
        if (init.value)
            return;
        
        if (isExportNamedDeclaration(path.parentPath.parentPath))
            return;
        
        const {name} = id;
        const binding = path.scope.bindings[name];
        
        const {
            constantViolations,
            referencePaths,
        } = binding;
        
        if (constantViolations.length)
            return;
        
        push({
            path,
            referencePaths,
        });
    },
});
