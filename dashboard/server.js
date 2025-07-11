import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import { porductRoutes, adminRoutes, viewRoutes, ticketRoutes } from "./src/api/routes/index.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { __dirname, join } from "./src/api/utils/index.js";


const app = express();
const PORT = environments.port;


app.set("view engine", "ejs");
app.set("views", join(__dirname, "/src/views"));
app.use(express.static(join(__dirname, "/src/public")));
app.use(express.json());
app.use(cors());
app.use(loggerUrl);



app.use("/api/products", porductRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/dashboard", viewRoutes);



app.get("/", (req, res) => {
    res.send("TEST DESDE ROOT");
})


/**
 * Abre el servidor, y lo pone a escuchar en el puerto declarado
 */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});