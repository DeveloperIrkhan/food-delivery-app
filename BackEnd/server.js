import express from "express";
import cors from "cors";
import { ConnectionDb } from "./config/Database.js";
import foodRouter from "./routes/FootRoute.js";
import userRoutes from "./routes/UserRoute.js";
import 'dotenv/config'

// app configuration
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

//Db connction
ConnectionDb();

// API endpoint

app.use("/api/food", foodRouter);
app.use("/api/userauth", userRoutes)
app.use("/images", express.static("uploads"));
app.get("/", (req, resp) => {
  resp.send("API is working");
});

app.listen(port, () => {
  console.log(`app is runing on http://localhost:${port} no`);
});
