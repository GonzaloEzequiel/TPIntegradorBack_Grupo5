import { Router } from "express";
import { adminLogin, newAdmin } from "../controllers/admin.controllers.js";

const router = Router();



// POST nuevo admin
router.post("/", newAdmin);


// POST admin login
router.post("/login", adminLogin);




export default router;