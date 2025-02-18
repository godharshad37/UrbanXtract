import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { spawnSync } from "child_process"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const pathExits = (path) => {
    return fs.existsSync(path);
}

const buildSegment = AsyncHandler( async(req, res, next) => {
    const result = spawnSync("python", ["src/scripts/buildExtract.py"], { encoding: "utf-8" })
    const cloudResponse = await uploadOnCloudinary("public/Output/build_mask.jpg");
    const description = spawnSync("python", ["src/scripts/gridanalyzed.py", "public/Output/build_mask.jpg", "public/Output/build_graph.jpg"], { encoding: "utf-8" })
    const obj = description.stdout;
    const jsonString = obj.replace(/'/g, '"');
    const parsedObj = JSON.parse(jsonString);
    res.status(200).json({msg : "done", link: cloudResponse.url, desc: parsedObj});
});

const waterSegment = AsyncHandler( async (req, res, next) => {
    const result = spawnSync("python", ["src/scripts/waterExtract.py"], { encoding: "utf-8" })
    const cloudResponse = await uploadOnCloudinary("public/Output/water_mask.jpg");
    const description = spawnSync("python", ["src/scripts/gridanalyzed.py", "public/Output/water_mask.jpg", "public/Output/water_graph.jpg"], { encoding: "utf-8" })
    const obj = description.stdout;
    const jsonString = obj.replace(/'/g, '"');
    // Parse into JSON object
    const parsedObj = JSON.parse(jsonString);
    res.status(200).json({msg : "done", link: cloudResponse.url, desc: parsedObj});
});

const roadSegment = AsyncHandler( async (req, res) => {
    const result = spawnSync("python", ["src/scripts/roadExtract.py"], { encoding: "utf-8" })
    const cloudResponse = await uploadOnCloudinary("public/Output/road_mask.jpg");
    const description = spawnSync("python", ["src/scripts/gridanalyzed.py", "public/Output/road_mask.jpg", "public/Output/road_graph.jpg"], { encoding: "utf-8" })
    const obj = description.stdout;
    const jsonString = obj.replace(/'/g, '"');
    // Parse into JSON object
    const parsedObj = JSON.parse(jsonString);
    res.status(200).json({msg : "done", link: cloudResponse.url, desc: parsedObj});
});

export { waterSegment, roadSegment };