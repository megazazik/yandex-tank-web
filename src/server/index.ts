import express, { Request, Response, NextFunction } from "express";
import getHtml from "./getMarkUp";
import * as path from "path";
import pargeArgs from "minimist";

const params = pargeArgs(process.argv.slice(2));
const port = params.port || 4000;
const includeCss = params.css || process.env.NODE_ENV === "production";

const app = express();

app.use(express.static(path.resolve(__dirname, "../../public/")));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(getHtml({ includeCss }));
});

app.get("/500", (req, res) => {
  throw new Error("My test error");
});

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
