import * as R from 'ramda';

import withCollection from './mongo';
import transform from './transform';
import { __EMPTY__, __NIL__ } from '../../__mocks__/support';
import { __MONGO_CLIENT__, __MONGO_DRIVER__, __REF__ } from '../../__mocks__/driver';

const driver = __MONGO_DRIVER__;
const client = __MONGO_CLIENT__;

const collectionName = 'test.collection';

describe('transformed collection', () => {
    const id = 'test.id.awsercdtvybunimop';
    const generateId = R.always(id);
    const setId = R.set(R.lensProp('id'));
    const injectId = R.converge(setId, [generateId, R.identity]);

    const withUniqueID = transform(withCollection, {
        insertOne: handler => R.pipe(injectId, handler),
    });

    test('is a function', () => {
        expect(withUniqueID).toBeFunction();
    });

    describe('when called', () => {
        let collection = null;
        beforeAll(async() => {
            collection = await withUniqueID(client, collectionName);
        });
        test('returns object with expected methods', () => {
            expect(collection).toBeObject();
        });
        describe('class methods', () => {
            describe.each(R.keys(driver))('%p', method => {
                test('is a function', () => {
                    expect(collection[method]).toBeFunction();
                });
                test('has correct binding reference', async() => {
                    const { ref } = await collection[method]();
                    expect(ref).toBeFunction();
                    expect(ref()).toBe(__REF__);
                });
            });
            describe('insertOne', () => {
                test('calls native insertOne with expected parameters', async() => {
                    const payload = Symbol('collection.insertOne.payload');
                    const props = { payload };
                    await collection.insertOne(props);
                    expect(driver.insertOne).toHaveBeenCalledWith({ id, payload });
                });
            });
        });
        describe('throws expected assertion error', () => {
            describe('when target', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('when target is %p', target => {
                        expect(() => transform(target, null)).toThrow(/`target` cannot be empty or nil/);
                    });
                });
                describe('is not a function', () => {
                    test.each([true, false, 12.34, 'test-wexsrctvybunimop,', Symbol('test-ioukjyhtgrfed')])('target=%p', target => {
                        expect(() => transform(target, null)).toThrow(/`target` must be function/);
                    });
                });
            });
            describe('when transformerSpec', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('transformerSpec=%p', transformerSpec => {
                        expect(() => transform(() => {}, transformerSpec)).toThrow(/`transformerSpec` cannot be empty or nil/);
                    });
                });
                describe('is not an object', () => {
                    test.each([true, false, 12.34, 'test-awsetgyuko,', Symbol('test-ioukjyhtgrfed'), () => {}])('transformerSpec=%p', transformerSpec => {
                        expect(() => transform(() => {}, transformerSpec)).toThrow(/`transformerSpec` must be object/);
                    });
                });
            });
        });
    });
});
