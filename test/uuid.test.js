var assert = require('assert');
var uuid = require('./../classes')

describe('Generate UUID', function () {
    const id = uuid.generate();
    console.log(id)
    it('Should return string.lenght(36)', function () {
        id.string;
    });
});
