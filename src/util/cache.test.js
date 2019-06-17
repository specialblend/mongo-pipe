import { withCache } from './cache';
import { __MONGO_CLIENT__, __MONGO_DRIVER__, __REF__ } from '../../__mocks__/driver';
import { keys } from 'ramda';

describe('withCache', () => {
    test('is a function', () => {
        expect(withCache).toBeFunction();
    });
    describe('when called', () => {
        const factory = withCache();
        test('returns a function', () => {
            expect(factory).toBeFunction();
        });
        describe('when called', () => {
            let collection = null;
            beforeAll(async() => {
                collection = await factory(__MONGO_CLIENT__, 'test.collection.erxtcyvubinogfionsion');
            });
            describe('collection', () => {
                describe('extends native collection', () => {
                    describe.each(keys(__MONGO_DRIVER__))('%p', method => {
                        test('is a function', () => {
                            expect(collection[method]).toBeFunction();
                        });
                        test('has correct binding reference', async() => {
                            const { ref } = await collection[method]({ id: 'yubhsfedubiosfdiunjfsionsfdiondfs' });
                            expect(ref).toBeFunction();
                            expect(ref()).toBe(__REF__);
                        });
                    });
                });
            });
            describe('findOne', () => {
                test('is a function', () => {
                    expect(collection.findOne).toBeFunction();
                });
                describe('when called', () => {
                    let response = null;
                    const payload = { id: 'xtyuiretyuhio' };
                    const testResult = { xertfygvuhi: 'erxtyuiilokujyhtgrfe' };
                    beforeAll(async() => {
                        __MONGO_DRIVER__.findOne.mockResolvedValueOnce(testResult);
                        response = await collection.findOne(payload);
                    });
                    test('calls native Mongo.findOne with expected payload', () => {
                        expect(__MONGO_DRIVER__.findOne).toHaveBeenCalledWith(payload);
                    });
                    test('returns expected result', () => {
                        expect(response).toMatchObject({ value: testResult });
                    });
                    describe('when called again', () => {
                        let response2 = null;
                        beforeAll(async() => {
                            __MONGO_DRIVER__.findOne.mockClear();
                            response2 = await collection.findOne(payload);
                        });
                        test('does not call native Mongo.findOne again', () => {
                            expect(__MONGO_DRIVER__.findOne).not.toHaveBeenCalledWith();
                        });
                        test('returns same result', () => {
                            expect(response2).toMatchObject({ value: testResult });
                        });
                        describe('when called again with different payload', () => {
                            let response3 = null;
                            const payload2 = { id: 'extrcyvubino' };
                            const testResult2 = { extrcyvui: 'ioubvic' };
                            beforeAll(async() => {
                                __MONGO_DRIVER__.findOne.mockClear();
                                __MONGO_DRIVER__.findOne.mockResolvedValueOnce(testResult2);
                                response3 = await collection.findOne(payload2);
                            });
                            test('calls native Mongo.findOne with expected payload', () => {
                                expect(__MONGO_DRIVER__.findOne).toHaveBeenCalledWith(payload2);
                            });
                            test('returns expected result', () => {
                                expect(response3).toMatchObject({ value: testResult2 });
                            });
                        });
                    });
                });
            });
        });
    });
});
