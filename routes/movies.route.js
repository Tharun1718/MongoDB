import express from "express";
import { client } from "../index.js"
const router = express.Router();


router.get("/movies", async function (request, response) {
    console.log(request.query);
    const movies = await client
                    .db("mongodatabase")
                    .collection("movies")
                    .find(request.query)
                    .toArray();
    response.send(movies);
    console.log("movie is loaded successfully")
  });
  
router.post("/", async function (request, response) {
    const data= request.body;
    console.log(data);
    const movies = await client
                    .db("mongodatabase")
                    .collection("movies")
                    .insertMany(data)
                   
    response.send(movies);
    console.log("movie is loaded successfully")
  });
  
  
router.get("/:id", async function (request, response) {
    // console.log(request.params)
    const {id} = request.params;
    // console.log(id);
    // const movie = movies.find((mv)=> mv.id === id)
  
    const movie = await client
                  .db("mongodatabase")
                  .collection("movies")
                  .findOne({id: id});
    console.log("movie loaded successfully");
    movie 
    ? response.send(movie)
    : response.status(404).send({msg: "Movie not found"})
  });
  
router.delete("/:id", async function (request, response) {
    // console.log(request.params)
    const {id} = request.params;
    // console.log(id);
    // const movie = movies.find((mv)=> mv.id === id)
  
    const result = await client
                  .db("mongodatabase")
                  .collection("movies")
                  .deleteOne({id: id});
    console.log("movie deleted successfully");
    result.deletedCount > 0
    ? response.send({msg: "Movie deleted successfully ✔"})
    : response.status(404).send({msg: "Movie not found"})
  });
  
router.put("/:id", async function (request, response) {
    // console.log(request.params)
    const {id} = request.params;
    const data = request.body;
  
    const movie = await client
                  .db("mongodatabase")
                  .collection("movies")
                  .updateOne({id: id}, { $set : data});
    console.log("movie deleted successfully");
    movie
    ? response.send(movie)
    : response.status(404).send({msg: "Movie not found"})
  });

export default router;