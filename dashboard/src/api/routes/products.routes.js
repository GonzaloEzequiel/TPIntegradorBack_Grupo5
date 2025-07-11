import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { getActiveProducts, getProductById, newProduct, editProduct, reactivateProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router();



// GET todos los productos ACTIVOS
router.get("/", getActiveProducts);


// GET un producto por su ID
router.get("/:id", validateId, getProductById);


// POST nuevo producto
router.post("/", newProduct);


// PUT modificar un producto
router.put("/:id", editProduct);


// PUT modificar un producto
router.patch("/:id", reactivateProduct);


// DELETE eliminar producto
router.delete("/:id", removeProduct);




export default router;