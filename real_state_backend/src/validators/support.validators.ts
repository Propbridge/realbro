import z from "zod";

export const ticketStatusEnum = ["OPEN", "CLOSED"] as const;

// Create Support Ticket Schema
export const createSupportTicketSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phoneNo: z.string().min(10, "Valid phone number is required").max(15),
    description: z.string().min(10, "Description must be at least 10 characters"),
    isRequestForCall: z.boolean().default(false),
});

// Update Support Ticket Schema (for admin use)
export const updateSupportTicketSchema = z.object({
    ticketStatus: z.enum(ticketStatusEnum),
});

// Get Tickets Query Schema
export const getTicketsQuerySchema = z.object({
    ticketStatus: z.enum(ticketStatusEnum).optional(),
    page: z.preprocess(
        (val) => val ? parseInt(val as string) : 1,
        z.number().int().min(1).default(1)
    ),
    limit: z.preprocess(
        (val) => val ? Math.min(parseInt(val as string), 100) : 10,
        z.number().int().min(1).max(100).default(10)
    ),
});

export type CreateSupportTicketInput = z.infer<typeof createSupportTicketSchema>;
export type UpdateSupportTicketInput = z.infer<typeof updateSupportTicketSchema>;
export type GetTicketsQueryInput = z.infer<typeof getTicketsQuerySchema>;
