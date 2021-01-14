// const router = require("express").Router();
const db = require("../models");


module.exports = function (app) {
    
    app.get("/api/workouts", (req, res) => {
      
        db.Workout.find({})
            // .sort({ date: -1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
       
        const filter = { _id: req.params.id };
        const update = { $push: { exercises: req.body } };
        db.Workout.findOneAndUpdate(filter, update, { new: true })
            .then(dbWorkout => {
                console.log(dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    app.post("/api/workouts", ({ body }, res) =>
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    );

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .sort({ date: -1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    });

};
        

// router.get("/api/workouts", (req, res)=>{
//     db.Workout.find({})
//     .sort({ date: -1 })
//     .then(results => {
//         res.json(results);
//       })
//       .catch(err => {
//         res.json(err);
//       });
// });



// router.put("/api/workouts/:id", (req, res) => {
//     const filter = { _id: req.params.id };
//     const update = { $push: { exercises: req.body } };
//     db.Workout.findOneAndUpdate(filter, update, { new: true })
//         .then(results => {
//             console.log(results);
//             res.json(results);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// router.post("/api/workouts", ({ body }, res) => {
//     db.Workout.create(body)
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.status(400).json(err);
//         });
// });


// module.exports = router;