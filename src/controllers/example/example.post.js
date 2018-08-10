const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
const Example = require('../../models/example');
/**
 *  @swagger
 *  /example:
 *    post:
 *      tags:
 *        - example
 *      description: save report
 *      parameters:
 *        - name: value
 *          default: value
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: return saved report object
 */

router.post('/example',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const example = await Example(req.body).save();
        res.json(example);
    })
);

module.exports = router;
