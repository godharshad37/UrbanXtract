import app from "./app.js";
import { upload } from "./middleware/multer.middleware.js";
import { uploadOnCloudinary } from "./utils/cloudinary.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 3000;

app.post("/upload", upload.single("water"), async (req, res) => {
    console.log(req.file.path);
    const response = await uploadOnCloudinary(req.file.path);
    res.status(200).json({data: "success"});
})
 
app.listen(PORT, () => {
    console.log(`⚙️  Server is Running on http://localhost:${PORT} `);
});