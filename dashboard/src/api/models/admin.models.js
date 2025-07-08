import connection from "../database/db.js";

/**
 * Petición a la base de datos para la inserción de un nuevo registro en la tabla 'admins'
 * @param {*} name nombre del admin
 * @param {*} email correo del admin
 * @param {*} password contraseña del admin
 * @returns respuesta de la bbdd a la petición
 */
const insertAdmin = async (name, email, password) => {

    let sql = `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`;
    return await connection.query(sql, [name, email, password]);

}

/**
 * Petición a la base de datos para matchear un registro válido donde coincidan las credenciales
 * @param {*} email correo a verificar
 * @param {*} password contraseña a verificar
 * @returns respuesta de la bbddd a la petición
 */
const logAdmin = async (email, password) => {

    let sql = `SELECT * FROM admins WHERE email = ? AND password = ?`;
    return await connection.query(sql, [email, password]);

}

export default {

    insertAdmin,
    logAdmin

}