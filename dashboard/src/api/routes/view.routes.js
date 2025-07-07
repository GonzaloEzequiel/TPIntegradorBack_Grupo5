import { Router } from "express";
import Products from "../models/product.models.js";
import { getProductsView, newProductView, editProductView, removeProductView } from "../controllers/view.controllers.js";

const router = Router();

/**
 * 
 */
router.get("/", getProductsView);

/**
 * 
 */
router.get("/newProduct", newProductView);

/**
 * 
 */
router.get("/editProduct", editProductView);

/**
 * 
 */
router.get("/removeProduct", removeProductView);



export default router;