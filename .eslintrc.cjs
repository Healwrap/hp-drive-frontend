module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    'prettier/prettier': 'error',
    'no-console': ['off'],
    // 'no-unused-vars': ['off'],
    // '@typescript-eslint/no-unused-vars': ['off'],
    'no-plusplus': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // 避免 `eslint` 对于 `typescript` 函数重载的误报
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
  },
}
