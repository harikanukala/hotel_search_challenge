const assert = require('chai').assert;
const hotels = require('../routes/hotels');


const data = [[{hotel_id:1,ecstasy:794}],[{hotel_id:2,ecstasy:300}],
    [{hotel_id:3,ecstasy:590}],[{hotel_id:4,ecstasy:454}]]

describe('combine results', function() {

    it('can merge and sort input ', function() {
        const sortedResults = hotels.combineResults(data);
        assert.equal(sortedResults.length, 4);
        assert.equal(sortedResults[0].hotel_id, '1');
        assert.equal(sortedResults[3].ecstasy, '300');
    });
});