const db = require('../models/Workout');

module.exports = (app) => {
    app.get('/api/workouts', (req, res) => {
        db.Workout.find({})
            .then((workouts) => {
                workouts.forEach((workout) => {
                    workout.totalDuration = 0;
                    workout.exercises.forEach((exercise) => {
                        workout.totalDuration += exercise.duration;
                    });
                });

                res.json(workouts);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // Gets all workout data
    app.get('/api/workouts/range', (req, res) => {
        db.Workout.find({})
            .then((data) => {
                res.json(data);
            })
            .catch(({ message }) => {
                res.json(message);
            });
    });

    // Creates a new workout
    app.post('/api/workouts', ({ body }, res) => {
        db.Workout.create(body)
            .then((data) => {
                res.json(data);
            })
            .catch(({ message }) => {
                res.json(message);
            });
    });

    // Adds an exercise to a workout
    app.put('/api/workouts/:id', (req, res) => {
        db.Workout.findById(req.params.id)
            .then((data) => {
                let workoutExercises = data.exercises;

                workoutExercises.push(req.body);

                db.Workout.findByIdAndUpdate(
                    req.params.id,
                    data,
                    (err, result) => {
                        if (err) res.json(err);
                        else res.json(result);
                    }
                );
            })
            .catch(({ message }) => {
                res.json(message);
            });
    });
};