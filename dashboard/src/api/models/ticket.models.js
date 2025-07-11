import connection from "../database/db.js";

/**
 * Petición a la base de datos para insertar una nuevo ticket
 * @param {*} client nombre del cliente que realizó la compra
 * @param {*} total suma del subtotal de las ventas del ticket
 * @returns 
 */
const insertTicket = async (client, date, total) => {

    let sql = `INSERT INTO tickets (client, date, total) VALUES (?, ?, ?);`
    return await connection.query(sql, [client, date, total]);

}

/**
 * Petición a la base de datos para traer todos los tickets
 * @returns respuesta de la bbdd a la petición
 */
const selectAllTickets = async () => {

    let sql = `SELECT * FROM tickets`;
    return await connection.query(sql);

}

/**
 * Petición a la base de datos para traer un ticket por su id
 * @returns respuesta de la bbdd a la petición
 */
const selectTicketById = async (id) => {

    let sql = `SELECT * FROM tickets WHERE id = ?`
    return await connection.query(sql, [id]);

}

/**
 * Petición a la base de datos para traer todas las ventas de un ticket
 * @returns respuesta de la bbdd a la petición
 */
const selectAllSalesFromATicket = async (id) => {

    let sql = `SELECT * FROM sales WHERE id_ticket = ?`;
    return await connection.query(sql, [id]);

}

/**
 * Petición a la base de datos para insertar una nueva venta
 * @param {*} id_ticket id del ticket al que pertenece la venta
 * @param {*} id_product id del producto vendido
 * @param {*} quantity cantidad del producto
 * @param {*} subtotal precio unitario * cantidad del producto
 * @returns 
 */
const insertSale = async (id_ticket, id_product, quantity, subtotal) => {

    let sql = `INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (?, ?, ?, ?);`
    return await connection.query(sql, [id_ticket, id_product, quantity, subtotal]);

}

export default {

    insertTicket,
    selectAllTickets,
    selectTicketById,
    selectAllSalesFromATicket,
    insertSale

}