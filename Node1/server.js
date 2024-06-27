import http from "http";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import createLink from "./src/utils/links.js";

import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      files.forEach(file => {
        res.write(`${createLink(file)}\n`);
      });
      res.end();
    }
  });
});

server.listen(3333);

