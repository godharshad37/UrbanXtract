import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { spawnSync } from "child_process"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const pathExits = (path) => {
    return fs.existsSync(path);
}

const waterSegment = AsyncHandler( async (req, res, next) => {
    const result = spawnSync("python", ["src/scripts/waterExtract.py"], { encoding: "utf-8" })
    const cloudResponse = await uploadOnCloudinary("public/Output/water_mask.jpg");
    const description = GridDesc("public/Output/water_mask.jpg");
    res.status(200).json({msg : "done", link: cloudResponse.url, desc: description});
});

const roadSegment = AsyncHandler( async (req, res) => {
    const result = spawnSync("python", ["src/scripts/roadExtract.py"], { encoding: "utf-8" })
    const cloudResponse = await uploadOnCloudinary("public/Output/road_mask.jpg");
    const description = GridDesc("public/Output/road_mask.jpg");
    res.status(200).json({msg : "done", link: cloudResponse.url, desc: description});
});

const GridDesc = (path) => {
    const res = spawnSync("python", ["backend/src/scripts/gridanalyzed.py", path], { encoding: "utf-8" })
    return res.stdout;
}

export { waterSegment, roadSegment };