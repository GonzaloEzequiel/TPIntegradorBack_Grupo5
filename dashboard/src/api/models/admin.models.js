import connection from "../database/db.js";

/**
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
const insertAdmin = async (name, email, password) => {

    let sql = `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`;
    return await connection.query(sql, [name, email, password]);

}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
const logAdmin = async (email, password) => {

    let sql = `SELECT * FROM admins WHERE email = ? AND password = ?`;
    return await connection.query(sql, [email, password]);

}

export default {

    insertAdmin,
    logAdmin

}