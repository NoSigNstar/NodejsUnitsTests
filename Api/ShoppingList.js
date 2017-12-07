const routes = require('express').Router();
const Model = require('../lib/Model');

routes.route('/create')
.post((req, res) => {
    // DO your Job ;)
    let response;
    if (!req.body.uuid || !req.body.listName){
    
        return res.status(404).json({error: 'Missing parametors'})
    }
    const create = Model.addList(req.body.uuid, req.body.listName);
     if (!create){
        response = { error: "Missing command"}
        res.status(404);
     }else{
         res.status(200)
         response = create;
     }
     res.json(response);

});

routes.route('/:listId/delete')
    .delete((req, res) => {
        let responce;
        console.log("fdzze");
        if (!req.body.uuid){
            
                return res.status(404).json({error: 'Missing parametors'})
            };
            const deleteList = Model.deleteList(uuid);

            if(!listId){
                response = { error: "Missing command"}
                res.status(404);
            }else{
                res.status(200);
                responce = deleteList;
            }
    });

routes.route('/list')
    .get((req, res) => {
        let response;
        const list = Model.getList();

        if (!list) {
            response = { error: "The list wasn't found" }
            res.status(404);
        } else {
            res.status(200);
            response = list;
        }
        res.json(response);

    });

routes.route('/*')
    .get((req, res) => {
        res.json({ n: 'not found' });
    });

module.exports = routes;