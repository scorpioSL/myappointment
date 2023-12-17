module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': ["./tsconfig.eslint.json"],
    'sourceType': 'module',
    'ecmaVersion': 2018,
  },
  'plugins': [
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
  ],
  'rules': {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'prefix': ['I'],
        'format': ['StrictPascalCase'],
      },
    ],
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        'accessibility': 'explicit',
        'overrides': {
          'constructors': 'off',
        },
      },
    ],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'semi',
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': false,
        },
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/quotes': [
      'error',
      'single',
    ],
    '@typescript-eslint/semi': [
      'error',
      'always',
    ],

    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-body-style': 'off',
    'camelcase': 'off',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'constructor-super': 'error',
    'dot-notation': 'off',
    'eol-last': 'error',
    'eqeqeq': [
      'error',
      'smart',
    ],
    'guard-for-in': 'error',
    'id-blacklist': 'off',
    'id-match': 'off',
    'max-len': [
      'error',
      {
        'code': 250,
      },
    ],
    'no-caller': 'error',
    'no-console': [
      'error',
      {
        'allow': [
          'log',
          'warn',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'info',
          'dirxml',
          'error',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context',
        ],
      },
    ],
    'no-debugger': 'error',
    'no-empty': 'off',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-new-wrappers': 'error',
    'no-restricted-imports': 'error',
    'no-shadow': [
      'error',
      {
        'hoist': 'all',
      },
    ],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'radix': 'error',
    'spaced-comment': 'error',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.eslint.json',
      },
      plugins: ['@typescript-eslint', '@angular-eslint'],

      rules: {
        // ORIGINAL tslint.json -> "array-type": false,
        '@typescript-eslint/array-type': 'off',

        // ORIGINAL tslint.json -> "arrow-parens": false,
        'arrow-parens': 'off',

        // ORIGINAL tslint.json -> "component-class-suffix": true,
        '@angular-eslint/component-class-suffix': 'error',

        // ORIGINAL tslint.json -> "contextual-lifecycle": true,
        '@angular-eslint/contextual-lifecycle': 'error',

        // ORIGINAL tslint.json -> "directive-selector": [true, "attribute", "app", "camelCase"],
        '@angular-eslint/directive-selector': [
          'error',
          {type: 'attribute', prefix: ['nest', 'ngx'], style: 'camelCase'},
        ],

        // ORIGINAL tslint.json -> "component-selector": [true, "element", "app", "kebab-case"],
        '@angular-eslint/component-selector': [
          'error',
          {type: 'element', prefix: ['nest', 'ngx'], style: 'kebab-case'},
        ],

        // ORIGINAL tslint.json -> "import-blacklist": [true, "rxjs/Rx"],
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'rxjs/Rx',
                message: 'Please import directly from \'rxjs\' instead',
              },
            ],
          },
        ],

        // ORIGINAL tslint.json -> "max-classes-per-file": false,
        'max-classes-per-file': 'off',

        // ORIGINAL tslint.json -> "max-line-length": [true, 250],
        'max-len': ['error', {code: 250}],

        // ORIGINAL tslint.json -> "member-ordering": [true, { "order": ["static-field", "instance-field", "static-method", "instance-method"] } ],
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: [
              'static-field',
              'instance-field',
              'static-method',
              'instance-method',
            ],
          },
        ],

        // ORIGINAL tslint.json -> "no-consecutive-blank-lines": false,
        'no-multiple-empty-lines': 'off',

        // ORIGINAL tslint.json -> "no-console": [true, "debug", "info", "time", "timeEnd", "trace"],
        'no-restricted-syntax': [
          'error',
          {
            selector:
              'CallExpression[callee.object.name="console"][callee.property.name=/^(debug|info|time|timeEnd|trace)$/]',
            message: 'Unexpected property on console object was called',
          },
        ],

        // ORIGINAL tslint.json -> "no-empty": false,
        'no-empty': 'off',

        // ORIGINAL tslint.json -> "no-inferrable-types": [true, "ignore-params"],
        '@typescript-eslint/no-inferrable-types': 'off',

        // ORIGINAL tslint.json -> "no-non-null-assertion": true,
        '@typescript-eslint/no-non-null-assertion': 'error',

        // ORIGINAL tslint.json -> "no-switch-case-fall-through": true,
        'no-fallthrough': 'error',

        // ORIGINAL tslint.json -> "no-var-requires": false,
        '@typescript-eslint/no-var-requires': 'off',

        // ORIGINAL tslint.json -> "object-literal-key-quotes": [true, "as-needed"],
        'quote-props': ['error', 'as-needed'],

        // ORIGINAL tslint.json -> "object-literal-sort-keys": false,
        'sort-keys': 'off',

        // ORIGINAL tslint.json -> "ordered-imports": false,
        /**
         * Needs import plugin
         */

        // ORIGINAL tslint.json -> "quotemark": [true, "single"],
        quotes: ['error', 'single'],

        // ORIGINAL tslint.json -> "trailing-comma": false,
        'comma-dangle': 'off',

        // ORIGINAL tslint.json -> "no-conflicting-lifecycle": true,
        '@angular-eslint/no-conflicting-lifecycle': 'error',

        // ORIGINAL tslint.json -> "no-host-metadata-property": true,
        '@angular-eslint/no-host-metadata-property': 'error',

        // ORIGINAL tslint.json -> "no-input-rename": true,
        '@angular-eslint/no-input-rename': 'error',

        // ORIGINAL tslint.json -> "no-inputs-metadata-property": true,
        '@angular-eslint/no-inputs-metadata-property': 'error',

        // ORIGINAL tslint.json -> "no-output-native": true,
        '@angular-eslint/no-output-native': 'error',

        // ORIGINAL tslint.json -> "no-output-on-prefix": true,
        '@angular-eslint/no-output-on-prefix': 'off',

        // ORIGINAL tslint.json -> "no-output-rename": true,
        '@angular-eslint/no-output-rename': 'error',

        // ORIGINAL tslint.json -> "no-outputs-metadata-property": true,
        '@angular-eslint/no-outputs-metadata-property': 'error',

        // ORIGINAL tslint.json -> "template-banana-in-box": true,
        // APPLIED VIA TEMPLATE-RELATED CONFIG BELOW

        // ORIGINAL tslint.json -> "template-no-negated-async": true,
        // APPLIED VIA TEMPLATE-RELATED CONFIG BELOW

        // ORIGINAL tslint.json -> "use-lifecycle-interface": true,
        '@angular-eslint/use-lifecycle-interface': 'warn',

        // ORIGINAL tslint.json -> "use-pipe-transform-interface": true
        '@angular-eslint/use-pipe-transform-interface': 'error',
      },
    },
    {
      files: ['*.component.html'],
      parser: '@angular-eslint/template-parser',
      plugins: ['@angular-eslint/template'],
      rules: {
        // ORIGINAL tslint.json -> "template-banana-in-box": true,
        '@angular-eslint/template/banana-in-a-box': 'error',

        // ORIGINAL tslint.json -> "template-no-negated-async": true,
        '@angular-eslint/template/no-negated-async': 'error',
      },
    },
  ],
};
