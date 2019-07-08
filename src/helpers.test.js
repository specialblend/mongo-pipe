import mongo from './mongo';
import { __MONGO_COLLECTION__ } from '../__mocks__/mongodb';

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
});
