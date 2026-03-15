import express from "express";
import cors from "cors";
import applicationsRouter from "./routes/applications.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/applications",applicationsRouter)

export default app;



