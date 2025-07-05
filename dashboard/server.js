import express, { request, response } from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import { porductRoutes, adminRoutes} from "./src/api/routes/index.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

const app = express();
const PORT = environments.port;



app.use(express.json());
app.use(cors());
app.use(loggerUrl);





/**
 * TEST
 */
app.get("/", (request, response) => {

    response.send("El servidor está prendido y escuchando...");

});




app.use("/api/products", porductRoutes);
app.use("/api/admin", adminRoutes);






/**
 * Abre el servidor, y lo pone a escuchar en el puerto declarado
 */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});





