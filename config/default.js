module.exports = {
    db: {
        host: process.env.DB_HOST,
        credentials: {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            useNewUrlParser: true,
        }
    },
    app: {
        port: process.env.PORT || 3000,
    },
};
