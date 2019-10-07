const router = require('express').Router();
const errors = require('../../errors');
const arrangeInput = require('../../middleware/arrange-inputs');
const {User} = require('../../schemas');

/**
 *  @swagger
 *  /api/signup:
 *    post:
 *      tags:
 *        - auth
 *      parameters:
 *        - name: email
 *          default: email@example.com
 *          required: true
 *          in: formData
 *          type: string
 *        - name: password
 *          default: password
 *          required: true
 *          in: formData
 *          type: string
 *        - name: name
 *          default: userName
 *          in: formData
 *          type: string
 *        - name: signup_zip
 *          default: "10016"
 *          in: formData
 *          type: string
 *        - name: telephone
 *          default: "123132123"
 *          in: formData
 *          type: string
 *        - name: reference_promo
 *          default: abcdefg12345
 *          in: formData
 *          type: string
 *      description: create user
 *      responses:
 *        200:
 *          description: user created successfully
 */

router.post('/signup',
    arrangeInput('body', {
        email: {
            type: 'STRING',
            required: true,
            pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/,
        },
        password: {
            type: 'STRING',
            required: true,
            pattern: /\w{5,}/,
        },
    }),
    errors.wrap(async (req, res) => {
        req.body.email = req.body.email.toLowerCase();
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) throw errors.InvalidInputError('User with same email already exists');
        let user = new User(req.body);
        await user.save();
        const token = user.generateToken();
        user = user.toObject();
        delete user._id;
        delete user.password;

        res.json({token, user});
    })
);

module.exports = router;
