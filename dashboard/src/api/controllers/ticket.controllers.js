import Tickets from "../models/ticket.models.js";

/**
 * Se encarga de invocar al modelo para crear un ticket nuevo
 * @param {*} request solicitud de la ruta con el identificador del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación
 * @returns respuesta de la operación a la petición
 */
export const newTicket = async (request, response) => {

    try {

        let { client, total } = request.body;

        if(!client || !total) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }

        let [rows] = await Tickets.insertTicket(client, new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Argentina/Buenos_Aires'})), total);

        response.status(201).json({
            message: "Ticket creado",
            ticketId: rows.insertId
        });


    } catch (error) {

         response.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });

    }

}

/**
 * Se encarga de invocar al modelo para consultar todos los tickets y manejar la respuesta de la bbdd
 * @param {*} request solicitud de la ruta con los datos del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación
 */
export const getTickets = async (request, response) => {

    try {

        let [rows] = await Tickets.selectAllTickets();

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

/**
 * Se encarga de invocar al modelo para consultar un productos por su id
 * @param {*} request solicitud de la ruta con los datos del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación 
 */
export const getTicketById = async (request, response) => {

    try {

        let { id } = request.params;

        let [rows] = await Tickets.selectTicketById(id);

        response.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron tickets" : "Tickets encontrados"
        });

    } catch (error) {

        console.log("Error obteniendo tickets ", error);

        response.status(500).json({
            error: "Error interno del servidor al obtener tickets"
        });
        
    }

}

/**
 * Se encarga de invocar al modelo para consultar todas las ventas de un ticket
 * @param {*} request solicitud de la ruta con los datos del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación 
 */
export const getSalesFromTicket = async (request, response) => {

    try {

        let { id } = request.params;

        let [rows] = await Tickets.selectAllSalesFromATicket(id);

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
 * Se encarga de invocar al modelo para crear una nueva ventas en un ticket
 * @param {*} request solicitud de la ruta con los datos del producto
 * @param {*} response respuesta a la ruta con la resolución de la operación 
 * @returns respuesta de la operación a la petición
 */
export const newSale = async (request, response) => {

    try {         

        let { ticketId, id, quantity, price } = request.body;


        if(!ticketId || !id || !quantity || !price) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }

        let [rows] = await Tickets.insertSale(ticketId, id, quantity, quantity*price);

        response.status(201).json({
            message: "Venta creada correctamente.",
            saletId: rows.insertId
        });

    } catch (error) {

        response.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });

    }

}