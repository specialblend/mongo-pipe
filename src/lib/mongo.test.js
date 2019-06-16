import { keys, prop } from 'ramda';

import withCollection, { connect } from './mongo';
import { __EMPTY__, __NIL__ } from '../../__mocks__/support';
import { __MONGO_CLIENT__, __MONGO_DRIVER__, __MONGO_CLIENT_ERR__ } from '../../__mocks__/driver';

const collectionName = 'test.collection.uikjmynhtbgrfdves';

describe('connect', () => {
    test('is a function', () => {
        expect(connect).toBeFunction();
    });
});

describe('withCollection', () => {
    test('is a function', () => {
        expect(withCollection).toBeFunction();
    });
    describe('when called', () => {
        let collection = null;
        beforeAll(async() => {
            collection = await withCollection(__MONGO_CLIENT__, collectionName);
        });
        describe('class methods', () => {
            describe.each(keys(__MONGO_DRIVER__))('%p', method => {
                test('is a function', () => {
                    expect(collection).toHaveProperty(method, expect.any(Function));
                });
                test('calls native method with expected parameters', async() => {
                    const payload = Symbol(`collection.${method}.payload`);
                    const props = { payload };
                    await collection[method](props);
                    expect(prop(method, __MONGO_DRIVER__)).toHaveBeenCalledWith({ payload });
                });
            });
        });
        describe('throws expected assertion errors', () => {
            describe('when client', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('when client is %p', __client__ => {
                        expect(() => withCollection(__client__, null)).toThrow(/`factory` cannot be empty or nil/);
                    });
                });
                describe('*.collection is not a function', () => {
                    test.each([true, false, 12.34, 'test-wexsrctvybunimop,', Symbol('test-ioukjyhtgrfed')])('factory=%p', __collection__ => {
                        expect(() => withCollection({ collection: __collection__ }, null)).toThrow(/`factory` must be function/);
                    });
                });
            });
            describe('when collection name', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('name=%p', name => {
                        expect(() => withCollection(__MONGO_CLIENT__, name)).toThrow(/collection `name` cannot be empty or nil/);
                    });
                });
                describe('is not string', () => {
                    test.each([true, false, 12.34, { foo: 'bar' }, ['foo', 'bar']])('client=%p', name => {
                        expect(() => withCollection(__MONGO_CLIENT__, name)).toThrow(/collection `name` must be string/);
                    });
                });
            });
        });
        describe('bubbles expected error', () => {
            test('on rejected factory', async() => {
                expect.assertions(1);
                __MONGO_CLIENT__.mockRejectedValueOnce(__MONGO_CLIENT_ERR__);
                try {
                    await withCollection(__MONGO_CLIENT__, '__test_collection_qawsedrftgyhujikolp__');
                } catch (err) {
                    expect(err).toBe(__MONGO_CLIENT_ERR__);
                }
            });
            test('on rejected native driver call', async() => {
                expect.assertions(1);
                const payload = 'exrtcyvubinomp,[.';
                const expectedErr = new Error('zwexsrctvybunimor');
                __MONGO_DRIVER__.insertOne.mockRejectedValueOnce(expectedErr);
                try {
                    await collection.insertOne(payload);
                } catch (err) {
                    expect(err).toBe(expectedErr);
                }
            });
        });
        test('memoizes correctly', async() => {
            const secondCollection = await withCollection(__MONGO_CLIENT__, collectionName);
            const differentCollection = await withCollection(__MONGO_CLIENT__, 'kfdsgukfdsguifsagiufdsugi2345e6r7ttcysvh');
            expect(secondCollection).toBe(collection);
            expect(differentCollection).not.toBe(collection);
        });
        test('is curried', async() => {
            const createThirdCollection = withCollection(__MONGO_CLIENT__);
            const thirdCollection = await createThirdCollection(collectionName);
            expect(thirdCollection).toBe(collection);
        });
    });
});
