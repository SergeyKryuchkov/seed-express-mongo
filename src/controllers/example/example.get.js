const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const Example = require('../../models/example');
/**
 *  @swagger
 *  /example/{uuid}:
 *    get:
 *      tags:
 *        - example
 *      description: get example record
 *      parameters:
 *        - name: uuid
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        200:
 *          description: example received
 */

router.get('/example/:uuid',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const id = req.params.id;
        const task = await Task.find({_id:id});
        res.json(task);
    })
);

module.exports = router;
