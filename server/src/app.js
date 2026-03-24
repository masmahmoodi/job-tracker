import express from "express";
import cors from "cors";
import applicationsRouter from "./routes/applications.routes.js";
import authRoutes from "./routes/authRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/applications",applicationsRouter)
app.use("/api/auth", authRoutes)
export default app;



