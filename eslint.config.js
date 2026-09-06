const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // Sets the source type to CommonJS
      globals: {
        ...globals.node,     // Adds Node.js globals like process, module, require
        ...globals.browser,  // Adds browser globals if you are bundling for the web
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      
      // Custom rules tailored for CommonJS/Node environments
      "no-unused-vars": "error",
      "prefer-const": "error",
      "no-undef": "error",
      "eqeqeq": "error",
      "no-console": "warn",
    },
  },
];
