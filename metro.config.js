const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, "mjs", "cjs"];
module.exports = defaultConfig;
