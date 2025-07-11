import Products from "../models/product.models.js";
import Tickets from "../models/ticket.models.js";


/**
 * Muestra la vista 'productos' con las variables necesarias
 * @param {*} request solicitud de la ruta (sin datos como parámetro)
 * @param {*} response respuesta a la ruta con el renderizado de la vista
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
 * Muestra la vista 'nuevo producto' con las variables necesarias
 * @param {*} request solicitud de la ruta (sin datos como parámetro)
 * @param {*} response respuesta a la ruta con el renderizado de la vista
 */
export const newProductView = async (request, response) => {
    response.render("newProduct", {
        title: "Fulbo$hop | Crear",
        about: "Nuevo Producto",
        script: "newProduct.js"
    })
}

/**
 * Muestra la vista 'midificar producto' con las variables necesarias
 * @param {*} request solicitud de la ruta (sin datos como parámetro)
 * @param {*} response respuesta a la ruta con el renderizado de la vista
 */
export const editProductView = async (request, response) => {
    response.render("editProduct", {
        title: "Fulbo$hop | Modificar",
        about: "Modificar Producto",
        script: "editProduct.js"
    })
}

/**
 * Muestra la vista 'eliminar producto' con las variables necesarias
 * @param {*} request solicitud de la ruta (sin datos como parámetro)
 * @param {*} response respuesta a la ruta con el renderizado de la vista
 */
export const removeProductView = async (request, response) => {
    response.render("removeProduct", {
        title: "Fulbo$hop | Eliminar",
        about: "Elmimnar Producto",
        script: "removeProduct.js"
    })
}

/**
 * Muestra la vista 'crear administrador' con las variables necesarias
 * @param {*} request solicitud de la ruta (sin datos como parámetro)
 * @param {*} response respuesta a la ruta con el renderizado de la vista
 */
export const newAdminView = async (request, response) => {

    response.render("newAdmin", {
        title: "Fulbo$hop | Administrador",
        about: "Crear Nuevo Administrador",
        script: "admin.js"
    })

}

/**
 * Muestra la vista 'ventas' con las variables necesarias
 * @param {*} request solicitud de la ruta (sin datos como parámetro)
 * @param {*} response respuesta a la ruta con el renderizado de la vista
 */
export const getTicketsView = async (request, response) => {

    try {

        const result = await Tickets.selectAllTickets();
        response.render("tickets", {

            title: "Fulbo$hop | Ventas",
            about: "Listado de Ventas",
            script: "tickets.js",
            tickets: result[0]

        })

    } catch (error) {

        console.error("Error obteniendo la información", error.message);
        response.status(500).json({
            error: "Error interno al obtener la información"
        });

    }    

}