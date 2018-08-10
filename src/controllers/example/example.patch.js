const router = require('express').Router();
const errors = require('../../errors');
const authenticate = require('../../middleware/authenticate');
/**
 *  @swagger
 *  /v1/example:
 *    patch:
 *      tags:
 *        - example
 *      description: save report
 *      parameters:
 *        - name: name
 *          default: ReportName
 *          required: true
 *          in: formData
 *          type: string
 *      responses:
 *        200:
 *          description: return saved report object
 */

router.patch('/example',
    // authenticate(),
    errors.wrap(async (req, res) => {
        const example = req.body;
        res.json(example);
    })
);

module.exports = router;
