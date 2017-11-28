const routes = require('express').Router();
const Model = require('../lib/Model');


/**
 * Get all the items linked to a list
 * @param {*The list uuid} :id 
 */
routes.route('/:id/items')
    .get((req, res) => {
        let response;
        const list = Model.getList(req.params.id, (list) => {
            list.updated_at = new Date(); // Dummy modifications
        });

        if (!list) {
            response = { error: "The list wasn't found" }
            res.status(404);
        } else {
            res.status(200);
            response = list;
        }

        res.json(response);
    });

routes.route(':id')
    .post((req, res) => {
        // CREATE ELEMENT FROM NAME AND INSERT IN LIST
        // PARAMS = NAME , LISTNAME
    })
    .put((req, res) => {
        // MARK AN ITEM AS CHECKED
        // PARAMS ITEMUUID
    })
    .delete((req, res) => {
        // DELETE AN ITEM FROM LIST
        // PARAMS = LISTNAME, ITEMUUID
    });

routes.route('/*')
    .get((req, res) => {
        res.json({ n: 'not found' });
    });

module.exports = routes;