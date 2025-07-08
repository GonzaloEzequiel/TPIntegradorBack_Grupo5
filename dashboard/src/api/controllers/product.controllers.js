import Products from "../models/product.models.js";


/**
 * Se encarga de invocar al modelo para consultar los productos activos y manejar la respuesta de la bbdd
 * @param {*} request solicitud de la ruta (sin datos como parámetro)
 * @param {*} response respuesta a la ruta con la resolución de la operación
 */
export const getActiveProducts = async (request, response) => {

    try {

        let [rows] = await Products.selectActiveProducts();

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
    
}

/**
 * Se encarga de invocar al modelo para consultar todos los productos y manejar la respuesta de la bbdd
 * @param {*} request solicitud de la ruta (sin datos como parámetro)
 * @param {*} response respuesta a la ruta con la resolución de la operación
 */
export const getAllProducts = async (request, response) => {

    try {

        let [rows] = await Products.selectAllProducts();

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
    
}

/**
 * Se encarga de invocar al modelo para consultar un producto en específico
 * @param {*} request solicitud de la ruta con el identificador del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación
 */
export const getProductById = async (request, response) => {

    try {

        let { id } = request.params;

        let [rows] = await Products.selectProductById(id);

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
    
}

/**
 * Se encarga de invocar al modelo para crear un producto nuevo
 * @param {*} request solicitud de la ruta con los datos del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación
 * @returns respuesta de la operación a la petición
 */
export const newProduct = async (request, response) => {

    try {

        let { ["product-type"]:product_type, image, ["number-desc"]:desc_number, ["text-desc"]:desc_text, quality, price } = request.body;

        if(!product_type || !image || !desc_number || !desc_text || !quality || !price) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }
 
        let [rows] = await Products.insertProduct(product_type, image, desc_number, desc_text, quality, price);

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

}

/**
 * Se encarga de invocar al modelo para modificar un producto en específico
 * @param {*} request solicitud de la ruta con los datos del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación
 * @returns respuesta de la operación a la petición
 */
export const editProduct = async (request, response) => {
    
    try {

        let { ["product-type"]:product_type, image, ["number-desc"]:desc_number, ["text-desc"]:desc_text, quality, price } = request.body;
        let { id } = request.params;

        if(!id || !product_type || !image || !desc_number || !desc_text || !quality || !price) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }

        let [result] = await Products.updateProduct(id, product_type, image, desc_number, desc_text, quality, price);

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

}

/**
 * Se encarga de invocar al modelo para "activar" un producto en específico
 * @param {*} request solicitud de la ruta con el identificador del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación
 */
export const reactivateProduct = async (request, response) => {

    try {

        let { id } = request.params;

        if(!id) {
            return response.status(400).json({
                message: "Se requiere un id para eliminar un producto."
            })
        }

        let [result] = await Products.activateProduct(id);

        console.log("Res:", result);

        if(result.affectedRows === 0) {
            return response.status(404).json({
                message: `No se encontró un producto con id ${id}.`
            })
        }

        return response.status(200).json({
            message: `Producto con id ${id} activado correctamente.`
        })

    } catch (error) {

        console.error("Error en PATCH /products/:id");

        console.log(error);

        response.status(500).json({
            message: `Error al intentar activar el producto con id: ${id}.`,
            error: error.message
        })

    }

}

/**
 * Se encarga de invocar al modelo para dar de baja a un producto en específico
 * @param {*} request solicitud de la ruta con el identificador del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación
 * @returns respuesta de la operación a la petición
 */
export const removeProduct = async (request, response) => {

    try {

        let { id } = request.params;

        if(!id) {
            return response.status(400).json({
                message: "Se requiere un id para eliminar un producto."
            })
        }

        let [result] = await Products.deleteProduct(id);

        console.log("Res:", result);

        if(result.affectedRows === 0) {
            return response.status(404).json({
                message: `No se encontró un producto con id ${id}.`
            })
        }

        return response.status(200).json({
            message: `Producto con id ${id} eliminado correctamente.`
        })

    } catch (error) {
        console.error("Error en DELETE /products/:id");

        console.log(error);

        response.status(500).json({
            message: `Error al eliminar producto con id: ${id}.`,
            error: error.message
        })
    }

}