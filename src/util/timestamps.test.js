import moment from 'moment';
import { keys } from 'ramda';
import withCollection from '../lib/mongo';
import { withTimestamps } from './timestamps';
import {
    MongoCollection,
    __MONGO_CLIENT__,
    __MONGO_DRIVER__,
    __REF__,
} from '../../__mocks__/driver';

describe('withTimestamps', () => {
    test('is a function', () => {
        expect(withTimestamps).toBeFunction();
    });
    describe('factory', () => {
        const factory = withTimestamps(withCollection);
        test('is a function', () => {
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
                    describe.each(keys(__MONGO_DRIVER__))('%p', method => {
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
            describe('insertOne', () => {
                test('injects createdAt field', async() => {
                    const createdAt = expect.any(moment);
                    const payload = Symbol('collection.insertOne.payload');
                    const props = { payload };
                    await collection.insertOne(props);
                    expect(__MONGO_DRIVER__.insertOne).toHaveBeenCalledWith({ createdAt, payload });
                });
            });
            describe('updateOne', () => {
                test('injects updatedAt field', async() => {
                    const updatedAt = expect.any(moment);
                    const payload = Symbol('collection.insertOne.payload');
                    const props = { payload };
                    await collection.updateOne(props);
                    expect(__MONGO_DRIVER__.updateOne).toHaveBeenCalledWith({ updatedAt, payload });
                });
            });
            describe('bubbles expected error', () => {
                test('on rejected native driver call', async() => {
                    expect.assertions(1);
                    const payload = 'exrtcyvubinomp,[.';
                    const expectedErr = new Error('qawsedrftgyuiokyutjre');
                    __MONGO_DRIVER__.insertOne.mockRejectedValueOnce(expectedErr);
                    try {
                        await collection.insertOne(payload);
                    } catch (err) {
                        expect(err).toBe(expectedErr);
                    }
                });
            });
        });
    });
});
