import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByName } from "../services/user.service.js";
const router = express.Router();

async function generateHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPassword);
    return hashedPassword;
  }
  
  generateHashedPassword("password@123");
  
router.post("/signup", async function (request, response) {
    const {username, password}= request.body;
    // console.log(data);
    const userFromDB = await getUserByName(username);
    if(userFromDB){
        response.status(400).send({msg: "username already exists"})
    }else if(password.length < 8){
        response.status(400).send({msg:"Password must be atleast 8 characters"})
    } else{
        const hashedPassword = await generateHashedPassword(password);
        const result = await createUser({
        username: username,
        password: hashedPassword,
    })
    response.send(result);
    // console.log("movie is loaded successfully")
    }
});
    
router.post("/login", async function (request, response) {
    const {username, password}= request.body;
    // console.log(data);
    const userFromDB = await getUserByName(username);
    if(!userFromDB){
        response.status(401).send({msg: "Invalid username or password"})
    }else{
        const storedDBPassword = userFromDB.password;
        const isPasswordMatch = await bcrypt.compare(password,storedDBPassword);
        if(isPasswordMatch){
            response.send({msg: "Login successful"});
        }else{
            response.status(401).send({msg: "Invalid username or password"});
        }
    }
}); 
  
  
export default router;
