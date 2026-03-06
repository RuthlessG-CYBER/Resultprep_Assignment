import express from "express";
import cors from "cors";
import router from "./src/routes/route.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
