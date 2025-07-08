import { Router } from "express";
import { getProductsView, newProductView, editProductView, removeProductView } from "../controllers/view.controllers.js";

const router = Router();

/**
 * 
 */
router.get("/", getProductsView);                   

/**
 * 
 */
router.get("/newProduct", newProductView);          /*  Flujo Administrador |  6. El administrador presiona el botón agregar producto. y 7. Se redirige a la pantalla de alta del producto. Se muestra el formulario de alta de producto. */

/**
 * 
 */
router.get("/editProduct", editProductView);

/**
 * 
 */
router.get("/removeProduct", removeProductView);



export default router;