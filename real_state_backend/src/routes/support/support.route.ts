import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { validate, validateQuery } from "../../middleware/validate";
import { 
    createSupportTicket, 
    getMyTickets, 
    getTicketById, 
    updateTicketStatus, 
    getAllTickets 
} from "../../controllers/support/support.controller";
import { 
    createSupportTicketSchema, 
    updateSupportTicketSchema, 
    getTicketsQuerySchema 
} from "../../validators/support.validators";

const router = express.Router();

// User routes (requires authentication)
router.post("/", authMiddleware, validate(createSupportTicketSchema), createSupportTicket);
router.get("/my-tickets", authMiddleware, validateQuery(getTicketsQuerySchema), getMyTickets);
router.get("/:id", authMiddleware, getTicketById);
router.put("/:id/status", authMiddleware, validate(updateSupportTicketSchema), updateTicketStatus);

// Admin route (you can add admin middleware later)
router.get("/admin/all", authMiddleware, validateQuery(getTicketsQuerySchema), getAllTickets);

export default router;
