import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    // Run tests in Node environment to match server behavior in CI
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
})
