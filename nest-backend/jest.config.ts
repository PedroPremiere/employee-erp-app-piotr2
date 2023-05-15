import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    testEnvironment: 'node',
    collectCoverageFrom: ['**/*.(t|j)s'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    coverageDirectory: '../coverage',
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1',
        '@tests/(.*)': '<rootDir>/tests/$1'
    },
    runner: 'groups'
};

export default config;
