import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/MongoDb.js";
import contentRoutes from "./routes/contentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES AFTER
app.use("/api/content", contentRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
