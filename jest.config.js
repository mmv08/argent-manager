const { paths } = require("./tsconfig")

function makeModuleNameMapper(sourcePath, tsconfigPaths) {
  const aliases = {}

  // Iterate over paths and convert them into moduleNameMapper format
  for (const item of Object.keys(paths)) {
    const key = item.replace("/*", "/(.*)")
    const path = paths[item][0].replace("/*", "/$1")
    aliases[key] = sourcePath + "/" + path
  }

  return aliases
}

const SRC_PATH = "<rootDir>/src"

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, paths),
  testEnvironment: "jsdom",
}
