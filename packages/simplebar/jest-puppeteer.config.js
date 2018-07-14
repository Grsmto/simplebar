module.exports = {
    launch: {
        headless: process.env.CI === 'true',
    },
    server: {
        command: 'webpack-dev-server --port 8091 --mode=development',
        port: 8091
    }
}