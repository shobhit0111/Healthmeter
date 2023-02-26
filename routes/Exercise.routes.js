const express=require("express")
const{ExerciseModel}=require("../models/Exercise.model")
const exerciseRouter=express.Router()

exerciseRouter.get("/getExercise/:name", async (req, res) => {
    var regx = RegExp(req.params.name, "i");
  
    const searchExercise = await ExerciseModel.find({ name: regx });
    res.send(searchExercise);
  });

// to add exercises
exerciseRouter.post("/addexercise", async (req, res) => {
    const {
     
      name,
      calories_per_hour,
      duration_minutes,
      effortlevel,
      total_calories,
      diarygroup,
      timeofday
    } = req.body;
  
    var today = new Date();
    var todays_date =
      today.getDate() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      today.getFullYear();
  
    const exercise = new ExerciseModel({
      date: todays_date,
   
      name,
      calories_per_hour,
      duration_minutes,
      effortlevel,
      total_calories,
      diarygroup,
      timeofday
    });
    await exercise.save();
    res.send(exercise);
  });

exerciseRouter.get("/getexercise", async (req, res) => {
    // get the email from the token :-
  
    const uesr_exercise = await ExerciseModel.find();
    return res.status(201).send(uesr_exercise);
  });
  
  // delete:-
  
  exerciseRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
  
    await ExerciseModel.findOneAndDelete({ _id: id });
    return res.status(201).send("deleted");
  });


module.exports={
    exerciseRouter
}