import  pg from 'pg';
import config from "../../config.js";

const connection = new pg.Pool({
    connectionString: config.db_url,
    ssl: true
});

export const getConnection = () => {
    return connection;
};

