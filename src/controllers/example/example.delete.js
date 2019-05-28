const authenticate = require('../../middleware/authenticate');
const errors = require('../../errors');
const router = require('express').Router();
const Example = require('../../schemas/example');

/**
 *  @swagger
 *  /example/{id}:
 *    delete:
 *      tags:
 *        - example
 *      description: delete example
 *      parameters:
 *        - name: id
 *          description: example primary key
 *          in: path
 *          type: string
 *          default: test
 *          required: true
 *      responses:
 *        204:
 *          description: example was deleted
 */

router.delete('/example/:id',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const example = await Example.findById(req.params.id);
        if (!example) throw errors.NotFoundError('Item not found');
        example.remove();
        res.sendStatus(204);
    })
);

module.exports = router;
