module.exports = {
    launch: {
        headless: process.env.CI === 'true',
    },
    server: {
        command: 'npm run:dev',
        port: 4444,
    },
}