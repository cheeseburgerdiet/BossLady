const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name required"],
            minLength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            required: [true, "Last name required"],
            minLength: [3, "Last name must be atleast 3 characters long!"]
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Email is required"],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            minLength: [8, "Password must be at least 8 characters long"] 
        },
        habit: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Habit"
        }]
    }, 
    {timestamps : true, collection : 'users'}
);

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
    });

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
        this.password = hash;
        next();
        });
});


const User = mongoose.model('User', UserSchema);
module.exports = User;