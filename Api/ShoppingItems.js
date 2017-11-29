const routes = require('express').Router();
const Model = require('../lib/Model');


/**
 * Get all the items linked to a list
 * @param {*The list uuid} :id 
 */
routes.route('/:listId/items')
    .get((req, res) => {
        let response;
        const list = Model.getList(req.params.listId, (list) => {
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

/**
 * Return the items from the list
 * Include the new item added (Reference are keeped in Thread context)
 */
routes.route('/create')
    .post((req, res) => {
        response = {};
        const { name, listId } = req.body;

        if (!name || !listId) {
            res.status(400);
            response.error = "Missing parameters";
        } else {
            response.item = Model.addItemToList(listId, name);
            if (!response.item) {
                res.status(404);
                response = { error: "List had not been found" };
            }
        }
        res.json(response);
    });

routes.route('/:id')
    .put((req, res) => {
        let response = Model.getItem(req.params.id);

        if (!response) {
            res.status(404);
            response = { error: 'Item not found' };
        } else {
            res.status(200);
            response.marked = 'ITEM MARKED';
        }

        res.json(response);
    })
    .delete((req, res) => {
        res.status(200);
        res.json(true);
        // DELETE AN ITEM FROM LIST
        // PARAMS = LISTNAME, ITEMUUID
    });

routes.route('/*')
    .get((req, res) => {
        res.json({ n: 'not found' });
    });

module.exports = routes;