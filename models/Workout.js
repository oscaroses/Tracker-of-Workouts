const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                enum: ['resistance', 'cardio'],
                required: [true, 'Please select an exercise type.']
            },
            name: {
                type: String,
                required: [true, 'Please name your exercise.']
            },
            duration: {
                type: Number,
                required: [true, 'Please enter the duration of your exercise.']
            },
            distance: {
                type: Number,
                required: false
            },
            weight: {
                type: Number,
                required: false
            },
            reps: {
                type: Number,
                required: false
            },
            sets: {
                type: Number,
                required: false
            }
        }
    ],
    totalDuration: {
        type: Number
    }
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;