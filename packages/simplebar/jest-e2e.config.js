module.exports = {
    preset: 'jest-puppeteer',
    testRegex: '^.+\\.test\\.e2e\\.js$',
    'transform': {
        "^.+\\.js?$": "babel-jest"
    },
    'transformIgnorePatterns': [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
    ],
    'moduleFileExtensions': [
        "js"
    ]
};