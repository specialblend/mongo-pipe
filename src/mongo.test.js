/* eslint-disable max-nested-callbacks */

import { MongoClient, MockCollection, MockConnection, MockDatabase } from 'mongodb';
import mongo from './mongo';
import { nativeSpecMethods } from './manifest';

const url = 'mongodb.example.com';
const options = 'MongoClient.connect(options)';
const databaseName = 'test.database.name';
const collectionName = 'test.collection.name';

describe('mongo', () => {
    test('is a function', () => {
        expect(mongo).toBeFunction();
    });
    describe('when called', () => {
        let withDatabase = null;
        beforeAll(async() => {
            withDatabase = await mongo(url, options);
        });
        test('calls MongoClient.connect with expected parameters', () => {
            expect(MongoClient.connect).toHaveBeenCalledWith(url, options);
        });
        describe('resolves to a function', () => {
            test('*', () => {
                expect(withDatabase).toBeFunction();
            });
            describe('when called', () => {
                let withCollection = null;
                beforeAll(() => {
                    withCollection = withDatabase(databaseName);
                });
                describe('returns a function', () => {
                    test('*', () => {
                        expect(withCollection).toBeFunction();
                    });
                    describe('when called', () => {
                        let collection = null;
                        beforeAll(() => {
                            collection = withCollection(collectionName);
                        });
                        test('calls connection.db with expected parameters', () => {
                            expect(MockConnection.db).toHaveBeenCalledWith(databaseName);
                        });
                        test('calls db.collection with expected parameters', () => {
                            expect(MockDatabase.collection).toHaveBeenCalledWith(collectionName);
                        });
                        describe('returns an object', () => {
                            test('*', () => {
                                expect(collection).toBeObject();
                            });
                            describe('with expected spec', () => {
                                describe.each(nativeSpecMethods)('%p', methodName => {
                                    test('is a function', () => {
                                        expect(collection).toHaveProperty(methodName, expect.any(Function));
                                    });
                                    describe('when called', () => {
                                        let result = null;
                                        let handler = null;
                                        const payload0 = Symbol('payload0');
                                        const payload1 = Symbol('payload1');
                                        const payload2 = Symbol('payload2');
                                        const response = Symbol('response');
                                        const driver = MockCollection[methodName];
                                        beforeAll(async() => {
                                            handler = collection[methodName];
                                            driver.mockClear();
                                            driver.mockResolvedValueOnce(response);
                                            result = await handler(payload0, payload1, payload2);
                                        });
                                        test('calls Mongo driver with expected parameters', async() => {
                                            expect(driver).toHaveBeenCalledWith(payload0, payload1, payload2);
                                        });
                                        test('returns result of calling Mongo driver', () => {
                                            expect(result).toBe(response);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    test('memoizes correctly', async() => {
        const withDB = await mongo(url);
        const dbName = 'test.db.name-ercftgvhb';
        const colName = 'test.collection.name-wserdtyuhi';
        const collection0 = withDB(dbName, colName);
        const collection1 = withDB(dbName, colName);
        const collection2 = withDB('foo-rxctyvubhjnk', colName);
        const collection3 = withDB(dbName, 'zdrxhjbknl');
        const collection4 = withDB(dbName, 'zdrxhjbknl');
        expect(collection0).toBe(collection1);
        expect(collection0).not.toBe(collection2);
        expect(collection0).not.toBe(collection3);
        expect(collection4).toBe(collection3);
    });
});
