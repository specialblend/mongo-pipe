/* eslint-disable func-names */

import mongo from './mongo';
import { __MONGO_COLLECTION__ } from '../__mocks__/mongodb';
import { withSetProps } from './helpers';

const fromArray = function *(data) {
    for (const i of data) {
        yield i;
    }
};

describe('helper method', () => {
    let collection = null;
    beforeAll(async() => {
        const client = await mongo(null, null);
        collection = client(null, null);
    });
    describe('all', () => {
        test('is a function', () => {
            expect(collection.all).toBeFunction();
        });
        describe('when called', () => {
            let result = null;
            const id = Symbol('id:all');
            const foo = Symbol('foo:all');
            const bar = Symbol('bar:all');
            const baz = Symbol('baz:all');
            const faz = Symbol('faz:all');
            const responses = [bar, baz, faz];
            const response = fromArray(responses);
            const payload = { id, foo };
            beforeAll(async() => {
                __MONGO_COLLECTION__.find.mockResolvedValueOnce(response);
                result = await collection.all(payload);
            });
            test('calls mongo.find with expected payload', () => {
                expect(__MONGO_COLLECTION__.find).toHaveBeenCalledWith(payload);
            });
            test('returns array result of calling mongo.find', () => {
                expect(result).toMatchObject(responses);
            });
            test('bubbles errors', async() => {
                const error = new Error('err:all');
                __MONGO_COLLECTION__.find.mockRejectedValueOnce(error);
                expect.assertions(1);
                try {
                    await collection.all(payload);
                } catch (err) {
                    expect(err).toBe(error);
                }
            });
        });
    });
    describe('createOne', () => {
        test('is a function', () => {
            expect(collection.createOne).toBeFunction();
        });
        describe('when called', () => {
            let result = null;
            const id = Symbol('id:createOne');
            const foo = Symbol('foo:createOne');
            const data = Symbol('data:createOne');
            const response = {
                ops: [data],
            };
            const payload = { id, foo };
            beforeAll(async() => {
                __MONGO_COLLECTION__.insertOne.mockResolvedValueOnce(response);
                result = await collection.createOne(payload);
            });
            test('calls mongo.insertOne with expected payload', () => {
                expect(__MONGO_COLLECTION__.insertOne).toHaveBeenCalledWith(payload);
            });
            test('returns data result of calling mongo.insertOne', () => {
                expect(result).toBe(data);
            });
            test('bubbles errors', async() => {
                const error = new Error('err:findOneById');
                __MONGO_COLLECTION__.insertOne.mockRejectedValueOnce(error);
                expect.assertions(1);
                try {
                    await collection.createOne(payload);
                } catch (err) {
                    expect(err).toBe(error);
                }
            });
        });
    });
    describe('findOneById', () => {
        test('is a function', () => {
            expect(collection.findOneById).toBeFunction();
        });
        describe('when called', () => {
            let result = null;
            const id = Symbol('id:findOneById');
            const foo = Symbol('foo:findOneById');
            const response = Symbol('response:findOneById');
            const payload = { id, foo };
            beforeAll(async() => {
                __MONGO_COLLECTION__.findOne.mockResolvedValueOnce(response);
                result = await collection.findOneById(payload);
            });
            test('calls mongo.findOne with expected payload', () => {
                expect(__MONGO_COLLECTION__.findOne).toHaveBeenCalledWith({ id });
                expect(__MONGO_COLLECTION__.findOne).not.toHaveBeenCalledWith(payload);
            });
            test('returns result of calling mongo.findOne', () => {
                expect(result).toBe(response);
            });
            test('bubbles errors', async() => {
                const error = new Error('err:findOneById');
                __MONGO_COLLECTION__.findOne.mockRejectedValueOnce(error);
                expect.assertions(1);
                try {
                    await collection.findOneById(payload);
                } catch (err) {
                    expect(err).toBe(error);
                }
            });
        });
    });
    describe('updateOneById', () => {
        test('is a function', () => {
            expect(collection.updateOneById).toBeFunction();
        });
        describe('when called', () => {
            let result = null;
            const id = 'id:updateOneById';
            const foo = 'foo:updateOneById';
            const bar = 'bar:updateOneById';
            const baz = 'baz:updateOneById';
            const data = Symbol('data:updateOneById');
            const response = {
                result: {
                    ok: 1,
                    no: 1,
                },
                ops: [data],
            };
            const payload = { id, foo, bar, baz };
            const expectedProps = withSetProps(payload);
            beforeAll(async() => {
                __MONGO_COLLECTION__.updateOne.mockResolvedValueOnce(response);
                result = await collection.updateOneById(payload);
            });
            test('calls mongo.updateOne with expected payload', () => {
                expect(__MONGO_COLLECTION__.updateOne).toHaveBeenCalledWith({ id }, expectedProps);
            });
            test('returns data result of calling mongo.updateOne', () => {
                expect(result).toBe(data);
            });
            test('bubbles errors', async() => {
                const error = new Error('err:updateOneById');
                __MONGO_COLLECTION__.updateOne.mockRejectedValueOnce(error);
                expect.assertions(1);
                try {
                    await collection.updateOneById(payload);
                } catch (err) {
                    expect(err).toBe(error);
                }
            });
        });
    });
    describe('upsertOneById', () => {
        test('is a function', () => {
            expect(collection.upsertOneById).toBeFunction();
        });
        describe('when called', () => {
            describe('with existing object', () => {
                let result = null;
                const id = 'id:upsertOneById';
                const foo = 'foo:upsertOneById';
                const bar = 'bar:upsertOneById';
                const baz = 'baz:upsertOneById';
                const data = Symbol('data:upsertOneById');
                const response = {
                    result: {
                        ok: 1,
                        no: 1,
                    },
                    ops: [data],
                };
                const payload = { id, foo, bar, baz };
                const expectedProps = withSetProps(payload);
                beforeAll(async() => {
                    __MONGO_COLLECTION__.insertOne.mockClear();
                    __MONGO_COLLECTION__.updateOne.mockResolvedValueOnce(response);
                    result = await collection.upsertOneById(payload);
                });
                test('calls mongo.updateOne with expected payload', () => {
                    expect(__MONGO_COLLECTION__.updateOne).toHaveBeenCalledWith({ id }, expectedProps);
                });
                test('does not call mongo.insertOne', () => {
                    expect(__MONGO_COLLECTION__.insertOne).not.toHaveBeenCalled();
                });
                test('returns data result of calling mongo.updateOne', () => {
                    expect(result).toBe(data);
                });
                test('bubbles errors', async() => {
                    const error = new Error('err:upsertOneById');
                    __MONGO_COLLECTION__.updateOne.mockRejectedValueOnce(error);
                    expect.assertions(1);
                    try {
                        await collection.upsertOneById(payload);
                    } catch (err) {
                        expect(err).toBe(error);
                    }
                });
            });
            describe('with non-existent object', () => {
                let result = null;
                const id = 'id:upsertOneById';
                const foo = 'foo:upsertOneById';
                const bar = 'bar:upsertOneById';
                const baz = 'baz:upsertOneById';
                const data = Symbol('data:upsertOneById');
                const updateOneResponse = {
                    result: {
                        ok: 0,
                        no: 0,
                    },
                    ops: [],
                };
                const insertOneResponse = {
                    result: {
                        ok: 1,
                        no: 1,
                    },
                    ops: [data],
                };
                const payload = { id, foo, bar, baz };
                const expectedUpdateProps = withSetProps(payload);
                beforeAll(async() => {
                    __MONGO_COLLECTION__.insertOne.mockClear();
                    __MONGO_COLLECTION__.updateOne.mockClear();
                    __MONGO_COLLECTION__.insertOne.mockResolvedValueOnce(insertOneResponse);
                    __MONGO_COLLECTION__.updateOne.mockResolvedValueOnce(updateOneResponse);
                    result = await collection.upsertOneById(payload);
                });
                test('calls mongo.updateOne with expected payload', () => {
                    expect(__MONGO_COLLECTION__.updateOne).toHaveBeenCalledWith({ id }, expectedUpdateProps);
                });
                test('calls mongo.insertOne with expected payload', () => {
                    expect(__MONGO_COLLECTION__.insertOne).toHaveBeenCalledWith(payload);
                });
                test('returns data result of calling mongo.insertOne', () => {
                    expect(result).toBe(data);
                });
                test('bubbles errors', async() => {
                    const error = new Error('err:upsertOneById');
                    __MONGO_COLLECTION__.updateOne.mockResolvedValueOnce(updateOneResponse);
                    __MONGO_COLLECTION__.insertOne.mockRejectedValueOnce(error);
                    expect.assertions(1);
                    try {
                        await collection.upsertOneById(payload);
                    } catch (err) {
                        expect(err).toBe(error);
                    }
                });
            });
        });
    });
});
