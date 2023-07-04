import  pg from 'pg';
import config from "../../config.js";

const connection = new pg.Pool({
    connectionString: config.db_url
});

export const getConnection = () => {
    return connection;
};

