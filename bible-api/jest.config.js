module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "\\.js$": ['babel-jest']
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@venite/ldf)/)"
  ],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts?|js?)$",
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
  ],
  moduleDirectories: ["node_modules", "src"]
};
