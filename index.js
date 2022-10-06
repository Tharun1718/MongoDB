// const express = require("express");
// const { MongoClient } = require("mongodb");
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import moviesRouter from "./routes/movies.route.js";
import userRouter from "./routes/user.route.js";


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

app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩, AWESOME!!!");
  console.log("hie")
});

// const mobiles = [
//   {
//     model: "OnePlus 9 5G",
//     img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
//     company: "Oneplus"
//   },
//   {
//     model: "Iphone 13 mini",
//     img:
//       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
//     company: "Apple"
//   },
//   {
//     model: "Samsung s21 ultra",
//     img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
//     company: "Samsung"
//   },
//   {
//     model: "Xiomi mi 11",
//     img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
//     company: "Xiomi"
//   }
// ];

app.get("/mobiles", async function ( request, response ) {
  const mobiles = await client.db("mongodatabase")
                  .collection("mobiles")
                  .find({})
                  .toArray();
  response.send(mobiles);
})

app.post("/mobiles", async function ( request, response ) {
  const data = request.body;
  const result = await client.db("mongodatabase")
                  .collection("mobiles")
                  .insertMany(data);
   response.send(result);
})


app.use("/movies", moviesRouter);

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

