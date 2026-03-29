import express from "express";
import { createStaff, updateStaff, getStaffById, blockStaff, unblockStaff, deleteStaff, getSuperAdminById, updateSuperAdmin } from "../../controllers/staff/staff.management.controller";
import { authMiddleware } from "../../middleware/auth";
import { requireSuperAdmin } from "../../middleware/staff";
import { validate } from "../../middleware/validate";
import { createStaffSchema,updateStaffSchema, updateSuperAdminSchema } from "../../validators/staff.validator";
import { getAllStaffs } from "../../controllers/staff/staff.management.controller";
const router = express.Router();

router.post('/create-staff',authMiddleware,requireSuperAdmin,validate(createStaffSchema),createStaff);
router.put('/update-staff/:id',authMiddleware,requireSuperAdmin,validate(updateStaffSchema),updateStaff);
router.get('/get-staffs',authMiddleware,requireSuperAdmin,getAllStaffs);
router.get('/get-staff/:id',authMiddleware,requireSuperAdmin,getStaffById);
router.get('/get-superadmin/:id',authMiddleware,requireSuperAdmin,getSuperAdminById);
router.put('/block-staff/:id',authMiddleware,requireSuperAdmin,blockStaff);
router.put('/unblock-staff/:id',authMiddleware,requireSuperAdmin,unblockStaff);
router.delete('/delete-staff/:id',authMiddleware,requireSuperAdmin,deleteStaff);
router.put('/update-superadmin/:id',authMiddleware,requireSuperAdmin,validate(updateSuperAdminSchema),updateSuperAdmin);

export default router;