import  pg from 'pg';
const {Client} = pg
import config from "../../config.js";

const connection = new pg.Pool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: config.port
});

export const getConnection = () => {
    return connection;
};

