import express from "express";
import cors from "cors";
import applicationsRouter from "./routes/applications.routes.js";
import authRoutes from "./routes/authRoutes.js"
import resumesRouter from "./routes/resumes.routes.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/applications",applicationsRouter)
app.use("/api/auth", authRoutes)
app.use("/api/resumes", resumesRouter)
export default app;



