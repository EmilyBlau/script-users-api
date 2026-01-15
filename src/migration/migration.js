import { client } from "../database/db.js";

export async function executeSchema(){
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        user_id_from_request VARCHAR(150),
        name VARCHAR(150),
        gender VARCHAR(50),
        email VARCHAR(150) UNIQUE NOT NULL,
        username VARCHAR(150),
        password VARCHAR(150),
        birth_date DATE,
        age INTEGER,
        address TEXT,
        cellphone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT NULL)
    `);
}