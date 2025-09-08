module.exports = {
  testEnvironment: "jsdom",
  transform: { "^.+\\.(t|j)sx?$": ["babel-jest", { presets: ["next/babel"] }] },
  moduleNameMapper: { "\\.(css|less|sass|scss)$": "identity-obj-proxy" },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/.next/", "/node_modules/"],
};
