import withCollection from '../lib/mongo';
import withTimestamps from './timestamps';
import { __MONGO_CLIENT__, __MONGO_DRIVER__, __REF__, MongoCollection } from '../../__mocks__/driver';
import * as R from 'ramda';

describe('withTimestamps', () => {
    test('is a function', () => {
        expect(withTimestamps).toBeFunction();
    });
    describe('when called', () => {
        const factory = withTimestamps(withCollection);
        test('returns a function', () => {
            expect(factory).toBeFunction();
        });
        describe('when called', () => {
            let collection = null;
            beforeAll(async() => {
                collection = await factory(__MONGO_CLIENT__, 'test.collection');
            });
            test('returns a Mongo collection', () => {
                expect(collection).toBeInstanceOf(MongoCollection);
            });
            describe('collection', () => {
                test('is a MongoCollection', () => {
                    expect(collection).toBeInstanceOf(MongoCollection);
                });
                describe('extends native collection', () => {
                    describe.each(R.keys(__MONGO_DRIVER__))('%p', method => {
                        test('is a function', () => {
                            expect(collection[method]).toBeFunction();
                        });
                        test('has correct binding reference', async() => {
                            const { ref } = await collection[method]();
                            expect(ref).toBeFunction();
                            expect(ref()).toBe(__REF__);
                        });
                    });
                });
            });
        });
    });
});
