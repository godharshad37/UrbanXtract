import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { spawnSync } from "child_process"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const pathExits = (path) => {
    return fs.existsSync(path);
}

const waterSegment = AsyncHandler( async (req, res) => {
    const result = spawnSync("python", ["src/scripts/waterExtract.py"], { encoding: "utf-8" })
    console.log(result);
    res.status(200).json({msg : "done"});
});

const roadSegment = AsyncHandler( async (req, res) => {
    const result = spawnSync("python", ["src/scripts/roadExtract.py"], { encoding: "utf-8" })
    console.log(result);
    res.status(200).json({msg : "done"});
});

export { waterSegment, roadSegment };