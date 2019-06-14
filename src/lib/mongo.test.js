import * as R from 'ramda';

import withCollection from './mongo';
import { __generateClient__, __generateNativeDriver__ } from '../../__mocks__/driver';
import { __EMPTY__, __NIL__ } from '../../__mocks__/support';

const nativeDriver = __generateNativeDriver__();
const client = __generateClient__();

const collectionName = 'test.collection';

describe('withCollection', () => {
    test('is a function', () => {
        expect(withCollection).toBeFunction();
    });
    describe('when called', () => {
        let collection = null;
        beforeAll(async() => {
            collection = await withCollection(client, collectionName);
        });
        test('returns object with expected methods', () => {
            expect(collection).toBeObject();
        });
        describe('class methods', () => {
            describe.each(R.keys(nativeDriver))('%p', method => {
                test('is a function', () => {
                    expect(collection).toHaveProperty(method, expect.any(Function));
                });
                test('calls native method with expected parameters', async() => {
                    const payload = Symbol(`collection.${method}.payload`);
                    const props = { payload };
                    await collection[method](props);
                    expect(R.prop(method, nativeDriver)).toHaveBeenCalledWith({ payload });
                });
            });
        });
        describe('throws expected assertion errors', () => {
            describe('when client', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('when client is %p', __client__ => {
                        expect(() => withCollection(__client__, null)).toThrow(/client cannot be empty or nil/);
                    });
                });
                describe('is not object', () => {
                    test.each([true, false, 12.34, 'test-wexsrctvybunimop,'])('when client is %p', __client__ => {
                        expect(() => withCollection(__client__, null)).toThrow(/client must be object/);
                    });
                });
                describe('does not have property `collection`', () => {
                    expect(() => withCollection({ foo: 'bar' }, null)).toThrow(/client must have property `collection`/);
                });
                describe('*.collection is not a function', () => {
                    test.each([true, false, 12.34, 'test-wexsrctvybunimop,', Symbol('test-ioukjyhtgrfed')])('client.collection=%p', __collection__ => {
                        expect(() => withCollection({ collection: __collection__ }, null)).toThrow(/`client.collection` must be function/);
                    });
                });
            });
        });
    });
});
