import nextJest from "next/jest"; 
const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  globals: {
    fetch: global.fetch,
    Request: global.Request,
    Response: global.Response,
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    '/node_modules/(?!openid-client|jose)' // 👈 låt dessa transformeras
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  
};

export default createJestConfig(config);
