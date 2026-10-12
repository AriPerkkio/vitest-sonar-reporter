import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "import"],
  options: {
    typeAware: true,
  },
  rules: {
    "typescript/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "unicorn/prefer-node-protocol": "error",
  },
  overrides: [
    {
      // Require specifying extensions due to https://github.com/microsoft/TypeScript/issues/16577
      files: ["src/**"],
      rules: { "import/extensions": ["error", "always"] },
    },
  ],
  ignorePatterns: ["dist", "examples/**/node_modules"],
});
