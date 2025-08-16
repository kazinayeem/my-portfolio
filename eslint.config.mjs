import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override specific rules
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // ignore unused vars
      "@typescript-eslint/no-explicit-any": "off", // allow 'any' type
      "react-hooks/exhaustive-deps": "off",       // ignore missing deps
      "@next/next/no-img-element": "off",         // allow <img> instead of next/image
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;
