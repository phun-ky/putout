const scriptsConfig = await matchToFlatDir('scripts');

const monoConfig = await mergeESLintConfigs(['codemods', 'packages', 'rules']);