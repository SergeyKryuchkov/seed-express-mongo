const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
    swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
};

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        explorer: false,
        info: {
            title: require('../package.json').name.toUpperCase(),
            version: require('../package.json').version,
            description: '# Introduction' +
            '\n## Getting Started' +
            '\nThe ChatCircle API is organized around REST. All calls to the ChatCircle API should be made to ' +
            'https://chat-circle-dev.herokuapp.com/). All responses are formatted in JSON.'
        },
        produces: ['application/json'],
        // consumes: ['application/json'],
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        security: [
            { jwt: [] }
        ]
    },
    apis: ['./src/controllers/**/*.js'],
});

module.exports = (app) => {
    app.get('/api-docs.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
};
