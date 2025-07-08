import connection from "../database/db.js";


/**
 * Petición a la base de datos para traer todos los productos activos
 * @returns respuesta de la bbdd a la petición
 */
const selectActiveProducts = async () => {

    let sql = `SELECT * FROM products WHERE active = 1`;
    return await connection.query(sql);

}

/**
 * Petición a la base de datos para traer todos los productos (activos e inactivos)
 * @returns respuesta de la bbdd a la petición
 */
const selectAllProducts = async () => {

    let sql = `SELECT * FROM products`;
    return await connection.query(sql);

}

/**
 * Petición a la base de datos para traer filtrar un producto por su identificador numérico
 * @param {*} id identificador numérico unívoco del producto filtrado
 * @returns respuesta de la bbdd a la petición
 */
const selectProductById = async (id) => {

    let sql = `SELECT * FROM products WHERE id = ?`;
    return await connection.query(sql, [id]);

}

/**
 * Petición a la base de datos para insertar un nuevo producto
 * @param {*} product_type tipo del producto
 * @param {*} image imagen del producto
 * @param {*} desc_number descripción numérica del producto según tipo (estampa/número calzado)
 * @param {*} desc_text descripción de texto del producto según tipo (estampa/modelo calzado)
 * @param {*} quality descripción de la calidad del producto según tipo
 * @param {*} price precio del producto
 * @returns respuesta de la bbdd a la petición
 */
const insertProduct = async (product_type, image, desc_number, desc_text, quality, price) => {

    let sql = `INSERT INTO products (product_type, active, image, desc_number, desc_text, quality, price) VALUES (?, 1, ?, ?, ?, ?, ?);`;
    return await connection.query(sql, [product_type, image, desc_number, desc_text, quality, price]);

}

/**
 * Petición a la base de datos para modificar un producto existente (previamente filtrado)
 * @param {*} id identificador numérico unívoco del producto filtrado
 * @param {*} product_type tipo del producto
 * @param {*} image imagen del product
 * @param {*} desc_number descripción numérica del producto según tipo (estampa/número calzado)
 * @param {*} desc_text descripción de texto del producto según tipo (estampa/modelo calzado)
 * @param {*} quality descripción de la calidad del producto según tipo
 * @param {*} price precio del producto
 * @returns respuesta de la bbdd a la petición
 */
const updateProduct = async (id, product_type, image, desc_number, desc_text, quality, price) => {

    let sql = `UPDATE products SET product_type = ?, active = 1, image = ?, desc_number = ?, desc_text = ?, quality = ?, price = ? WHERE id = ?;`;
    return await connection.query(sql, [product_type, image, desc_number, desc_text, quality, price, id]);

}

/**
 * Petición a la base de datos para dar 'alta lógica' a un producto existente (previamente filtrado)
 * @param {*} id identificador numérico unívoco del producto filtrado
 * @returns respuesta de la bbdd a la petición
 */
const activateProduct = async (id) => {

    let sql = `UPDATE products SET active = 1 WHERE id = ?;`;
    return await connection.query(sql, [id]);

}

/**
 * Petición a la base de datos para dar baja lógica a un producto existente (previamente filtrado)
 * @param {*} id identificador numérico unívoco del producto filtrado
 * @returns respuesta de la bbdd a la petición
 */
const deleteProduct = async (id) => {

    //let sql = `DELETE from products WHERE id = ?;`
    let sql = `UPDATE products SET active = 0 WHERE id = ?;`;    // BAJA LÓGICA
    return await connection.query(sql, [id]);

}



export default {

    selectAllProducts,
    selectActiveProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    activateProduct,
    deleteProduct

}