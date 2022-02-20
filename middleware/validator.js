// https://express-validator.github.io/docs/
const { body, check, oneOf, checkSchema, validationResult } = require('express-validator');

const ValidateRegisterUser = [
    check('username')
        .trim()
        .isLength({ min: 5, max: 32 })
        .isAlphanumeric(),
    check('name').optional()
        .trim()
        .isLength({ min: 5, max: 32 })
        .isAlpha('en-US', { ignore: " " }),
    check('email')
        .trim()
        .isLength({ min: 5, max: 32 })
        .isEmail()
        .normalizeEmail({
            all_lowercase: true
        }),
    check('password')
        .trim()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10
        }),
    check('role').optional()
        .isAlpha('en-US', null),
]

const ValidateUpdateProfile = [
    check('name').optional()
        .trim()
        .isLength({ min: 2, max: 254 })
        .isAlpha('en-US', { ignore: " " }),
    check('address').optional()
        .trim()
        .isLength({ min: 2, max: 254 })
        .isAlphanumeric('en-US', { ignore: " ." }),
    check('profilephoto').optional()
        .trim()
        .isLength({ min: 2, max: 254 })
        .isAlphanumeric('en-US'),
    check('coverphoto').optional()
        .trim()
        .isLength({ min: 2, max: 254 })
        .isAlphanumeric('en-US'),
]

const ValidateInputCreateAlbum = [
    // console.log('check create album');
    check('title')
        .trim()
        .escape()
        .exists()
        .isLength({ min: 3, max: 32 })
        .withMessage("must be between 3 and 32 characters")
        .matches(/^[A-Za-z0-9 .,'!&?]+$/)
        .withMessage('only alphanumeric are allowed')

]


const CheckValidatorResult = (async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw errors.array()
        }
        next()
    } catch (err) {
        next(err)
    }
})

module.exports = {
    ValidateInputCreateAlbum,
    CheckValidatorResult
}