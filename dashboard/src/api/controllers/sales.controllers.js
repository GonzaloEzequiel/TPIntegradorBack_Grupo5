import Sales from "../models/sales.models.js";


/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export const newSale = async (request, response) => {

    try { 

        let { ["ticket-id"]:id_ticket, ["product-id"]:id_product, quantity, subtotal } = request.body;

        if(!id_ticket || !id_product || !quantity || !unit_price) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }

        let [rows] = await Sales.insertSale(id_ticket, id_product, quantity, subtotal);

        response.status(201).json({
            message: "Venta creado correctamente.",
            productId: rows.insertId
        });

    } catch (error) {

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
 */
export const getSalesFromTicket = async (request, response) => {

    try {

        let { id } = request.params;

        let [rows] = await Sales.selectAllSalesFromATicket(id);

        response.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron ventas" : "Ventas encontradas"
        });

    } catch (error) {

        console.log("Error obteniendo productos ", error);

        response.status(500).json({
            error: "Error interno del servidor al obtener ventas."
        });
        
    }
    
}

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export const newTicket = async (request, response) => {

    try {

        let { ["client-name"]:client, date, total } = request.body;

        if(!client || !date || !total) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }

    } catch (error) {

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
 */
export const getTickets = async (request, response) => {

    try {

        let [rows] = await Sales.selectAllTickets();

        response.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron ventas" : "Ventas encontradas"
        });

    } catch (error) {

        console.log("Error obteniendo ventas: ", error);

        response.status(500).json({
            error: "Error interno del servidor al obtener ventas."
        });
        
    }

}

