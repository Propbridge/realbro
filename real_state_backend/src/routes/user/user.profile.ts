import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { getProfile, sendPhoneUpdateOtp, updateProfile, verifyPhoneUpdateOtp } from "../../controllers/user/profile.controller";
import { sendPhoneUpdateOtpSchema, updateProfileSchema, verifyPhoneUpdateOtpSchema } from "../../validators/user.validator";
import { validate } from "../../middleware/validate";

const router = express.Router();

///api/v1/user/profile
router.get('/',authMiddleware,getProfile);
router.put("/", authMiddleware, validate(updateProfileSchema), updateProfile);
router.post("/phone-change/send-otp", authMiddleware, validate(sendPhoneUpdateOtpSchema), sendPhoneUpdateOtp);
router.post("/phone-change/verify", authMiddleware, validate(verifyPhoneUpdateOtpSchema), verifyPhoneUpdateOtp);

export default router;