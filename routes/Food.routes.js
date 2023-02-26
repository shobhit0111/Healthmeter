const express=require("express")
const{FoodModel}=require("../models/Food.model")
const foodRouter=express.Router()

// to search the food:-
foodRouter.get("/getfood/:name", async (req, res) => {
    var regx = RegExp(req.params.name, "i");
    const searchFood = await FoodModel.find({ name: regx });
    res.status(200).send(searchFood);
  });

// to add foods in the food section:-
foodRouter.post("/foodadded", async (req, res) => {
    const {
     name,
    energy,
    protein, 
    fat,
  amount,
    carbohydrate
    } = req.body;
    // console.log(req.body)
  
  
    var today = new Date();
    var todays_date =
      today.getDate() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      today.getFullYear();
  
    const food = new FoodModel({
      date: todays_date,
      name,
    energy,
    protein, 
    fat,
  amount,
    carbohydrate
    
    });
    await food.save();
    res.status(201).send(food);
  });

// to get foods:-
foodRouter.get("/Allfoods", async (req, res) => {
    const food = await FoodModel.find();
    res.send(food);
  });


foodRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    try {
        await FoodModel.findByIdAndDelete({_id:ID})
        res.send({"msg":"data has been deleted"})
    } catch (err) {
        res.send({"msg":"Cannot delete","error":err.message})
    }
})


module.exports={
    foodRouter
}