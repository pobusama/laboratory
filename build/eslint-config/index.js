"use strict";

module.exports = {
  "extends": [
    "./rules/errors.js",
    "./rules/best-practices.js",
    "./rules/node.js",
    "./rules/style.js",
    "./rules/es6.js",
    "./rules/variables.js",
    "plugin:react/recommended"
  ],
  failOnError: true,
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "amd": false,
    "mocha": false,
    "jasmine": false
  },
  "ecmaFeatures": {},
  "globals": {
      //window: false
      //Promise: false
  },
  "rules": {
    'react/prop-types': 0,
    'react/no-danger': 0
  },
  "plugins": [
      "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
};