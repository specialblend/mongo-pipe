import { concat, evolve, lensProp, map, set } from 'ramda';
import { pipeSpec } from './common';
import mongo from './mongo';
import { nativeSpecMethods } from './manifest';
import { MockCollection } from '../__mocks__/mongodb';

const url = 'mongodb.example.com';
const options = 'MongoClient.connect(options)';
const databaseName = 'test.database.name';

describe('pipeSpec', () => {
    test('is a function', () => {
        expect(pipeSpec).toBeFunction();
    });
    describe('works as expected', () => {
        let client = null;

        beforeAll(async() => {
            client = await mongo(url, options);
        });

        const testValueFoo = 'test.value.foo.qwerty';
        const testValueBar = 'test.value.bar.asdfgh';
        const testValueBaz = 'test.value.baz.zxcvbn';

        const injectFoo = set(lensProp('foo'), testValueFoo);
        const injectBar = set(lensProp('bar'), testValueBar);
        const injectBaz = set(lensProp('baz'), testValueBaz);

        const concatBar = map(concat('bar*'));

        const withValue = value => evolve({ value });

        const testPayload = {
            alpha: 'test.value.alpha',
            bravo: 'test.value.bravo',
            charlie: 'test.value.charlie',
        };

        describe('single spec pipeline factory', () => {
            const singleSpecPipeline = [{
                insertOne: injectFoo,
                updateOne: injectBar,
            }];
            describe('when called', () => {
                let pipedCollection = null;
                beforeAll(async() => {
                    const collection = client(databaseName, 'test.collection.single.spec.pipeline.zsexrdctfvgybuhijnm');
                    pipedCollection = collection.pipe(...singleSpecPipeline);
                });
                test('returns an resolved object', () => {
                    expect(pipedCollection).toBeObject();
                    expect(pipedCollection).not.toBeInstanceOf(Promise);
                });
                describe('has expected methods', () => {
                    test.each(nativeSpecMethods)('%p', method => {
                        expect(pipedCollection).toHaveProperty(method);
                        expect(pipedCollection[method]).toBeFunction();
                    });
                });
                describe('insertOne', () => {
                    test('is a function', () => {
                        expect(pipedCollection.insertOne).toBeFunction();
                    });
                    describe('when called', () => {
                        let response = null;
                        const testResult = { jutyhbre: 'wzaerxtcyvubinom' };
                        beforeAll(async() => {
                            MockCollection.insertOne.mockResolvedValueOnce(testResult);
                            response = await pipedCollection.insertOne(testPayload);
                        });
                        test('calls native Mongo.insertOne with transformed payload', () => {
                            expect(MockCollection.insertOne).toHaveBeenCalledWith({
                                ...testPayload,
                                foo: testValueFoo,
                            });
                        });
                        test('returns expected testResult', () => {
                            expect(response).toMatchObject(testResult);
                        });
                    });
                });
                describe('updateOne', () => {
                    let response = null;
                    const testResult = { hgfhgfhfghgf: 'qeawfsg' };
                    beforeAll(async() => {
                        MockCollection.updateOne.mockResolvedValueOnce(testResult);
                        response = await pipedCollection.updateOne(testPayload);
                    });
                    test('calls native Mongo.updateOne with transformed payload', async() => {
                        expect(MockCollection.updateOne).toHaveBeenCalledWith({
                            ...testPayload,
                            bar: testValueBar,
                        });
                    });
                    test('returns expected result', () => {
                        expect(response).toMatchObject(testResult);
                    });
                });
            });
        });

        describe('multi spec pipeline factory', () => {
            const multiSpecPipeline = [
                {
                    insertOne: injectFoo,
                    findOne: injectBar,
                },
                {
                    insertOne: withValue(concatBar),
                    updateOne: injectBaz,
                },
            ];

            describe('when called', () => {
                let pipedCollection = null;
                beforeAll(async() => {
                    const collection = client(databaseName, 'test.collection.multi.spec.pipeline.zewsxrdtcfvgyubin');
                    pipedCollection = collection.pipe(...multiSpecPipeline);
                });
                test('returns an resolved object', () => {
                    expect(pipedCollection).toBeObject();
                    expect(pipedCollection).not.toBeInstanceOf(Promise);
                });
                describe('insertOne', () => {
                    test('is a function', () => {
                        expect(pipedCollection.insertOne).toBeFunction();
                    });
                    describe('when called', () => {
                        let response = null;
                        const testResult = { jutyhbre: 'wzaerxtcyvubinom' };
                        beforeAll(async() => {
                            MockCollection.insertOne.mockResolvedValueOnce(testResult);
                            response = await pipedCollection.insertOne(testPayload);
                        });
                        test('calls native Mongo.insertOne with transformed payload', () => {
                            expect(MockCollection.insertOne).toHaveBeenCalledWith({
                                ...testPayload,
                                foo: testValueFoo,
                            });
                        });
                        test('returns expected testResult', () => {
                            expect(response).toMatchObject(testResult);
                        });
                    });
                });
                describe('updateOne', () => {
                    let response = null;
                    const testResult = { hgfhgfhfghgf: 'qeawfsg' };
                    beforeAll(async() => {
                        MockCollection.updateOne.mockResolvedValueOnce(testResult);
                        response = await pipedCollection.updateOne(testPayload);
                    });
                    test('calls native Mongo.updateOne with transformed payload', async() => {
                        expect(MockCollection.updateOne).toHaveBeenCalledWith({
                            ...testPayload,
                            baz: testValueBaz,
                        });
                    });
                    test('returns expected result', () => {
                        expect(response).toMatchObject(testResult);
                    });
                });
            });
        });
    });
});
