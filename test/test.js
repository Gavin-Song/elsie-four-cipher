'use strict';

const cipher = require('../src/index.js');
const expect = require('chai').expect;

/* Examples for unit tests taken from
 * https://www.reddit.com/r/dailyprogrammer_ideas/comments/8it3dq/intermediate_elsiefour_lowtech_cipher/ */

describe('cipher.encrypt()', function () {
    it('Should properly encrypt the following string', function () {
        let payload = ['#o2zqijbkcw8hudm94g5fnprxla7t6_yse3v', 'be_sure_to_drink_your_ovaltine'];
        let expected = 'b66rfjmlpmfh9vtzu53nwf5e7ixjnp';

        let value = cipher.encrypt(payload[0], payload[1]);

        expect(value).to.be.equal(expected);
    });
});

describe('cipher.encrypt()', function () {
    it('Should properly encrypt the following string', function () {
        let payload = ['s2ferw_nx346ty5odiupq#lmz8ajhgcvk79b', 'aaaaaaaaaaaaaaaaaaaa'];
        let expected = 'tk5j23tq94_gw9c#lhzs';

        let value = cipher.encrypt(payload[0], payload[1]);

        expect(value).to.be.equal(expected);
    });
});

describe('cipher.decrypt()', function () {
    it('Should properly decrypt the following string', function () {
        let payload = ['s2ferw_nx346ty5odiupq#lmz8ajhgcvk79b', 'tk5j23tq94_gw9c#lhzs'];
        let expected = 'aaaaaaaaaaaaaaaaaaaa';

        let value = cipher.decrypt(payload[0], payload[1]);

        expect(value).to.be.equal(expected);
    });
});

describe('cipher.decrypt()', function () {
    it('Should properly decrypt the following string', function () {
        let payload = ['#o2zqijbkcw8hudm94g5fnprxla7t6_yse3v', 'b66rfjmlpmfh9vtzu53nwf5e7ixjnp'];
        let expected = 'be_sure_to_drink_your_ovaltine';

        let value = cipher.decrypt(payload[0], payload[1]);

        expect(value).to.be.equal(expected);
    });
});
