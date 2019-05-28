const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const Example = require('../../schemas/example');
/**
 *  @swagger
 *  /example/{uuid}:
 *    get:
 *      tags:
 *        - example
 *      description: get example record
 *      parameters:
 *        - name: id
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        200:
 *          description: example received
 */

router.get('/example/:id',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const task = await Example.find({_id:req.params.id});
        res.json(task);
    })
);

module.exports = router;
