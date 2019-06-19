import { keys } from 'ramda';
import { withCache } from './cache';
import withCollection from '../lib/mongo';
import { __MONGO_COLLECTION_FACTORY__, __MONGO_DRIVER__, __REF__ } from '../../__mocks__/driver';

describe('withCache', () => {
    test('is a function', () => {
        expect(withCache).toBeFunction();
    });

    describe('when called', () => {
        let cachedCollection = null;
        beforeAll(async() => {
            const collection = await withCollection(__MONGO_COLLECTION_FACTORY__, 'test.collection.erxtcyvubinogfionsion');
            cachedCollection = withCache(collection);
        });
        describe('collection', () => {
            describe('extends native collection', () => {
                describe.each(keys(__MONGO_DRIVER__))('%p', method => {
                    test('is a function', () => {
                        expect(cachedCollection[method]).toBeFunction();
                    });
                    test('has correct binding reference', async() => {
                        const { ref } = await cachedCollection[method]({ id: 'yubhsfedubiosfdiunjfsionsfdiondfs' });
                        expect(ref).toBeFunction();
                        expect(ref()).toBe(__REF__);
                    });
                });
            });
        });
        describe('findOne', () => {
            test('is a function', () => {
                expect(cachedCollection.findOne).toBeFunction();
            });
            describe('when called', () => {
                let response = null;
                const payload = { id: 'xtyuiretyuhio' };
                const testResult = { xertfygvuhi: 'erxtyuiilokujyhtgrfe' };
                beforeAll(async() => {
                    __MONGO_DRIVER__.findOne.mockResolvedValueOnce(testResult);
                    response = await cachedCollection.findOne(payload);
                });
                test('calls native Mongo.findOne with expected payload', () => {
                    expect(__MONGO_DRIVER__.findOne).toHaveBeenCalledWith(payload);
                });
                test('returns expected result', () => {
                    expect(response.value).toBe(testResult);
                });
                describe('when called again', () => {
                    let response2 = null;
                    beforeAll(async() => {
                        __MONGO_DRIVER__.findOne.mockClear();
                        response2 = await cachedCollection.findOne(payload);
                    });
                    test('does not call native Mongo.findOne again', () => {
                        expect(__MONGO_DRIVER__.findOne).not.toHaveBeenCalledWith();
                    });
                    test('returns same result', () => {
                        expect(response2).toBe(response);
                    });
                    describe('when called again with different payload', () => {
                        let response3 = null;
                        const payload2 = { id: 'extrcyvubino' };
                        const testResult2 = { extrcyvui: 'ioubvic' };
                        beforeAll(async() => {
                            __MONGO_DRIVER__.findOne.mockClear();
                            __MONGO_DRIVER__.findOne.mockResolvedValueOnce(testResult2);
                            response3 = await cachedCollection.findOne(payload2);
                        });
                        test('calls native Mongo.findOne with expected payload', () => {
                            expect(__MONGO_DRIVER__.findOne).toHaveBeenCalledWith(payload2);
                        });
                        test('returns expected result', () => {
                            expect(response3.value).toBe(testResult2);
                        });
                    });
                });
            });
        });
        describe('updateOne', () => {
            test('is a function', () => {
                expect(cachedCollection.updateOne).toBeFunction();
            });
            describe('when called', () => {
                let response2 = null;
                const payload = { id: 'gfddfggfdgfgg' };
                const testResult = { xertfygvuhi: 'erxtyuiilokujyhtgrfe' };
                beforeAll(async() => {
                    __MONGO_DRIVER__.updateOne.mockResolvedValueOnce(testResult);
                    response2 = await cachedCollection.updateOne(payload);
                });
                test('calls native Mongo.findOne with expected payload', () => {
                    expect(__MONGO_DRIVER__.updateOne).toHaveBeenCalledWith(payload);
                });
                test('returns expected result', () => {
                    expect(response2).toMatchObject({ value: testResult });
                });
                test('busts cache as expected', async() => {
                    const testFindOneResult = { id: 'nbvrter5tyuoi' };
                    const testFindOneResult2 = { id: 'inbugvftce' };
                    const findPayload = { id: 'nbvrter5tyuoi' };
                    __MONGO_DRIVER__.findOne.mockClear();
                    __MONGO_DRIVER__.findOne.mockResolvedValueOnce(testFindOneResult);
                    __MONGO_DRIVER__.findOne.mockResolvedValueOnce(testFindOneResult2);
                    const firstResult = await cachedCollection.findOne(findPayload);
                    const secondResult = await cachedCollection.findOne(findPayload);
                    expect(__MONGO_DRIVER__.findOne).toHaveBeenCalledTimes(1);
                    expect(secondResult).toBe(firstResult);
                    __MONGO_DRIVER__.findOne.mockClear();
                    await cachedCollection.updateOne(findPayload);
                    const thirdResult = await cachedCollection.findOne(findPayload);
                    expect(__MONGO_DRIVER__.findOne).toHaveBeenCalledTimes(1);
                    expect(thirdResult).not.toBe(firstResult);
                    expect(thirdResult).not.toBe(secondResult);
                    expect(thirdResult.value).toBe(testFindOneResult2);
                });
            });
        });
    });
});
