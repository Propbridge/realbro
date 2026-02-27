import z from "zod";

// Create Appointment Schema
export const createAppointmentSchema = z.object({
    propertyId: z.string().min(1, "Property ID is required"),
    appointmentDate: z.string().refine((date) => {
        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return false;
        
        // Validate it's a valid date
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return false;
        
        // Ensure appointment is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return parsedDate >= today;
    }, {
        message: "Invalid date format or date is in the past. Use YYYY-MM-DD format and ensure the date is today or in the future."
    }),
    appointmentTime: z.string().min(1, "Appointment time is required").refine((time) => {
        // Validate time format (HH:MM or HH:MM AM/PM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s?(AM|PM))?$/i;
        return timeRegex.test(time);
    }, {
        message: "Invalid time format. Use HH:MM or HH:MM AM/PM format."
    }),
    notes: z.string().optional(),
    isPreBooked: z.enum(["YES", "NO"]).optional().default("NO"),
});

// Update Appointment Schema
export const updateAppointmentSchema = z.object({
    appointmentDate: z.string().refine((date) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return false;
        
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return false;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return parsedDate >= today;
    }, {
        message: "Invalid date format or date is in the past. Use YYYY-MM-DD format."
    }).optional(),
    appointmentTime: z.string().refine((time) => {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](\s?(AM|PM))?$/i;
        return timeRegex.test(time);
    }, {
        message: "Invalid time format. Use HH:MM or HH:MM AM/PM format."
    }).optional(),
    status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]).optional(),
    notes: z.string().optional(),
    isPreBooked: z.enum(["YES", "NO"]).optional(),
});

// Get Appointments Query Schema
export const getAppointmentsQuerySchema = z.object({
    page: z.preprocess(
        (val) => val ? parseInt(val as string) : 1,
        z.number().int().min(1).default(1)
    ),
    limit: z.preprocess(
        (val) => val ? Math.min(parseInt(val as string), 100) : 10,
        z.number().int().min(1).max(100).default(10)
    ),
    status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED"]).optional(),
    propertyId: z.string().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
export type GetAppointmentsQueryInput = z.infer<typeof getAppointmentsQuerySchema>;
