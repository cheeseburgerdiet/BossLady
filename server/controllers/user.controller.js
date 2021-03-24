const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.login = login;
async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user === null) {
            return res.status(400).json({msg: "Invalid Login1"}) };
            const correctPassword =  await bcrypt.compare(req.body.password, user.password);
                if(!correctPassword) {
                    return res.status(400).json({msg: "Invalid Login2"})
                }else {
            const userToken = jwt.sign({
                _id: user._id
            }, process.env.JWT_SECRET);
            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ 
                    msg: "success!", 
                    userLogged:{
                        username: `${user.firstName} ${user.   lastName} `, 
                        id: `${user._id}`
                    }});
        }}
        catch(err){ res.status(400).json({msg: "Invalid Login3"})}
};

module.exports.register = register; 
function register(req, res) {
        const user = new User(req.body);
        user.save()
            .then (()=> {
                res.json({ msg: "success!", user: user });
            })
            .catch(err => res.status(400).json(err));
        };


module.exports.logout = logout;
function logout(req,res)  {
        res.clearCookie("usertoken");
        res.json({msg: "usertoken cookie cleared"});
    };

module.exports.loggedIn = loggedIn;
function loggedIn(req, res) {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true});
    User.findById(decodedJWT.payload._id)
    // User.findById({_id: req.params.id})
        .then(user=> res.json({msg: `${user.firstName} ${user.lastName} is logged in`}))
        .catch(err => res.json(err));
};


module.exports.getUser = getUser;
async function getUser(request, response) {
    try {    
        const decodedJWT = jwt.decode(request.cookies.usertoken, { complete: true});
        const user = await User.findById(decodedJWT.payload._id)    
                if(user === null) {
                    return response.status(400).json({msg: "user doesn't exist"}) 
                } else {return response.json(user)}}
            catch(err){ res.status(400).json({msg: "getUser not working"})}
            }

module.exports.getUserHabits = getUserHabits;
async function getUserHabits(request, response) {
    try {    
        const decodedJWT = jwt.decode(request.cookies.usertoken, { complete: true});
        const user = await User.findById(decodedJWT.payload._id)    
                if(user === null) {
                    return response.status(400).json({msg: "user doesn't exist"}) 
                } else {
                    user.populate("Habit").json(response.data)}}
            catch(err){ res.status(400).json({msg: "getUser not working"})}
            }
    // const decodedJWT = jwt.decode(request.cookies.usertoken, { complete: true});
    //     User.findById(decodedJWT.payload._id)
            // .then((oneUser) => {
            //     console.log(`${user.firstName}`)
            //     response.json(oneUser)})
            // .catch((err) =>{
            //     console.log("error in getUser", err)
            //     response.json(err)});

            // };





// module.exports.getAllHabits = getAllHabits;
// function getAllHabits(request , response) {
//     User.find({_id: request.params.id})
//         .populate("Habit")
//         .then((habit) => response.json(habit))
//         .catch(err => console.log("problem with getAllHabits", err))
        

// async function getAllHabits(req,res) {
//     try {let showHabits = await User.findById({_id: req.params.id}).populate("habit");
//         if(showHabits) {res.json(showHabits)}}
//         catch(err) {return console.log("problem with getAllHabits", err)}
// }

