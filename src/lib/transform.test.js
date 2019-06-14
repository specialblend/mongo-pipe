import * as R from 'ramda';

import withCollection from './mongo';
import transform from './transform';
import { __generateClient__, __generateNativeDriver__ } from '../../__mocks__/driver';

const nativeDriver = __generateNativeDriver__();
const client = __generateClient__();

const collectionName = 'test.collection';

describe('transformed collection', () => {
    const id = 'test.id.awsercdtvybunimop';
    const generateId = R.always(id);
    const setId = R.set(R.lensProp('id'));
    const injectId = R.converge(setId, [generateId, R.identity]);
    const withUniqueID = transform(withCollection, { insertOne: injectId });
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
