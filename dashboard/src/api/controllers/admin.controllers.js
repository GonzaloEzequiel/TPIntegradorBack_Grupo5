import Admins from "../models/admin.models.js"


/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
export const newAdmin = async (request, response) => {

    try {

        let { name, email, password } = request.body;

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
 * 
 * @param {*} request 
 * @param {*} response 
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
