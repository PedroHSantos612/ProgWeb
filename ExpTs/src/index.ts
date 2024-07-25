import express, { Request } from 'express';
import dotenv from 'dotenv';
import{ engine } from "express-handlebars";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {v4 } from "uuid";

import router from "./router/router"
import logger from "./middlewares/logger"

declare module "express-session"{
  interface SessionData{
  uid: string;
  }
};

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 4466;

app.engine("handlebars", engine( {helpers: require(`${__dirname}/views/helpers/helpers.ts`)}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.use(cookieParser());
app.use(session({
  genid: ()=> v4(),
  secret: "SWUQH4qadfj@asd6579ahgfvacv",
  saveUninitialized: true,
  resave: true,
}))
app.use(logger("combined"));
app.use("/img", express.static(`${__dirname}/../public/img`));

app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get("/google", (req,res)=>{
  res.redirect("http://google.com");
});

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`)
});

