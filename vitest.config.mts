import {defineConfig} from 'vitest/config';

// Complementa o builder `@angular/build:unit-test` (angular.json), que cuida do
// resto da config. Sem isto o relatório iria para coverage/<projeto>/ em vez de
// coverage/lcov.info.
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
    },
  },
});
