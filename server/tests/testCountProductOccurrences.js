import { assert } from 'chai';
import { countProductOccurrences } from '../controllers/userController.mjs';
describe('countProductOccurrences', () => {
    it('should return an empty object for an empty cart', () => {
        const cart = [];
        const expected = {};
        const actual = countProductOccurrences(cart);
        assert.deepEqual(actual, expected);
    });

    // Add more test cases here
    it('should return correct counts for a cart with one product', () => {
        const cart = ['6622d78e4a8dc162b979fc63'];
        const expected = { '6622d78e4a8dc162b979fc63': 1 };
        const actual = countProductOccurrences(cart);
        assert.deepEqual(actual, expected);
    });

    it('should return correct counts for a cart with multiple instances of one product and one different product', () => {
        const cart = ['6622d78e4a8dc162b979fc63', '6622d78e4a8dc162b979fc63', '6622d78e4a8dc162b979fc61'];
        const expected = { '6622d78e4a8dc162b979fc63': 2, '6622d78e4a8dc162b979fc61': 1 };
        const actual = countProductOccurrences(cart);
        assert.deepEqual(actual, expected);
    });
});
