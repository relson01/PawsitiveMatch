import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
// import { initializaDb } from "../db";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/login", (req: Request, res: Response) => {
  res.send("user trying to login");
});

app.listen(port, () => {
  // initializaDb();
  console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;
