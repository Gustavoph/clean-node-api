import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['src'],
  preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ]
}

export default config
