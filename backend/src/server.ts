import express, { type Request, type Response } from "express";
import databaseConnection from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/api", (req: Request, res: Response) => {
  res.send("Api Test successfull.");
});

const startServer = async () => {
  await databaseConnection();

  app.listen(port, () => {
    console.log(`System is running on port: ${port}`);
  });
};

startServer();
