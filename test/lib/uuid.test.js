const assert = require('assert');
const uuidGenerator = require('./../../lib/uuidGenerator');

describe('UUID', function () {
    let uuid;

    /**
     * Mocha Callback functions
     */
    beforeEach(function() {
        uuid = uuidGenerator.generate();
    });

    afterEach(function() {
        uuid = uuidGenerator.generate();
    });

    describe('Formating', function () {
        it('Should return string.lenght(36)', function () {
    
            assert.ok(uuid);
            assert.equal(36, uuid.length);
        });
    
        it('Should not contains x char', function () {
    
            assert.ok(uuid);
            assert.equal(-1, uuid.indexOf('x'));
        });
    
        it('Should not contains y char', function () {
    
            assert.ok(uuid);
            assert.equal(-1, uuid.indexOf('y'));
        });
    });

    describe('Unicity', function () { 
        it('Should not contains same UUID when 100 try', function () {
            const uuidHistoric = [];
            const iteration = 100;

            for (let i = 0; i < iteration; i++) {
                if (uuidHistoric.indexOf(uuid) != -1) {
                    break;
                }
                uuidHistoric.push(uuid);
                uuid = uuidGenerator.generate();
            }

            assert.ok(uuidHistoric);
            assert.equal(iteration, uuidHistoric.length);
        });
    });
});
