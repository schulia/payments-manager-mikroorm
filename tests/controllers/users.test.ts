import { calculateUserBalance } from '../../src/controllers/users.js';
import { v4 as uuidv4 } from 'uuid';
import { expect } from 'chai';

describe('User Controller', () => {
    it('should calculate user balance correctly', () => {
        const userId = uuidv4();
        const response = calculateUserBalance(userId);

        expect(response).to.equal(10); // values are hardcoded so will always be this
    });

    it('should pass a basic assertion test', () => {
        const testValue = 42;
        expect(testValue).to.equal(42);
        expect(true).to.be.true;
        expect('hello').to.be.a('string');
    });
});
