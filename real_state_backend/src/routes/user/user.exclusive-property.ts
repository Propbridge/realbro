import express from "express";
import {
    filterExclusivePropertiesForApp,
    getExclusivePropertiesForApp,
    getExclusivePropertyDetailsForApp,
    searchExclusivePropertiesForApp,
} from "../../controllers/user/exclusiveProperty.controller";
import { validateQuery } from "../../middleware/validate";
import {
    filterExclusivePropertiesSchema,
    searchExclusivePropertiesSchema,
} from "../../validators/property.validators";

const router = express.Router();

router.get("/", getExclusivePropertiesForApp);
router.get("/search", validateQuery(searchExclusivePropertiesSchema), searchExclusivePropertiesForApp);
router.get("/filter", validateQuery(filterExclusivePropertiesSchema), filterExclusivePropertiesForApp);
router.get("/:exclusivePropertyId", getExclusivePropertyDetailsForApp);

export default router;