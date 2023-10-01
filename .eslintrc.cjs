module.exports = {
  env: { browser: true, es2022: true },
  ignorePatterns: ['/*', '!/src', '!/backend'],
  plugins: [
    "@typescript-eslint",
    // "react", 
  ],
  overrides: [],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true },
    ],
    // "linebreak-style": ["warn", "unix"], // enforced by git
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],
    "max-nested-callbacks": ["warn", 2],
    "comma-dangle": ["warn", "always-multiline"],
    "no-warning-comments": ["warn"],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_"
    }],
  },
};