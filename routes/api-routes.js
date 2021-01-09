const router = require("express").Router();
const db = require("../models");


router.get("/api/workouts", (req, res)=>{
    db.Workout.find({})
    .sort({ date: -1 })
    .then(results => {
        res.json(results);
      })
      .catch(err => {
        res.json(err);
      });
});

router.put("/api/workouts/:id", (req, res) => {
    const filter = { _id: req.params.id };
    const update = { $push: { exercises: req.body } };
    db.Workout.findOneAndUpdate(filter, update, { new: true })
        .then(results => {
            console.log(results);
            res.json(results);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;