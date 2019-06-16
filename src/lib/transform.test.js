import { always, concat, evolve, is, keys, lensProp, pipe, set, when } from 'ramda';
import withCollection from './mongo';
import transform, { transformSpec } from './transform';
import { __EMPTY__, __NIL__ } from '../../__mocks__/support';
import {
    __MONGO_CLIENT__,
    __MONGO_CLIENT_ERR__,
    __MONGO_DRIVER__,
    __REF__,
} from '../../__mocks__/driver';
import { pipeAfter, pipeBefore } from './common';

const collectionName = 'test.collection.werxstcyvubinomp';

describe('transformed factory', () => {
    const id = 'test.id.awsercdtvybunimop';
    const codename = 'test.codename.wexrtcyvubino';
    const setId = set(lensProp('id'));
    const setCodenamed = set(lensProp('codename'));
    const injectId = setId(id);
    const injectId1 = set(lensProp('test'), 'yoooo');
    const injectCodename = setCodenamed(codename);
    const injectIdSpec = {
        insertOne: pipeBefore(injectId, injectId1),
    };
    const concatFooValue = evolve({ value: when(is(String), concat('foo*')) });
    const injectCodenameSpec = {
        insertOne: pipeBefore(injectCodename),
    };
    const concatFooValueSpec = {
        insertOne: pipeAfter(concatFooValue),
    };

    const withUniqueID = transformSpec(injectIdSpec, injectCodenameSpec, concatFooValueSpec)(withCollection);

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
                        const response = await collection[method]();
                        const { ref } = response;
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
                const response = 'test.response.xerctvyubinm';
                const value = concat('foo*', response);
                __MONGO_DRIVER__.insertOne.mockResolvedValueOnce(response);
                const result = await collection.insertOne(props);
                expect(__MONGO_DRIVER__.insertOne).toHaveBeenCalledWith({ id, codename, payload, test: 'yoooo' });
                expect(result).toMatchObject({ value });
            });
        });
        describe('throws expected assertion error', () => {
            describe('when target', () => {
                describe('is empty or nil', () => {
                    test.each([...__EMPTY__, ...__NIL__])('when target is %p', target => {
                        expect(() => transform(injectIdSpec, target)).toThrow(/`target` cannot be empty or nil/);
                    });
                });
                describe('is not a function', () => {
                    test.each([true, false, 12.34, 'test-wexsrctvybunimop,', Symbol('test-ioukjyhtgrfed')])('target=%p', target => {
                        expect(() => transform(injectIdSpec, target)).toThrow(/`target` must be function/);
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
