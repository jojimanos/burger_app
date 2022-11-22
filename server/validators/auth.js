const { check } = require('express-validator');

exports.userRegisterValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('address')
        .not()
        .isEmpty()
        .withMessage('Address is required'),
    check('postalCode')
        .not()
        .isEmpty()
        .withMessage('Postal code is required'),
    check('birthDate')
        .not()
        .isEmpty()
        .withMessage('Birth date is required'),
    check('email')
        .isEmail()
        .withMessage('must be a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
]

exports.userLoginValidator = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('email is required'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Birth date is required')
]

exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .withMessage('email is required'),
]

exports.resetPasswordValidator = [
    check('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('resetPasswordLink')
        .not()
        .isEmpty()
        .withMessage('Token is required')
]