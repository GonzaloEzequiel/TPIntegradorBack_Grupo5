import { Router } from "express";
import { getProductsView, newProductView, editProductView, removeProductView, newAdminView, getTicketsView } from "../controllers/view.controllers.js";

const router = Router();



// GET vista productos
router.get("/", getProductsView);                   

// GET vista alta producto
router.get("/newProduct", newProductView);          /*  Flujo Administrador |  6. El administrador presiona el botón agregar producto. y 7. Se redirige a la pantalla de alta del producto. Se muestra el formulario de alta de producto. */

// GET vista modificar producto
router.get("/editProduct", editProductView);

// GET vista eliminar producto
router.get("/removeProduct", removeProductView);

// GET vista eliminar producto
router.get("/newAdmin", newAdminView);

// GET vista ventas
router.get("/tickets", getTicketsView);




export default router;