import express, { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import getHtml from "./getMarkUp";
import * as path from "path";
import pargeArgs from "minimist";
import startTest from "./tank";
import api from "./api";

const params = pargeArgs(process.argv.slice(2));
const port = params.port || 4000;
const includeCss = params.css || process.env.NODE_ENV === "production";

const app = express();

app.use(express.static(path.resolve(__dirname, "../../public/")));

app.use(morgan("tiny"));
app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(getHtml({ includeCss }));
});

app.get("/run", (req, res) => {
  startTest().then(() => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("Test complete!");
  });
});

app.use(
  "/api",
  api({
    path: process.env.STORAGE_PATH || path.resolve(__dirname, "../../.storage")
  })
);

app.use(function(req, res) {
  res.status(404).send("Page not found!");
  console.log("Url not found: " + req.url);
});

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err.stack);
  res.status(500).send(err.stack);
});

app.listen(port, () => {
  console.log(`The application started on port ${port}.`);
});
