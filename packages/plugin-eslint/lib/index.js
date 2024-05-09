'use strict';

const convertRcToFlat = require('./convert-rc-to-flat/index.js');
const declare = require('./declare/index.js');
const removeNoMissing = require('./remove-no-missing/index.js');
const removeOverridesWithEmptyRules = require('./remove-overrides-with-empty-rules/index.js');
const removeNoUnsupportedFeatures = require('./remove-no-unsupported-features/index.js');
const removeNoUnpublishedRequire = require('./remove-no-unpublished-require/index.js');
const convertNodeToN = require('./convert-node-to-n/index.js');
const convertRequireToImport = require('./convert-require-to-import/index.js');
const convertIdeToSafe = require('./convert-ide-to-safe/index.js');
const movePutoutToEndOfExtends = require('./move-putout-to-end-of-extends/index.js');
const applySafeAlign = require('./apply-safe-align/index.js');
const addPutout = require('./add-putout/index.js');
const removeUselessSlice = require('./remove-useless-slice');
const convertFilesToArray = require('./convert-files-to-array');
const applyMatchToFlat = require('./apply-match-to-flat');
const applyDirToFlat = require('./apply-dir-to-flat');

module.exports.rules = {
    'add-putout': addPutout,
    'apply-safe-align': applySafeAlign,
    'convert-ide-to-safe': convertIdeToSafe,
    'convert-require-to-import': convertRequireToImport,
    'convert-node-to-n': convertNodeToN,
    'convert-rc-to-flat': ['off', convertRcToFlat],
    declare,
    'move-putout-to-end-of-extends': movePutoutToEndOfExtends,
    'remove-no-unpublished-require': removeNoUnpublishedRequire,
    'remove-no-unsupported-features': removeNoUnsupportedFeatures,
    'remove-overrides-with-empty-rules': removeOverridesWithEmptyRules,
    'remove-no-missing': removeNoMissing,
    'remove-useless-slice': removeUselessSlice,
    'convert-files-to-array': convertFilesToArray,
    'apply-match-to-flat': applyMatchToFlat,
    'apply-dir-to-flat': applyDirToFlat,
};
