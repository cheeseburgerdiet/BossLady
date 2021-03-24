const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        water: {
            type: Number,
        },
        meal: {
            type: Number,
        },

        mealType: {
            type: String
        },

        exercise: {
            type: String,
        },

        goal1: {
            type: String,
        },

        goal2: {
            type: String,
        },

        goal3: {
            type: String,
        },

        rating: {
            type: Number,
            min: 0,
            max: 5
        },

        note: {
            type: String
        }
    }, {timestamps:true});

    const Habit = mongoose.model('Habit', HabitSchema);
    module.exports = Habit;
