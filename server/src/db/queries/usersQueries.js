import pool from "../index.js";


export async  function getUserByEmail(email){
    const result = await pool.query(`
        SELECT * FROM users  WHERE email = $1
        `,[email])

        return result.rows[0]

}

export async function createUser(name, email, passwordHash){
    const result = await pool.query(`
            INSERT INTO users(name,email,password_hash)
            VALUES($1,$2,$3)
            RETURNING id, name, email, created_at, updated_at
        `,[name,email,passwordHash])

        return result.rows[0]
}




