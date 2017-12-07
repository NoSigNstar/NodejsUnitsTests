const assert = require('assert');
const request = require('supertest');


describe('ShoppingList', function () {
    let serverPath = '../../server';
    let server;

        beforeEach(() => {
            // free up memory from previous cached server
            delete require.cache[require.resolve(serverPath)];
            server = require(serverPath);
        });

        afterEach((done) => {
            server.close(done);
        });

                describe('Create List', function() {
                    it('should create a List', (done) => {
                        request(server)
                            .post('/list/create')
                            .send({ listName: 'Liste1', uuid: 'fdjhbjzhbz'})
                            .expect('content-type', 'application/json; charset=utf-8')
                            .expect(200, done);
                    });
        
                    it('should return 404 status when Route is bad', (done) => {
                        request(server)
                            .post('/list/create')
                            .expect('content-type', 'application/json; charset=utf-8')
                            .expect(404, done);
                    });

                })

                describe('Delete List', function(){
                    it('should delete a list', (done) => {
                        request(server)
                            .delete('/list/list1/delete')
                            .send({uuid: 'efzefzefze'})
                            .expect(200, done);
                    });
                    it('should return 404 status when list doesn\'t exist', (done) => {
                        request(server)
                            .delete('list/1')
                            .expect(404, done);
                    });
                });

                describe('Get list', function(){
                    it('should return list', (done) => {
                        request(server)
                            .get('list')
                            .expect(200, done);
                    });
                    it('should return 404 status when list doesn\'t exist', (done) => {
                        request(server)
                            .get('listgh/')
                            .expect(404, done);
                    });
                });

});