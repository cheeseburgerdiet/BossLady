const Habit = require("../models/habit.model");
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');



module.exports.viewOneHabit = viewOneHabit;
function viewOneHabit(request, response){
    Habit.findById(request.params._id)
        .then((response) => {
            console.log(response)
            response.json(response)})
        .catch((err)=> {
            console.log("error in OneHabit", err);
            response.json(err)})
};
module.exports.sortHabitsbyUser= sortHabitByUser;
function sortHabitByUser(request, response) {
    Habit.find({}).sort({user: "ascending"})
    .then((sortedHabits)=> {
        console.log(sortedHabits)
        response.json(sortedHabits)})
    .catch((err)=> {
        console.log("error in sortedHabits", err);
        response.json(err)})
};

module.exports.viewHabits = viewHabits; 
function viewHabits(request, response) {
    Habit.find({})
    .sort({createdAt: "descending"})
    .then(habits => response.json(habits))
    .catch(err => {
        console.log("error in viewHabits", err);
        response.json(err);
    })
};

module.exports.create = create;
async function create(req, res) {
        try{
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true});
        const user = await User.findById(decodedJWT.payload._id);
            if(user === null) {return res.status(400).json({msg: "user doesn't exist"}) 
        } else {
        const newHabit = await new Habit(req.body);
            newHabit.save()
        // console.log(newHabit)
        //     user.habits.push({habit : newHabit})
        //             .save()
            return res.json({ msg: "success!", habbit: newHabit })
        }}
        catch(err){res.status(400).json(err)};
        };

module.exports.update = update;
function update(req,res) {
    Habit.findByIdAndUpdate(req.params.id, req.body, {new : true})
        .then (res => res.json(res))
        .catch(err => console.log(err))
};

module.exports.deleteHabit = deleteHabit;
function deleteHabit(req, res){
        Habit.findByIdAndDelete(req.params.id)
            .then(res => console.log("success!"))
            .catch(err => console.log("could not delete", err))
    };


