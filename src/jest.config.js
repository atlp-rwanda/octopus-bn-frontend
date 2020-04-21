module.export = {
  roots: ["<rootDir>/src"],
  transform: {
    "\\.(js|jsx)?$": "babel-jest",
  },
  testMatch: ["<rootDir>/src/**/>(*.)test.{js, jsx}"], // finds test
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "@testing-library/react/cleanup-after-each",
  ],
  collectCoverage: true,
  'testEnvironment': 'node',
  collectCoverageFrom: ["src/{renderer}/**/*.{js,jsx}"],
  coverageReporters: ["lcov"],
};
