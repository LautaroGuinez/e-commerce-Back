const express = require("express")
const Cars = require("../models/Cars")
const User = require("../models/Users")
const routerCars = express.Router();

routerCars.get("/:userId", async(req,res)=>{
    const userId = req.params.userId
    try{
       const carsUser = await User.findByPk(userId, {include: "cars"});
       res.status(200).send(carsUser);
    
    }
       catch (error) {
        res.status(500).json({ message: "Error getting the cars" });
       }

})

routerCars.get("/", (req,res)=>{
    try{
       const cars = Cars.findAll(req.body);
       res.status(200).send(cars)
    }catch (error) {
      res.status(500).json({ message: "Error getting the cars" });
     }
})


module.exports = routerCars;