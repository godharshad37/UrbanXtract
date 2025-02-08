import { AsyncHandler } from "../utils/AsyncHandler.js";
import { spawnSync } from "child_process"
import fs from "fs";

const pathExits = (path) => {
    if (fs.existsSync(path)) {
        console.log("exits");
    }
    else {
        console.log("not exits");
    }
}

const waterSegment = AsyncHandler( async (req, res) => {
    const result = spawnSync('python', ['backend/src/scripts/waterExtract.py'], { encoding: 'utf-8' });

    console.log(result.stdout);
    pathExits("backend/public/Output/water_mask.jpg");
});

const roadSegment = AsyncHandler( async (req, res) => {
    const result = spawnSync('python', ['backend/src/scripts/roadExtract.py'], { encoding: 'utf-8' });
    console.log(result);
});

//waterSegment();
roadSegment();

export { waterSegment, roadSegment };