import express from "express";
import { json } from "body-parser";

import todoRouters from "./routes/todos";

// const express = require('express');

const app = express();

app.use(json());

app.use("/todos", todoRouters);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({
      message: err.message,
    });
  }
);

app.listen(3000);
