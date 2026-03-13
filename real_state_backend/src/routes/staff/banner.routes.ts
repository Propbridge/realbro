import express from "express";
import { createBanner, getAllBanners, deleteBanner } from "../../controllers/staff/banner.staff.controller";
const router = express.Router();

router.post('/', createBanner);
router.get('/', getAllBanners);
router.delete('/:id', deleteBanner);
export default router;