import express from "express";
import { getAllUsers, fullUserDetails, getUserForEdit, updateUserByStaff, updateKycStatus } from "../../controllers/staff/user.staff.controller";
import { authMiddleware } from "../../middleware/auth";
import { requireAdminOrSuperAdmin } from "../../middleware/staff";
const router = express.Router();

router.get("/", authMiddleware, requireAdminOrSuperAdmin, getAllUsers);
router.get("/:id", authMiddleware, requireAdminOrSuperAdmin, fullUserDetails);
router.get("/:id/edit", authMiddleware, requireAdminOrSuperAdmin, getUserForEdit);
router.put("/:id", authMiddleware, requireAdminOrSuperAdmin, updateUserByStaff);
router.put("/:id/kyc/:kycId", authMiddleware, requireAdminOrSuperAdmin, updateKycStatus);

export default router;