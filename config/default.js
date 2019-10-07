module.exports = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        credentials: {
            dbName: process.env.DB_NAME,
            pass: process.env.DB_PASSWORD,
            user: process.env.DB_USER,
            useNewUrlParser: true,
        }
    },
    app: {
        port: process.env.PORT || 3000,
    },
};
