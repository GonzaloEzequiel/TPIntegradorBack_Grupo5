import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { newTicket, getTickets, getTicketById, getSalesFromTicket, newSale } from "../controllers/ticket.controllers.js";

const router = Router();



// POST nuevo ticket
router.post("/", newTicket);


// GET todos los tickets
router.get("/alltickets", getTickets);


// GET ticket por ID
router.get("/:id", validateId, getTicketById);


// GET ventas por ticket
router.get("/:id/sales", getSalesFromTicket);


// POST nueva venta
router.post("/sales", newSale);




export default router;