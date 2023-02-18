const {body} = require('express-validator/check');
const User = require('../models/user');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Enter correct email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    return Promise.reject('Email is used');
                }
            } catch (err) {
                console.log(err);
            }
        })
        .normalizeEmail(),
    body('password', 'Password is bad')
        .isLength({min: 6, max: 56})
        .isAlphanumeric().trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Confirm is bad');
            }
            return true;
        })
        .trim(),
    body('name')
        .isLength({min: 3})
        .withMessage('Name is bad')
        .trim()
];

exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Minimal length 3 symbols').trim(),
    body('price').isNumeric().withMessage('Enter correct price'),
    body('img', 'Enter correct image url').isURL()
];