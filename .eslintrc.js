module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb', 'airbnb-typescript', 'prettier'],
      plugins: ['eslint-plugin-local-rules', 'prettier'],
      parserOptions: {
        project: ['./tsconfig.eslint.json']
      },
      rules: {
        'local-rules/no-trans-without-prettier-ignore': 'error',
        '@typescript-eslint/no-redeclare': 'off',
        'import/prefer-default-export': 'off'
      },
      settings: {
        'import/resolver': {
          node: {
            paths: ['src']
          }
        }
      }
    }
  ]
};
