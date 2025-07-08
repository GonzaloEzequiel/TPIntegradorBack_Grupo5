import Products from "../models/product.models.js";


/**
 * Get view for list products
 * @param {*} request 
 * @param {*} response 
 */
export const getProductsView = async (request, response) => {

    try{

        const result = await Products.selectAllProducts();
        response.render("products", {

            title: "Fulbo$hop | Productos",
            about: "Nuestros Productos",
            script: "products.js",
            products: result[0]

        });

    } catch (error) {

        console.error("Error obteniendo la información", error.message);
        response.status(500).json({
            error: "Error interno al obtener la información"
        });
        
    }
    
}

/**
 * Get view for new product
 * @param {*} request 
 * @param {*} response 
 */
export const newProductView = async (request, response) => {
    response.render("newProduct", {
        title: "Fulbo$hop | Crear",
        about: "Nuevo Producto",
        script: "newProduct.js"
    })
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const editProductView = async (request, response) => {
    response.render("editProduct", {
        title: "Fulbo$hop | Modificar",
        about: "Modificar Producto",
        script: "editProduct.js"
    })
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const removeProductView = async (request, response) => {
    response.render("removeProduct", {
        title: "Fulbo$hop | Eliminar",
        about: "Elmimnar Producto",
        script: "removeProduct.js"
    })
}