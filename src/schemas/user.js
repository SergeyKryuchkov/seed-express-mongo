const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const _ = require('lodash');
const errors = require('../errors');

const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    email: String,
    validated_email: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        select: false,
        set: hashPassword,
    },
});

/**
 * Generate Authentication Token for user
 * @return {{type: string, expiresIn: *, accessToken: *}}
 */
UserSchema.methods.generateToken = function () {
    const salt = process.env.SALT || 'salt';
    const data = {
        userId: this._id,
    };
    const tokenLifeTime = process.env.TOKEN_LIFE_TIME || 600000;
    return {
        type: 'Bearer',
        expiresIn: tokenLifeTime,
        accessToken: jwt.sign(data, salt, {expiresIn: tokenLifeTime}),
    };
};

/**
 * @param {string} password
 * @return {any} hash
 */
UserSchema.statics.hashPassword = (password) => {
    return hashPassword(password);
};

/**
 * @param {string} email
 * @param {string} password
 * @return {object} user
 */
UserSchema.statics.authenticate = async function (email, password) {
    const user = await this.findOne({email}, [...this.publicAttributes(), 'password']);
    if (!user) throw errors.NotFoundError('User not found!');
    if (!user.password) throw errors.NotAllowedError('Password not set! Please contact support.');
    if (user.password !== this.hashPassword(password)) throw errors.UnauthorizedError('Invalid credentials');
    return user;
};

UserSchema.statics.publicAttributes = function () {
    return [..._.without(_.keys(UserSchema.paths), '__v', 'password', 'createdAt', 'updatedAt')];
};

function hashPassword(password) {
    return crypto
        .createHmac('sha512', process.env.SALT || 'salt')
        .update(password)
        .digest('hex');
};

module.exports = mongoose.model('User', UserSchema);

