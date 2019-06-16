import { always, keys, lensProp, pipe, set } from 'ramda';
import withCollection from './mongo';
import transform from './transform';
import { __EMPTY__, __NIL__ } from '../../__mocks__/support';
import {
    __MONGO_CLIENT__,
    __MONGO_CLIENT_ERR__,
    __MONGO_DRIVER__,
    __REF__,
} from '../../__mocks__/driver';

const collectionName = 'test.collection.werxstcyvubinomp';

describe('transformed factory', () => {
    const id = 'test.id.awsercdtvybunimop';
    const generateId = always(id);
    const setId = set(lensProp('id'));
    const injectId = props => setId(generateId(), props);
    const testSpec = {
        insertOne: handler => pipe(injectId, handler),
    };
    const withUniqueID = transform(testSpec, withCollection);

    test('is a function', () => {
        expect(withUniqueID).toBeFunction();
    });

    describe('when called', () => {
        let collection = null;
        beforeAll(async() => {
            collection = await withUniqueID(__MONGO_CLIENT__, collectionName);
        });
        describe('collection', () => {
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
                        expect(() => transform(testSpec, target)).toThrow(/`target` cannot be empty or nil/);
                    });
                });
                describe('is not a function', () => {
                    test.each([true, false, 12.34, 'test-wexsrctvybunimop,', Symbol('test-ioukjyhtgrfed')])('target=%p', target => {
                        expect(() => transform(testSpec, target)).toThrow(/`target` must be function/);
                    });
                });
            });
            describe('when transformerSpec', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('spec=%p', spec => {
                        expect(() => transform(spec, () => {})).toThrow(/`spec` cannot be empty or nil/);
                    });
                });
                describe('is not an object', () => {
                    test.each([true, false, 12.34, 'test-awsetgyuko,', Symbol('test-ioukjyhtgrfed'), () => {}])('spec=%p', spec => {
                        expect(() => transform(spec, () => {})).toThrow(/`spec` must be object/);
                    });
                });
            });
        });
        describe('bubbles expected error', () => {
            test('on rejected factory', async() => {
                expect.assertions(1);
                __MONGO_CLIENT__.mockRejectedValueOnce(__MONGO_CLIENT_ERR__);
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
