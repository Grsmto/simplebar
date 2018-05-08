module.exports = {
    launch: {
        headless: process.env.CI === 'true',
    },
    server: {
        command: 'webpack-dev-server --inline --port 8091',
        port: 8091
    }
}