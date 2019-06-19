import moment from 'moment';
import { keys } from 'ramda';
import { withTimestamps } from './timestamps';
import {
    __MONGO_COLLECTION_FACTORY__,
    __MONGO_DRIVER__,
    __REF__,
} from '../../__mocks__/driver';
import withCollection from '../lib/mongo';

const collectionName = 'test.collection.erxtcyvucxtfcygtuvhibuu234756789';

describe('withTimestamps', () => {
    test('is a function', () => {
        expect(withTimestamps).toBeFunction();
    });

    describe('when called', () => {
        let collectionWithTimestamps = null;
        beforeAll(async() => {
            const collection = await withCollection(__MONGO_COLLECTION_FACTORY__, collectionName);
            collectionWithTimestamps = withTimestamps(collection);
        });
        describe('collection', () => {
            describe('extends native collection', () => {
                describe.each(keys(__MONGO_DRIVER__))('%p', method => {
                    test('is a function', () => {
                        expect(collectionWithTimestamps[method]).toBeFunction();
                    });
                    test('has correct binding reference', async() => {
                        const { ref } = await collectionWithTimestamps[method]();
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
                await collectionWithTimestamps.insertOne(props);
                expect(__MONGO_DRIVER__.insertOne).toHaveBeenCalledWith({ createdAt, payload });
            });
        });
        describe('updateOne', () => {
            test('injects updatedAt field', async() => {
                const updatedAt = expect.any(moment);
                const payload = Symbol('collection.insertOne.payload');
                const props = { payload };
                await collectionWithTimestamps.updateOne(props);
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
                    await collectionWithTimestamps.insertOne(payload);
                } catch (err) {
                    expect(err).toBe(expectedErr);
                }
            });
        });
    });
});
