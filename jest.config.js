module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*-test.(ts|js)'],
  testEnvironment: 'node',
};
