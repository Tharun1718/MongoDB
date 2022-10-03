import express from "express";
import { 
  getAllMovies, 
  createMovies, 
  getMovieById, 
  deleteMovieById, 
  updateMovieById 
} from "../services/movies.service.js";
const router = express.Router();


router.get("/movies", async function (request, response) {
    console.log(request.query);
    const movies = await getAllMovies(request);
    response.send(movies);
    console.log("movie is loaded successfully")
  });
  
router.post("/", async function (request, response) {
    const data= request.body;
    console.log(data);
    const movies = await createMovies(data)
                   
    response.send(movies);
    console.log("movie is loaded successfully")
  });
  
  
router.get("/:id", async function (request, response) {
    // console.log(request.params)
    const {id} = request.params;
    // console.log(id);
    // const movie = movies.find((mv)=> mv.id === id)
  
    const movie = await getMovieById(id);
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
  
    const result = await deleteMovieById(id);
    console.log("movie deleted successfully");
    result.deletedCount > 0
    ? response.send({msg: "Movie deleted successfully ✔"})
    : response.status(404).send({msg: "Movie not found"})
  });
  
router.put("/:id", async function (request, response) {
    // console.log(request.params)
    const {id} = request.params;
    const data = request.body;
  
    const movie = await updateMovieById(id, data);
    console.log("movie deleted successfully");
    movie
    ? response.send(movie)
    : response.status(404).send({msg: "Movie not found"})
  });

export default router;


