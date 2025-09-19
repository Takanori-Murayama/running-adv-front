// Prettier configuration
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  endOfLine: 'auto',
  bracketSpacing: true,
  jsxSingleQuote: false,
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
        '*.js',
        '*.jsx',
        '*.json',
        '*.css',
        '*.scss',
        '*.md',
        '*.html',
        '*.yml',
        '*.yaml',
      ],
      options: {},
    },
  ],
};
