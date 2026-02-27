import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { validate, validateQuery } from "../../middleware/validate";
import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    cancelAppointment,
    deleteAppointment,
    getPropertyAppointments,
    togglePreBooked
} from "../../controllers/appointment/appointment.controller";
import {
    createAppointmentSchema,
    updateAppointmentSchema,
    getAppointmentsQuerySchema
} from "../../validators/appointment.validators";

const router = express.Router();

// All routes require authentication
router.post("/", authMiddleware, validate(createAppointmentSchema), createAppointment);
router.get("/", authMiddleware, validateQuery(getAppointmentsQuerySchema), getAppointments);
router.get("/:appointmentId", authMiddleware, getAppointmentById);
router.put("/:appointmentId", authMiddleware, validate(updateAppointmentSchema), updateAppointment);
router.patch("/:appointmentId/cancel", authMiddleware, cancelAppointment);
router.patch("/:appointmentId/toggle-prebooked", authMiddleware, togglePreBooked);
router.delete("/:appointmentId", authMiddleware, deleteAppointment);
router.get("/property/:propertyId", authMiddleware, getPropertyAppointments);

export default router;
