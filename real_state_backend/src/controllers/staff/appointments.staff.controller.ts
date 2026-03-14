import { Request, Response } from "express";
import { prisma } from "../../config/prisma";

export async function getAllAppointments(req: Request, res: Response) {
    try {
        const appointments = await prisma.appointment.findMany({
            where,
            orderBy: {
                appointmentDate: 'asc',
                appointmentTime: 'asc'
            },
            include: {
                property:{
                    select: {
                        id: true,
                        title: true,
                    }
                },
                user:{
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    }
                }
            }
        });
        return res.status(200).json({ appointments });
    } catch (error) {
        console.error("Get all appointments error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
