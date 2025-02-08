import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//importing routes
import featureRouter from "./routes/extraction.route.js";

app.use("/api/v1/feature", featureRouter);

export default app;