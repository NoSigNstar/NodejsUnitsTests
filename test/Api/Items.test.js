const assert = require('assert');
const request = require('supertest');

describe('ShoppingItems', function () {
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

    describe('Get requests', function () {
        describe('Body assertions', function () {
            it('should return the list&items when asking for items in list', (done) => {
                request(server)
                    .get('/item/list1/items')
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(200)
                    .end((error, response) => {
                        if (error) return done(new Error(error));

                        assert.ok(response.body);
                        assert.ok('items' in response.body);
                        assert.equal(4, response.body.items.length);
                        assert.equal('5a18240ac2fb105ea9d9e698', response.body.items[0]._id);
                        done();
                    });
            });
        });

        describe('Status from request', function () {
            it('should return all items element when list given', (done) => {
                request(server)
                    .post('/item/create')
                    .send({ name: 'item1', listId: 'list1' })
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(200, done);
            });

            it('should return 404 status when list doesn\'t exist', (done) => {
                request(server)
                    .post('/item/create')
                    .send({ name: 'item1', listId: 'li5st1' })
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(404, done);
            });

            it('should return 400 status when no params given', (done) => {
                request(server)
                    .post('/item/create')
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(400, done);
            });

            it('should return 404 status when asking for a non existing list', (done) => {
                request(server)
                    .get('/item/list1_dummy/items')
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(404, done);
            });

            it('should return 200 status when asking for a list', (done) => {
                request(server)
                    .get('/item/list1/items')
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(200, done);
            });
        });
    });

    describe('PUT requests', function () {

        describe('Body assertions', function () {
            it('should return marked object when items has been found', (done) => {
                request(server)
                    .put('/item/5a18240ac2fb105ea9d9e698')
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(200)
                    .end((error, response) => {
                        if (error) return done(new Error(error));

                        assert.ok(response.body);
                        assert.ok('marked' in response.body);
                        assert.equal('ITEM MARKED', response.body.marked);
                        done();
                    });
            });
        });

        describe('Status from request', function () {
            it('should return 404 status when Item doesn\'t exist', (done) => {
                request(server)
                    .put('/item/654567897')
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(404, done);
            });

            it('should return 200 status when Item has been marked', (done) => {
                request(server)
                    .put('/item/5a18240ac2fb105ea9d9e698')
                    .expect('content-type', 'application/json; charset=utf-8')
                    .expect(200, done);
            });
        });
    });

    describe('DELETE Requests', function () {

        describe('Body assertions', function () {
            it('should return the item deleted when deletion has been processed', (done) => {
                request(server)
                    .delete('/item/5a18240ac2fb105ea9d9e698')
                    .expect(200)
                    .end((error, response) => {
                        if (error) return done(new Error(error));

                        assert.ok(response.body);
                        assert.equal('5a18240ac2fb105ea9d9e698', response.body._id);
                        done();
                    });
            });

            it('should return error formatted when the deletion has not been operated', (done) => {
                request(server)
                    .delete('/item/dummy_id')
                    .expect(404)
                    .end((error, response) => {
                        if (error) return done(new Error(error));

                        assert.ok(response.body);
                        assert.ok('error' in response.body);
                        done();
                    });
            });
        });

        describe('Status from request', function () {
            it('should return 404 not found when element hasn\'t been found', (done) => {
                request(server)
                    .delete('/item/dummy_fake_key')
                    .expect(404, done);
            });

            it('should return 200 when element has been found and deleted', (done) => {
                request(server)
                    .delete('/item/5a18240ac2fb105ea9d9e698')
                    .expect(200, done)
            });
        });
    });

    describe('Wrong Api routes', function () {
        it('should return 404 not found when get wrong path', (done) => {
            request(server)
                .get('/item/qqsmdlkqsdmlkqsdmlqkdmlqkd')
                .expect(404, done);
        });
        it('should return 404 not found when post wrong path', (done) => {
            request(server)
                .post('/item/qqsmdlkqsdmlkqsdmlqkdmlqkd')
                .expect(404, done);
        });
        it('should return 404 not found when put wrong path', (done) => {
            request(server)
                .put('/item/qqsmdlkqsdmlkqsdmlqkdmlqkd')
                .expect(404, done);
        });
        it('should return 404 not found when delete wrong path', (done) => {
            request(server)
                .delete('/item/qqsmdlkqsdmlkqsdmlqkdmlqkd')
                .expect(404, done);
        });
    });

});
