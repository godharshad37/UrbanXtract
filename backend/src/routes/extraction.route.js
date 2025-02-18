import { Router } from "express";
import { waterSegment, roadSegment } from "../controllers/featureExtraction.controller.js";

const router = Router();

router.route("/water_extraction").get(waterSegment);

router.route("/road_extraction").get(roadSegment);

router.route("/build_extraction").get(buildSegment);

export default router;