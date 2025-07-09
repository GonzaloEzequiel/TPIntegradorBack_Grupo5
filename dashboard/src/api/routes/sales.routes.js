import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { newSale, getSalesFromTicket, newTicket, getTickets } from "../controllers/sales.controllers.js";

const router = Router();



// POST nueva venta
router.post("/", newSale);


// GET ventas por id del ticket
router.get("/ticket/:id", validateId, getSalesFromTicket);


// POST nuevo ticket
router.post("/ticket", newTicket);


// GET todos los tickets
router.get("/ticket", getTickets);




export default router;