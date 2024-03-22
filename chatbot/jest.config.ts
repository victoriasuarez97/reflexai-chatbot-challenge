import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './src/',
})

const esModules = ["lodash-es", "nanoid"].join("|");
 
// Add any custom config to be passed to Jest
const config: Config = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  moduleNameMapper: {
    "^lodash-es(/(.*)|$)": "lodash$1",
    "^nanoid(/(.*)|$)": "nanoid$1",
  }
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)