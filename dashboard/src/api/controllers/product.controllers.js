import Products from "../models/product.models.js";


/**
 * 
 * @param {*} request 
 * @param {*} response 
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
 * 
 * @param {*} request 
 * @param {*} response 
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
 * 
 * @param {*} request 
 * @param {*} response 
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
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns 
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
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns 
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
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export const removeProduct = async (request, response) => {

    try {

        let { id } = request.params;

        console.log("Id:", id);

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