module.export = {
  roots: ["<rootDir>/src"],
  transform: {
    "\\.(js|jsx)?$": "babel-jest",
  },
  testMatch: ["<rootDir>/src/**/>(*.)test.{js, jsx}"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/public/",
    "/src/helpers/roleHelper.js",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "@testing-library/react/cleanup-after-each"
  ],
  collectCoverage: true,
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/{renderer}/**/*.{js,jsx}",
    "!<rootDir>/src/helpers",
  ],
  coverageReporters: ["lcov"],
};

