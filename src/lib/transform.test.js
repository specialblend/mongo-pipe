import * as R from 'ramda';

import withCollection from './mongo';
import transform from './transform';
import { __EMPTY__, __NIL__ } from '../../__mocks__/support';
import {
    __MONGO_CLIENT__,
    __MONGO_CLIENT_ERR__,
    __MONGO_DRIVER__,
    __REF__,
    MongoCollection,
} from '../../__mocks__/driver';

const collectionName = 'test.collection';

describe('transformed factory', () => {
    const id = 'test.id.awsercdtvybunimop';
    const generateId = R.always(id);
    const setId = R.set(R.lensProp('id'));
    const injectId = props => setId(generateId(), props);

    const withUniqueID = transform({
        insertOne: handler => R.pipe(injectId, handler),
    }, withCollection);

    test('is a function', () => {
        expect(withUniqueID).toBeFunction();
    });

    describe('when called', () => {
        let collection = null;
        beforeAll(async() => {
            collection = await withUniqueID(__MONGO_CLIENT__, collectionName);
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
        describe('insertOne', () => {
            test('calls native insertOne with expected parameters', async() => {
                const payload = Symbol('collection.insertOne.payload');
                const props = { payload };
                await collection.insertOne(props);
                expect(__MONGO_DRIVER__.insertOne).toHaveBeenCalledWith({ id, payload });
            });
        });
        describe('throws expected assertion error', () => {
            describe('when target', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('when target is %p', target => {
                        expect(() => transform(null, target)).toThrow(/`target` cannot be empty or nil/);
                    });
                });
                describe('is not a function', () => {
                    test.each([true, false, 12.34, 'test-wexsrctvybunimop,', Symbol('test-ioukjyhtgrfed')])('target=%p', target => {
                        expect(() => transform(null, target)).toThrow(/`target` must be function/);
                    });
                });
            });
            describe('when transformerSpec', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('transformerSpec=%p', transformerSpec => {
                        expect(() => transform(transformerSpec, () => {})).toThrow(/`transformerSpec` cannot be empty or nil/);
                    });
                });
                describe('is not an object', () => {
                    test.each([true, false, 12.34, 'test-awsetgyuko,', Symbol('test-ioukjyhtgrfed'), () => {}])('transformerSpec=%p', transformerSpec => {
                        expect(() => transform(transformerSpec, () => {})).toThrow(/`transformerSpec` must be object/);
                    });
                });
            });
        });
        describe('bubbles expected error', () => {
            test('on rejected client.collection', async() => {
                expect.assertions(1);
                __MONGO_CLIENT__.collection.mockRejectedValueOnce(__MONGO_CLIENT_ERR__);
                try {
                    await withUniqueID(__MONGO_CLIENT__, '__test_collection_qawsedrftgyhujikolp__');
                } catch (err) {
                    expect(err).toBe(__MONGO_CLIENT_ERR__);
                }
            });
            test('on rejected native driver call', async() => {
                expect.assertions(1);
                const payload = 'exrtcyvubinomp,[.';
                const expectedErr = new Error('lioukyjnhtbgrvefc');
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
