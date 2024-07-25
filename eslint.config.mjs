import { ESLint } from 'eslint';
import { parser } from '@typescript-eslint/parser';
import { plugin } from '@typescript-eslint/eslint-plugin';

export default {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {}
};
