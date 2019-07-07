import { concat, evolve, lensProp, map, set } from 'ramda';
import { pipeSpec } from './common';
import withCollection from './mongo';
import { __MONGO_COLLECTION_FACTORY__, __MONGO_DRIVER__ } from '../../__mocks__/driver';
import { nativeSpecMethods } from './config';

describe('pipeSpec', () => {
    test('is a function', () => {
        expect(pipeSpec).toBeFunction();
    });
    describe('works as expected', () => {
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
                    const collection = await withCollection(__MONGO_COLLECTION_FACTORY__, 'test.collection.single.spec.pipeline.zsexrdctfvgybuhijnm');
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
                            __MONGO_DRIVER__.insertOne.mockResolvedValueOnce(testResult);
                            response = await pipedCollection.insertOne(testPayload);
                        });
                        test('calls native Mongo.insertOne with transformed payload', () => {
                            expect(__MONGO_DRIVER__.insertOne).toHaveBeenCalledWith({
                                ...testPayload,
                                foo: testValueFoo,
                            });
                        });
                        test('returns expected testResult', () => {
                            expect(response).toMatchObject({ value: testResult });
                        });
                    });
                });
                describe('updateOne', () => {
                    let response = null;
                    const testResult = { hgfhgfhfghgf: 'qeawfsg' };
                    beforeAll(async() => {
                        __MONGO_DRIVER__.updateOne.mockResolvedValueOnce(testResult);
                        response = await pipedCollection.updateOne(testPayload);
                    });
                    test('calls native Mongo.updateOne with transformed payload', async() => {
                        expect(__MONGO_DRIVER__.updateOne).toHaveBeenCalledWith({
                            ...testPayload,
                            bar: testValueBar,
                        });
                    });
                    test('returns expected result', () => {
                        expect(response).toMatchObject({ value: testResult });
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
                    const collection = await withCollection(__MONGO_COLLECTION_FACTORY__, 'test.collection.multi.spec.pipeline.zewsxrdtcfvgyubin');
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
                            __MONGO_DRIVER__.insertOne.mockResolvedValueOnce(testResult);
                            response = await pipedCollection.insertOne(testPayload);
                        });
                        test('calls native Mongo.insertOne with transformed payload', () => {
                            expect(__MONGO_DRIVER__.insertOne).toHaveBeenCalledWith({
                                ...testPayload,
                                foo: testValueFoo,
                            });
                        });
                        test('returns expected testResult', () => {
                            expect(response).toMatchObject({ value: testResult });
                        });
                    });
                });
                describe('updateOne', () => {
                    let response = null;
                    const testResult = { hgfhgfhfghgf: 'qeawfsg' };
                    beforeAll(async() => {
                        __MONGO_DRIVER__.updateOne.mockResolvedValueOnce(testResult);
                        response = await pipedCollection.updateOne(testPayload);
                    });
                    test('calls native Mongo.updateOne with transformed payload', async() => {
                        expect(__MONGO_DRIVER__.updateOne).toHaveBeenCalledWith({
                            ...testPayload,
                            baz: testValueBaz,
                        });
                    });
                    test('returns expected result', () => {
                        expect(response).toMatchObject({ value: testResult });
                    });
                });
            });
        });
    });
});
