const routes = require('express').Router();

routes.route('/')
    .get((req, res) => {
        // DO your Job ;) 
    });

routes.route('/*')
    .get((req, res) => {
        res.json({ n: 'not found' });
    });

module.exports = routes;