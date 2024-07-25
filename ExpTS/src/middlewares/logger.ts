import { NextFunction, Request, Response } from "express";

function logger(type: "combined"| "short"){
  if(type==="combined")
    return (req: Request, res: Response, next: NextFunction) =>{
      console.log(`${(new Date()).toDateString()} ${req.method} ${req.url}`);
      next();
    };
  else{
    return (req: Request, res: Response, next: NextFunction) =>{
      console.log(`${(new Date()).toDateString()} ${req.url}`);
      next();
    };
  }
}

export default logger;