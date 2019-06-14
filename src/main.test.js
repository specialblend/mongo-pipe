import * as R from 'ramda';

import withCollection from './lib/mongo';
import transformCollection from './lib/transform';

const nativeDriver = {
    insertOne: jest.fn(),
    findOne: jest.fn(),
};

class NativeCollection {
    async insertOne(...args) {
        return nativeDriver.insertOne(...args);
    }
    async findOne(...args) {
        return nativeDriver.findOne(...args);
    }
}

const client = {
    collection: jest.fn(async() => new NativeCollection),
};

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
    });
});

describe('transformed collection', () => {
    const id = 'test.id.awsercdtvybunimop';
    const generateId = R.always(id);
    const setId = R.set(R.lensProp('id'));
    const injectId = R.converge(setId, [generateId, R.identity]);
    const withUniqueID = transformCollection(withCollection, { insertOne: injectId });
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
            describe.each(R.keys(nativeDriver))('%p', method => {
                test('is a function', () => {
                    expect(collection).toHaveProperty(method, expect.any(Function));
                });
            });
            describe('insertOne', () => {
                test('calls native insertOne with expected parameters', async() => {
                    const payload = Symbol('collection.insertOne.payload');
                    const props = { payload };
                    await collection.insertOne(props);
                    expect(nativeDriver.insertOne).toHaveBeenCalledWith({ id, payload });
                });
            });
        });
    });
});
