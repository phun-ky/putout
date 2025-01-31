'use strict';

const {types, operator} = require('putout');
const {
    isArrowFunctionExpression,
    isLiteral,
    IfStatement,
    ImportDefaultSpecifier,
    ImportDeclaration,
    ExportNamedDeclaration,
    VariableDeclarator,
    VariableDeclaration,
    isAssignmentExpression,
    isExportNamedDeclaration,
    isIdentifier,
} = types;

const {
    remove,
    replaceWith,
    isDeclarationKeyword,
    isConditionKeyword,
    isModuleDeclarationKeyword,
} = operator;

const isInit = (a) => isIdentifier(a) || isLiteral(a) || isArrowFunctionExpression(a);

const buildDeclaration = (type) => (nextPath, path) => {
    const {expression} = nextPath.node;
    let left;
    let right;
    
    if (isAssignmentExpression(expression)) {
        ({
            left,
            right,
        } = expression);
    } else {
        left = path.node.id;
        right = nextPath.node.expression;
    }
    
    replaceWith(nextPath, VariableDeclaration(type, [VariableDeclarator(left, right)]));
    
    const {name} = path.node.id;
    
    if (isDeclarationKeyword(name))
        return;
    
    if (isExportNamedDeclaration(path.parentPath.parentPath))
        replaceWith(nextPath, ExportNamedDeclaration(nextPath.node));
};

const builders = {
    const: buildDeclaration('const'),
    var: buildDeclaration('var'),
    let: buildDeclaration('let'),
    import: buildImport,
    export: buildExport,
    if: buildIf,
};

module.exports.report = ({name}) => `Extract '${name}' from variable`;

module.exports.fix = ({name, path, nextPath}) => {
    builders[name](nextPath, path);
    remove(path);
};

module.exports.traverse = ({push}) => ({
    VariableDeclarator(path) {
        const {name} = path.node.id;
        
        if (isDeclarationKeyword(name) || isConditionKeyword(name) || isModuleDeclarationKeyword(name)) {
            const topPath = getTopPath(path);
            const nextPath = topPath.getNextSibling();
            
            if (nextPath.isVariableDeclaration())
                push({
                    name,
                    path,
                    nextPath,
                });
            
            if (nextPath.isExpressionStatement())
                push({
                    name,
                    path,
                    nextPath,
                });
            
            return;
        }
        
        const {kind} = path.parentPath.node;
        
        if (!path.node.init) {
            const topPath = getTopPath(path);
            const nextPath = topPath.getNextSibling();
            
            if (!nextPath.isExpressionStatement())
                return;
            
            const {expression} = nextPath.node;
            
            if (isInit(expression))
                push({
                    name: kind,
                    path,
                    nextPath,
                });
        }
    },
});

function getTopPath(path) {
    if (path.parentPath.parentPath.isExportDeclaration())
        return path.parentPath.parentPath;
    
    return path.parentPath;
}

function buildExport(path) {
    replaceWith(path, ExportNamedDeclaration(path.node));
}

function buildImport(path) {
    const fromPath = path.getNextSibling();
    const sourcePath = fromPath.getNextSibling();
    const source = sourcePath.node.expression;
    const local = path.node.expression;
    
    replaceWith(path, ImportDeclaration([ImportDefaultSpecifier(local, local)], source));
    remove(sourcePath);
    remove(fromPath);
}

function buildIf(path) {
    const {expression} = path.node;
    delete expression.extra.parenthesized;
    const nextPath = path.getNextSibling();
    const next = nextPath.node;
    
    remove(nextPath);
    replaceWith(path, IfStatement(expression, next));
}
