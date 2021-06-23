import express, {Request, Response, NextFunction} from "express";
import "reflect-metadata";
import "express-async-errors"

import {router} from "./routes";

import "./database";
import { AppError } from "./errors/AppError";


const app = express();

app.use(express.json())

app.use(router);

app.use((err:Error, request:Request, response:Response, next:NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

app.listen(3000, () => {
  console.log("Server is running ");
});
