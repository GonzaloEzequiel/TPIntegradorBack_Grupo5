import connection from "../database/db.js";


/**
 * 
 * @returns 
 */
const selectActiveProducts = async () => {

    let sql = `SELECT * FROM products WHERE active = 1`;
    return await connection.query(sql);

}

/**
 * 
 * @returns 
 */
const selectAllProducts = async () => {

    let sql = `SELECT * FROM products`;
    return await connection.query(sql);

}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const selectProductById = async (id) => {

    let sql = `SELECT * FROM products WHERE id = ?`;
    return await connection.query(sql, [id]);

}

/**
 * 
 * @param {*} product_type 
 * @param {*} image 
 * @param {*} desc_number 
 * @param {*} desc_text 
 * @param {*} quality 
 * @param {*} price 
 * @returns 
 */
const insertProduct = async (product_type, image, desc_number, desc_text, quality, price) => {

    let sql = `INSERT INTO products (product_type, active, image, desc_number, desc_text, quality, price) VALUES (?, 1, ?, ?, ?, ?, ?);`
    return await connection.query(sql, [product_type, image, desc_number, desc_text, quality, price]);

}

/**
 * 
 * @param {*} id 
 * @param {*} product_type 
 * @param {*} image 
 * @param {*} desc_number 
 * @param {*} desc_text 
 * @param {*} quality 
 * @param {*} price 
 * @returns 
 */
const updateProduct = async (id, product_type, image, desc_number, desc_text, quality, price) => {

    let sql = `UPDATE products SET product_type = ?, active = 1, image = ?, desc_number = ?, desc_text = ?, quality = ?, price = ? WHERE id = ?;`
    return await connection.query(sql, [product_type, image, desc_number, desc_text, quality, price, id]);

}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const deleteProduct = async (id) => {

    //let sql = `DELETE from products WHERE id = ?;`
    let sql = `UPDATE products SET active = 0 WHERE id = ?`;    // BAJA LÓGICA
    return await connection.query(sql, [id]);

}



export default {

    selectAllProducts,
    selectActiveProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct

}