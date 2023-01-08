require("dotenv").config({ path: ".env" });

const knexOptions = {
    client: process.env.CLIENT,
    connection: {
        host: process.env.HOST,
        user: process.env.USERNAME,
        database: process.env.DATABASE,
    },
    pool: {
        min: 2,
        max: 10,
    },
};

module.exports = knexOptions;
