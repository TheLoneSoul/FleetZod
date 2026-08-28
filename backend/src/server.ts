import express, { type Request, type Response } from "express";
const app = express();

app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("Api Test successfull.");
});

app.listen(3000, () => {
  console.log("System is running on port 3000");
});
