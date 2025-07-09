import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { getActiveProducts, getProductById, newProduct, editProduct, reactivateProduct, removeProduct, getAcitveShirts, getAcitveShoes, getAllShirts, getAllShoes } from "../controllers/product.controllers.js";

const router = Router();



// GET todos los productos ACTIVOS
router.get("/", getActiveProducts);


// GET todos los productos activos del tipo Camiseta
router.get("/shirts", getAcitveShirts);


// GET todos los productos activos del tipo Botines
router.get("/shoes", getAcitveShoes);


// GET todos los productos activos del tipo Camiseta
router.get("/allShirts", getAllShirts);


// GET todos los productos activos del tipo Botines
router.get("/allShoes", getAllShoes);


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