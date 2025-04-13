import { Router } from "express";
import { waterSegment, waterAnalyze, roadSegment, roadAnaylze, buildSegment, buildAnalyze } from "../controllers/featureExtraction.controller.js";

const router = Router();

//Segment paths
router.route("/water_extraction").get(waterSegment);
router.route("/road_extraction").get(roadSegment);
router.route("/build_extraction").get(buildSegment);

//Anaylze paths
router.route("/water_analyze").get(waterAnalyze);
router.route("/road_analyze").get(roadAnaylze);
router.route("/build_analyze").get(buildAnalyze);

export default router;