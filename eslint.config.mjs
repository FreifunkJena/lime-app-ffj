import preact from "eslint-config-preact";
import prettier from "eslint-config-prettier";
import jest from "eslint-plugin-jest";
import prettierPlugin from "eslint-plugin-prettier";
import testingLibrary from "eslint-plugin-testing-library";
import tseslint from "typescript-eslint";

export default [
    {
        ignores: [
            "**/node_modules/**",
            "**/coverage/**",
            "**/build/**",
            "**/i18n/**",
            "package-lock.json",
            "babel.config.js",
            "jest.config.js",
            "postcss.config.js",
            "devTools/**",
        ],
    },
    ...preact,
    ...tseslint.configs.recommended,
    testingLibrary.configs["flat/react"],
    jest.configs["flat/recommended"],
    prettier,
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
    },
];
