// const express = require("express");
// const { MongoClient } = require("mongodb");
import express from "express";
import { MongoClient } from "mongodb";
import moviesRouter from "./routes/movies.route.js"

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const app = express();

const PORT = process.env.PORT;

// const MONGO_URL ="mongodb://127.0.0.1";

const MONGO_URL = process.env.MONGO_URL;


async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected 💖");
  return client;
}

export const client = await createConnection();

app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩, Welcome to Heroku");
  console.log("hie")
});


app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));