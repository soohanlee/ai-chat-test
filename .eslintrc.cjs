module.exports = {
  // 기존 설정 유지
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    // 기존 규칙 유지
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": "warn", // 'error' 대신 'warn' 사용
    "@typescript-eslint/no-explicit-any": "off", // 'no-explicit-any' 규칙 끄기
    "react/prop-types": "off", // React prop-types 검사 끄기 (TypeScript 사용 시 유용)
  },
}
