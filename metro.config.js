const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
// const monorepoRoot = path.resolve(projectRoot, '../..');

/// repo -> monorepoRoot
///// project1 --> projecRoot
///// project2
const config = getDefaultConfig(projectRoot);
const frontendRoot = path.resolve(projectRoot, "src");
const backendRoot = path.resolve(projectRoot, "backend");

// 1. Watch all files within the monorepo
config.watchFolders = [projectRoot, frontendRoot, backendRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(frontendRoot, "node_modules"),
  path.resolve(backendRoot, "node_modules"),
];

module.exports = config;

// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.sourceExts.push("cjs");
// defaultConfig.resolver.sourceExts = [
//   ...defaultConfig.resolver.sourceExts,
//   "mjs",
//   "cjs",
// ];
// module.exports = defaultConfig;
