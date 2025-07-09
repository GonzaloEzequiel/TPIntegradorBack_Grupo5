import Admins from "../models/admin.models.js"


/**
 * Se encarga de invocar al modelo para dar de alta un nuevo administrador en el dashboard y manejar la respuesta de la bbdd    (! no implementao aun)
 * @param {*} request solicitud de la ruta con los datos del nuevo administrador
 * @param {*} response respuesta a la ruta con la resolución de la operación
 * @returns respuesta de la operación a la petición
 */
export const newAdmin = async (request, response) => {

    try {

        let { ["admin-name"]:name, ["admin-email"]:email, ["admin-pass1"]:password } = request.body;

        if(!name || !email || !password) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }        

        let [rows] = await Admins.insertAdmin(name, email, password);

        response.status(201).json({
            message: "Administrador creado correctamente.",
            productId: rows.insertId
        });

    } catch(error) {

        console.log(error);

        response.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });

    }

}

/**
 * Se encarga de invocar al modelo para validar las credenciales de un administrador y manejar la respuesta de la bbdd
 * @param {*} request solicitud de la ruta con las credenciales a validar
 * @param {*} response respuesta a la ruta con la resolución de la operación
 */
export const adminLogin = async (request, response) => {

    try {
        
        let { ['admin-email']: email, ['admin-password']: password } = request.body;

        //password = cifrado-password ?

        let [rows] = await Admins.logAdmin(email, password);

        if(rows.length) {

            response.status(200).json({
                message: "Login exitoso",
                admin: rows[0].name
            })
        
        } else {
            response.status(404).json("Credenciales Inválidas");
        }        

    } catch(error) {

        console.log(error);
        response.status(500).json({error});

    }    

}
