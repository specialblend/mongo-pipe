import * as R from 'ramda';

import withCollection from './mongo';
import { __generateClient__, __generateNativeDriver__ } from '../../__mocks__/driver';

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
    });
});
