import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (path) => {
    try {
        if (!path) return null;
        //console.log(path);
        const response = await cloudinary.uploader.upload(path, {
            resource_type: "auto"
        })
        //fs.unlinkSync(path);
        return response;

    } catch (error) {
        fs.unlinkSync(path);
        console.log(error);
        return null;
    }
}

export { uploadOnCloudinary };