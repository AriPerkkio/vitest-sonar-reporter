import { readFileSync } from "node:fs";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const tsconfig = JSON.parse(readFileSync("./tsconfig.json", "utf8"));
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: tsconfig.include,
  })),
  {
    files: tsconfig.include,
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: { unicorn: eslintPluginUnicorn },
    rules: { "unicorn/prefer-node-protocol": "error" },
  },
  ...compat.plugins("eslint-plugin-import"),
  {
    // Require specifying extensions due to https://github.com/microsoft/TypeScript/issues/16577
    files: ["src/**"],
    rules: { "import/extensions": ["error", "always"] },
  },
  {
    files: ["test/**"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
  { ignores: ["dist", ".eslintrc.cjs"] },
  eslintPluginPrettierRecommended,
]);

/** @param config {import('eslint').Linter.FlatConfig} */
function defineConfig(config) {
  return config;
}
