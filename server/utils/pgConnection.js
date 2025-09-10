import PG from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = PG;

const pgConnectionConfig = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionTimeoutMillis: process.env.DB_TIMEOUT,
});



export const queryDB = (text, params) => pgConnectionConfig.query(text, params);
          process.on('SIGINT', () =>{
    pgConnectionConfig.end(() => {
        console.log('PostgreSQL connection closed due to app termination');
    });
          })
export default pgConnectionConfig;