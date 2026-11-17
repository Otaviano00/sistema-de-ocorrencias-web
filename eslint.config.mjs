// ESLint (flat config): Google TypeScript Style (gts) + angular-eslint. O gts já
// inclui eslint-config-prettier + eslint-plugin-prettier, então Prettier e
// ESLint não conflitam: a formatação vem do .prettierrc.
import angular from 'angular-eslint';
import {defineConfig, globalIgnores} from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import gts from 'gts';

const scriptFiles = ['**/*.{ts,js,mjs,cjs}'];

export default defineConfig([
  globalIgnores([
    'dist/',
    'coverage/',
    '.angular/',
    '.scannerwork/',
    'public/',
  ]),
  // Restringe o gts a TS/JS: os templates HTML ficam com as regras do Angular.
  ...gts.map(config => ({files: config.files ?? scriptFiles, ...config})),
  {
    files: ['**/*.ts'],
    extends: [angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: null,
        // Arquivos de config na raiz não pertencem ao tsconfig.app/spec.
        projectService: {allowDefaultProject: ['*.ts']},
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {type: 'attribute', prefix: 'app', style: 'camelCase'},
      ],
      '@angular-eslint/component-selector': [
        'error',
        {type: 'element', prefix: 'app', style: 'kebab-case'},
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
  },
  // Mantido por último para desligar qualquer regra estilística que conflite.
  prettierConfig,
]);
