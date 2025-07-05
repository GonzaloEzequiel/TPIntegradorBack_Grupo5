import { Router } from "express";
import connection from "../database/db.js";
import { validateId } from "../middlewares/middlewares.js";

const router = Router();

/**
 * GET todos los productos ACTIVOS
 */
router.get("/", async (request, response) => {

    try {

        let sql = `SELECT * FROM products WHERE active = 1`;

        let [rows] = await connection.query(sql);
        response.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch (error) {

        console.log("Error obteniendo productos ", error);

        response.status(500).json({
            error: "Error interno del servidor al obtener productos"
        });
        
    }
    
});



/**
 * GET un producto por ID
 */
router.get("/:id", validateId, async (request, response) => {

    try {

        let { id } = request.params;
 
        let sql = `SELECT * FROM products WHERE id = ? AND active = 1`;

        let [rows] = await connection.query(sql, [id]);

        response.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch (error) {

        console.log("Error obteniendo productos ", error);

        response.status(500).json({
            error: "Error interno del servidor al obtener productos"
        });
        
    }
    
});



/**
 * POST nuevo producto
 */
router.post("/", async (request, response) => {

    try {

        let { ["product-type"]:product_type, image, ["number-desc"]:desc_number, ["text-desc"]:desc_text, quality, price } = request.body;

        if(!product_type || !image || !desc_number || !desc_text || !quality || !price) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }
 
        let sql = `INSERT INTO products (product_type, active, image, desc_number, desc_text, quality, price) VALUES (?, 1, ?, ?, ?, ?, ?);`

        let [rows] = await connection.query(sql, [product_type, image, desc_number, desc_text, quality, price]);

        response.status(201).json({
            message: "Producto creado correctamente.",
            productId: rows.insertId
        });

    } catch(error) {

        response.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });
    }

});



/**
 * PUT modificar un producto
 */
router.put("/:id", async (request, response) => {
    
    try {

        let { ["product-type"]:product_type, image, ["number-desc"]:desc_number, ["text-desc"]:desc_text, quality, price } = request.body;
        let { id } = request.params;

        if(!id || !product_type || !image || !desc_number || !desc_text || !quality || !price) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }

        let sql = `UPDATE products SET product_type = ?, active = 1, image = ?, desc_number = ?, desc_text = ?, quality = ?, price = ? WHERE id = ?;`

        let [result] = await connection.query(sql, [product_type, image, desc_number, desc_text, quality, price, id]);

        response.status(200).json({
            message: "Producto modificado correctamente.",
        });

    } catch (error) {

        console.log("Error al actualizar producto", error);
        response.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });
    }

});



/**
 * DELETE eliminar producto
 */
router.delete("/:id", async (request, response) => {

    try {

        let { id } = request.params;

        if(!id) {
            return response.status(400).json({
                message: "Se requiere un id para eliminar un producto."
            })
        }

        let sql = `DELETE from products WHERE id = ?;`

        let [result] = await connection.query(sql, [id]);

        if(result.affectedRows === 0) {
            return response.status(404).json({
                message: `No se encontró un producto con id ${id}.`
            })
        }

        return response(200).json({
            message: `Producto con id ${id} eliminado correctamente.`
        })

    } catch (error) {
        console.error("Error en DELETE /products/:id");

        response.status(500).json({
            message: `Error al eliminar producto con id: ${id}.`,
            error: error.message
        })
    }

})

export default router;