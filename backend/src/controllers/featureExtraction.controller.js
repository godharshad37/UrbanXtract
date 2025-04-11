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
    res.status(200).json({msg : "Segment water image done", link: cloudResponse.url});
});

const waterAnalyze = AsyncHandler( async(req, res, next) => {
    const description = spawnSync("python", ["src/scripts/waterMaskPie.py"], { encoding: "utf-8" })
    const cloudResponse = await uploadOnCloudinary("public/Output/water_pie.jpg");
    const obj = description.stdout;
    const jsonString = obj.replace(/'/g, '"');
    const parsedObj = JSON.parse(jsonString);
    res.status(200).json({msg : "done", link: cloudResponse.url, desc : parsedObj});
})

const roadSegment = AsyncHandler( async (req, res) => {
    const result = spawnSync("python", ["src/scripts/roadExtract.py"], { encoding: "utf-8" })
    const cloudResponse = await uploadOnCloudinary("public/Output/road_mask.jpg");
    res.status(200).json({msg : "Segment road image done", link: cloudResponse.url});
});

const roadAnaylze = AsyncHandler( async (req, res) => {
    const description = spawnSync("python", ["src/scripts/roadMaskPie.py"], { encoding: "utf-8" })
    const cloudResponse = await uploadOnCloudinary("public/Output/road_pie.jpg");
    const obj = description.stdout;
    const jsonString = obj.replace(/'/g, '"');
    const parsedObj = JSON.parse(jsonString);
    res.status(200).json({msg : "done", link: cloudResponse.url, desc: parsedObj});
})

export { waterSegment, waterAnalyze, roadSegment, roadAnaylze, buildSegment };