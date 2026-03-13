import express from "express";
import { authMiddleware } from "../../middleware/auth";
import { validate, validateQuery } from "../../middleware/validate";
import {
    saveExclusiveProperty,
    unsaveExclusiveProperty,
    getSavedExclusiveProperties,
    checkIfExclusivePropertySaved
} from "../../controllers/savedExclusiveProperty/savedExclusiveProperty.controller";
import {
    savePropertySchema,
    getSavedPropertiesQuerySchema
} from "../../validators/savedProperty.validators";

const router = express.Router();

// All routes require authentication
router.post("/", authMiddleware, validate(savePropertySchema), saveExclusiveProperty);
router.delete("/:propertyId", authMiddleware, unsaveExclusiveProperty);
router.get("/", authMiddleware, validateQuery(getSavedPropertiesQuerySchema), getSavedExclusiveProperties);
router.get("/check/:propertyId", authMiddleware, checkIfExclusivePropertySaved);

export default router;
