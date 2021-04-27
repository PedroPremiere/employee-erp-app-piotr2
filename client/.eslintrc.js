module.exports = {
    extends: ['eslint:recommended', 'plugin:vue/recommended'],
    rules: {
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
        ],
        'vue/html-indent': ['error', 4, { baseIndent: 1 }],
        'vue/max-attributes-per-line': ['off'],
        'vue/html-self-closing': ['off']
    },
    parserOptions: {
        sourceType: 'script'
    },
    overrides: [
        {
            files: ['src/**/*'],
            parserOptions: {
                parser: 'babel-eslint',
                sourceType: 'module'
            },
            env: {
                browser: true
            }
        }
    ],
    globals: {
        $: true,
        require: true,
        process: true,
        module: true
    }
};
