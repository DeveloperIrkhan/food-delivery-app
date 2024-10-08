import "dotenv/config";
import express from "express";
import cors from "cors";
import foodRouter from "./routes/FootRoute.js";
import userRoutes from "./routes/UserRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import { ConnectionDb } from "./config/Database.js";
import cartRoute from "./routes/cartRoute.js";
import { orderRoute } from "./routes/orderRoute.js";

// app configuration
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true,
  })
);

//Db connction
ConnectionDb();

// API endpoint
//endpoints for adding category items
app.use("/api/category", categoryRoutes);
//endpoints for uploading food items
app.use("/api/cart", cartRoute);
app.use("/api/food", foodRouter);
app.use("/api/userauth", userRoutes);
app.use("/images", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/order", orderRoute);
// http://localhost:4000/api/order/placeorder

app.listen(port, () => {
  console.log(`app is runing on http://localhost:${port} no`);
});
