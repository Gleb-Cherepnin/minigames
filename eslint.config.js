import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },

  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  unicorn.configs.recommended,

  {
    linterOptions: {
      noInlineConfig: true,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-undef': 'off',
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],
      'unicorn/single-line-block-comment-style': 'off',
      'unicorn/consistent-class-member-order': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },

  {
    files: ['*.config.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  prettier,
);
