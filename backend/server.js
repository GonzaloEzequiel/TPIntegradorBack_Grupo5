import express, { request, response } from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";

const app = express();
const PORT = environments.port;



app.use(express.json());
app.use(cors());

app.use((request, response, next) => {
    console.log(`[${new Date().toLocaleString()}] ${request.method} ${request.url}`);
    next();
});




const validateId = (request, response, next) => {
    const id = request.params.id;

    if(!id || isNaN(id)) {
        return response.status(400).json({
            error: "El ID debe ser un número"
        });
    }

    //parseamos a entero base10
    request.id = parseInt(id, 10);

    next();
}









/**
 * TEST
 */
app.get("/", (request, response) => {

    response.send("El servidor está prendido y escuchando...");

});

/**
 * Abre el servidor, y lo pone a escuchar en el puerto declarado
 */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// ---------------------------------------- SECCION PRODCUTO ---------------------------------------- //


/**
 * GET todos los productos ACTIVOS
 */
app.get("/products", async (request, response) => {

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
 * POST nuevo producto
 */
app.post("/products", async (request, response) => {

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
 * GET un producto por ID
 */
app.get("/products/:id", validateId, async (request, response) => {

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
 * PUT modificar un producto
 */
app.put("/products/:id", async (request, response) => {
    
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

app.delete("/products/:id", async (request, response) => {

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


// ---------------------------------------- SECCION ADMIN ---------------------------------------- //


/**
 * POST nuevo admin
 */
app.post("/admin", async (request, response) => {

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
app.post("/admin/login", async (request, response) => {

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

