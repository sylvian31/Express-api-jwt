const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
})

UserSchema.methods.isPasswordEqualTo = function (externalPassword, done) {
    bcrypt.compare(externalPassword, this.password, function (err, isMatch) {
        if (err) {
            done(err);
        }
        done(null, isMatch);
    })
}

const User = mongoose.model('user', UserSchema);

module.exports = User;

