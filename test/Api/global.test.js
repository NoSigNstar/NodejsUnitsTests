const assert = require('assert');
const request = require('supertest');

describe('global route', function () {
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

    it('should return 404 when accessing to root API', (done) => {
        request(server)
            .get('/')
            .expect(404, done);
    });

});
