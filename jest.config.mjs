export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
   globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
};