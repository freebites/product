const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Find the project and workspace directories
const currentDir = __dirname;


// This can be replaced with `find-yarn-workspace-root`
// const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(currentDir, "../");
const frontendRoot = path.resolve(currentDir);
const backendRoot = path.resolve(currentDir, "../backend");
const projectRoot = path.resolve(currentDir, "../");
// 1. Watch all files within the monorepo
config.watchFolders = [projectRoot, frontendRoot, backendRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(frontendRoot, "node_modules"),
  path.resolve(backendRoot, "node_modules"),
];

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@components": path.resolve(frontendRoot, "components"),
  "@context:": path.resolve(frontendRoot, "context"),
  "@api": path.resolve(frontendRoot, "api"),
};

module.exports = config;
