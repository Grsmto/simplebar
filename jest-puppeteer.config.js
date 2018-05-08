module.exports = {
    launch: {
        headless: process.env.CI === 'true',
    },
    server: {
        command: 'npm start',
        port: 8090
    }
}