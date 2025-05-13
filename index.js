import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";
import Routes from "./routes/index.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(Routes);
app.get("/", async (req, res) => {
  try {
    res.send("Sockets | SSL CERTs Installed");
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server Working!!");
});
