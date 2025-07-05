import { Router } from "express";
import connection from "../database/db.js";

const router = Router();


/**
 * POST nuevo admin
 */
router.post("/", async (request, response) => {

    try {

        let { name, email, password } = request.body;

        if(!name || !email || !password) {

            return response.status(400).json({
                message: "Datos inválidos. Asegurate de enviar todos los datos requeridos."
            });

        }

        let sql = `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`;

        let [rows] = await connection.query(sql, [name, email, password]);

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

});

/**
 * POST admin login
 */
router.post("/login", async (request, response) => {

    try {
        
        let { email, password } = request.body;

        //password = cifrado-password                                               !! Buscar métodos de cifrado de contraseñas nodejs !!

        let sql = `SELECT * FROM admins WHERE email = ? AND password = ?`;

        let [rows] = await connection.query(sql, [email, password]);

        if(rows.length) {

            response.status(200).json({
                message: "Login exitoso", 
                admin: rows[0].nombre
            })
        
        } else {
            response.status(404).json("Credenciales Inválidas");
        }        

    } catch(error) {

        console.log(error);
        response.status(500).json({error});

    }    

});

export default router;