/* eslint-disable func-names */

import { MockCollection } from 'mongodb';
import mongo from './mongo';
import { withSetProps } from './helpers';
import { objOf } from 'ramda';

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
                MockCollection.find.mockResolvedValueOnce(response);
                result = await collection.all(payload);
            });
            test('calls mongo.find with expected payload', () => {
                expect(MockCollection.find).toHaveBeenCalledWith(payload);
            });
            test('returns array result of calling mongo.find', () => {
                expect(result).toMatchObject(responses);
            });
            test('bubbles errors', async() => {
                const error = new Error('err:all');
                MockCollection.find.mockRejectedValueOnce(error);
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
                MockCollection.insertOne.mockResolvedValueOnce(response);
                result = await collection.createOne(payload);
            });
            test('calls mongo.insertOne with expected payload', () => {
                expect(MockCollection.insertOne).toHaveBeenCalledWith(payload);
            });
            test('returns data result of calling mongo.insertOne', () => {
                expect(result).toBe(data);
            });
            test('bubbles errors', async() => {
                const error = new Error('err:findOneById');
                MockCollection.insertOne.mockRejectedValueOnce(error);
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
                MockCollection.findOne.mockResolvedValueOnce(response);
                result = await collection.findOneById(payload);
            });
            test('calls mongo.findOne with expected payload', () => {
                expect(MockCollection.findOne).toHaveBeenCalledWith({ id });
                expect(MockCollection.findOne).not.toHaveBeenCalledWith(payload);
            });
            test('returns result of calling mongo.findOne', () => {
                expect(result).toBe(response);
            });
            test('bubbles errors', async() => {
                const error = new Error('err:findOneById');
                MockCollection.findOne.mockRejectedValueOnce(error);
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
                value: data,
            };
            const payload = { id, foo, bar, baz };
            const expectedProps = withSetProps(payload);
            beforeAll(async() => {
                MockCollection.findOneAndUpdate.mockResolvedValueOnce(response);
                result = await collection.updateOneById(payload);
            });
            test('calls mongo.findOneAndUpdate with expected payload', () => {
                const expectedOptions = {
                    returnOriginal: false,
                };
                expect(MockCollection.findOneAndUpdate).toHaveBeenCalledWith({ id }, expectedProps, expectedOptions);
            });
            test('returns data result of calling mongo.findOneAndUpdate', () => {
                expect(result).toBe(data);
            });
            test('bubbles errors', async() => {
                const error = new Error('err:updateOneById');
                MockCollection.findOneAndUpdate.mockRejectedValueOnce(error);
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
                const response = objOf('value', data);
                const payload = { id, foo, bar, baz };
                const expectedProps = withSetProps(payload);
                beforeAll(async() => {
                    MockCollection.insertOne.mockClear();
                    MockCollection.findOneAndUpdate.mockResolvedValueOnce(response);
                    result = await collection.upsertOneById(payload);
                });
                test('calls mongo.findOneAndUpdate with expected payload', () => {
                    const expectedOptions = {
                        returnOriginal: false,
                    };
                    expect(MockCollection.findOneAndUpdate).toHaveBeenCalledWith({ id }, expectedProps, expectedOptions);
                });
                test('does not call mongo.insertOne', () => {
                    expect(MockCollection.insertOne).not.toHaveBeenCalled();
                });
                test('returns data result of calling mongo.findOneAndUpdate', () => {
                    expect(result).toBe(data);
                });
                test('bubbles errors', async() => {
                    const error = new Error('err:upsertOneById');
                    MockCollection.findOneAndUpdate.mockRejectedValueOnce(error);
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
                    MockCollection.insertOne.mockClear();
                    MockCollection.findOneAndUpdate.mockClear();
                    MockCollection.insertOne.mockResolvedValueOnce(insertOneResponse);
                    MockCollection.findOneAndUpdate.mockResolvedValueOnce(updateOneResponse);
                    result = await collection.upsertOneById(payload);
                });
                test('calls mongo.findOneAndUpdate with expected payload', () => {
                    const expectedOptions = {
                        returnOriginal: false,
                    };
                    expect(MockCollection.findOneAndUpdate).toHaveBeenCalledWith({ id }, expectedUpdateProps, expectedOptions);
                });
                test('calls mongo.insertOne with expected payload', () => {
                    expect(MockCollection.insertOne).toHaveBeenCalledWith(payload);
                });
                test('returns data result of calling mongo.insertOne', () => {
                    expect(result).toBe(data);
                });
                test('bubbles errors', async() => {
                    const error = new Error('err:upsertOneById');
                    MockCollection.findOneAndUpdate.mockResolvedValueOnce(updateOneResponse);
                    MockCollection.insertOne.mockRejectedValueOnce(error);
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
