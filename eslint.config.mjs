import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next/**", "client/**", "server/**", "shared/**", "script/**", "attached_assets/**", "next-env.d.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.ts"],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { React: "readonly", JSX: "readonly", window: "readonly", document: "readonly", URL: "readonly", Response: "readonly" },
    },
    rules: { "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }] },
  },
);
