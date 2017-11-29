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
        it('should return all items element when list given', (done) => {
            request(server)
                .post('/item/create')
                .set('Accept', 'application/json')
                .send({ name: 'item1', listId: 'list1' })
                .expect('content-type', 'application/json; charset=utf-8')
                .expect(200, done);
        });

        it('should return 404 status when list doesn\'t exist', (done) => {
            request(server)
                .post('/item/create')
                .set('Accept', 'application/json')
                .send({ name: 'item1', listId: 'li5st1' })
                .expect('content-type', 'application/json; charset=utf-8')
                .expect(404, done);
        });

        it('should return 400 status when no params given', (done) => {
            request(server)
                .post('/item/create')
                .set('Accept', 'application/json')
                .expect('content-type', 'application/json; charset=utf-8')
                .expect(400, done);
        });
    });

    describe('PUT requests', function () {
        it('should return 404 status when Item doesn\'t exist', (done) => {
            request(server)
                .put('/item/654567897')
                .set('Accept', 'application/json')
                .expect('content-type', 'application/json; charset=utf-8')
                .expect(404, done);
        });

        it('should return 200 status when Item has been marked', (done) => {
            request(server)
                .put('/item/5a18240ac2fb105ea9d9e698')
                .set('Accept', 'application/json')
                .expect('content-type', 'application/json; charset=utf-8')
                .expect(200, done);
        });
    });

});
