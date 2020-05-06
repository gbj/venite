module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/@stencil/core/testing/jest-preprocessor.js",
    "\\.js$": ['babel-jest']
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@venite/ldf)/)"
  ],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ],
  moduleDirectories: ["node_modules", "src"]
};
