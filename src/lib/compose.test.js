import { composeSpec } from './transform';
import { __MONGO_CLIENT__, __MONGO_CLIENT_ERR__, __MONGO_DRIVER__ } from '../../__mocks__/driver';
import { concat, evolve, map } from 'ramda';

describe('composeSpec', () => {
    test('is a function', () => {
        expect(composeSpec).toBeFunction();
    });
    describe('when called', () => {
        const withFoo = composeSpec([{}]);
        describe('returns', () => {
            test('a function', () => {
                expect(withFoo).toBeFunction();
            });
            test('a function which returns an object', () => {
                const collectionWithFoo = withFoo(__MONGO_CLIENT__, 'test.collection.name-ewzrdxtfcygvubfsd');
                expect(collectionWithFoo).toBeObject();
            });
        });
    });

    describe('works as expected', () => {
        const concatFoo = map(concat('foo*'));
        const concatBar = map(concat('bar*'));
        const concatBaz = map(concat('baz*'));

        const withValue = value => evolve({ value });

        const testPayload = {
            alpha: 'test.value.alpha',
            bravo: 'test.value.bravo',
            charlie: 'test.value.charlie',
        };

        describe('with default factory', () => {
            describe('bubbles expected error', () => {
                const uselessFactory = composeSpec([{}]);
                test('on rejected factory', async() => {
                    expect.assertions(1);
                    __MONGO_CLIENT__.mockRejectedValueOnce(__MONGO_CLIENT_ERR__);
                    try {
                        await uselessFactory(__MONGO_CLIENT__, '__test_collection_qawsedrftgyhujikolp__');
                    } catch (err) {
                        expect(err).toBe(__MONGO_CLIENT_ERR__);
                    }
                });
                test('on rejected native driver call', async() => {
                    expect.assertions(1);
                    const payload = 'exrtcyvubinomp,[.';
                    const expectedErr = new Error('lioukyjnhtbgrvefc');
                    const collection = await uselessFactory(__MONGO_CLIENT__, 'sexdcfghjk');
                    __MONGO_DRIVER__.insertOne.mockRejectedValueOnce(expectedErr);
                    try {
                        await collection.insertOne(payload);
                    } catch (err) {
                        expect(err).toBe(expectedErr);
                    }
                });
            });

            describe('single spec pipeline factory', () => {
                const singleSpecPipeline = [
                    {
                        findOne: withValue(concatFoo),
                        remove: withValue(concatBar),
                    },
                ];
                const factory = composeSpec(singleSpecPipeline);

                test('is a function', () => {
                    expect(factory).toBeFunction();
                });

                describe('when called', () => {
                    let collection = null;
                    beforeAll(async() => {
                        collection = await factory(__MONGO_CLIENT__, 'test.collection.single.spec.pipeline.zsexrdctfvgybuhijnm');
                    });
                    test('returns an resolved object', () => {
                        expect(collection).toBeObject();
                        expect(collection).not.toBeInstanceOf(Promise);
                    });
                    describe('findOne', () => {
                        let response = null;
                        const testResult = { hgfhgfhfghgf: 'qeawfsg' };
                        beforeAll(async() => {
                            __MONGO_DRIVER__.findOne.mockResolvedValueOnce(testResult);
                            response = await collection.findOne(testPayload);
                        });
                        test('calls native Mongo.updateOne with expected payload', async() => {
                            expect(__MONGO_DRIVER__.findOne).toHaveBeenCalledWith(testPayload);
                        });
                        test('returns expected result', () => {
                            expect(response).toMatchObject({ value: concatFoo(testResult) });
                        });
                    });
                    describe('remove', () => {
                        let response = null;
                        const testResult = { hgfhgfhfghgf: 'qeawfsg' };
                        beforeAll(async() => {
                            __MONGO_DRIVER__.remove.mockResolvedValueOnce(testResult);
                            response = await collection.remove(testPayload);
                        });
                        test('calls native Mongo.updateOne with expected payload', async() => {
                            expect(__MONGO_DRIVER__.remove).toHaveBeenCalledWith(testPayload);
                        });
                        test('returns expected result', () => {
                            expect(response).toMatchObject({ value: concatBar(testResult) });
                        });
                    });
                });
            });

            describe('multi spec pipeline factory', () => {
                const multiSpecPipeline = [
                    {
                        updateOne: withValue(concatFoo),
                    },
                    {
                        insertOne: withValue(concatBar),
                        findOne: withValue(concatBaz),
                    },
                ];

                const factory = composeSpec(multiSpecPipeline);

                test('is a function', () => {
                    expect(factory).toBeFunction();
                });

                describe('when called', () => {
                    let collection = null;
                    beforeAll(async() => {
                        collection = await factory(__MONGO_CLIENT__, 'test.collection.multi.spec.pipeline.zewsxrdtcfvgyubin');
                    });
                    test('returns an resolved object', () => {
                        expect(collection).toBeObject();
                        expect(collection).not.toBeInstanceOf(Promise);
                    });
                    describe('insertOne', () => {
                        test('is a function', () => {
                            expect(collection.insertOne).toBeFunction();
                        });
                        describe('when called', () => {
                            let response = null;
                            const testResult = { jutyhbre: 'wzaerxtcyvubinom' };
                            beforeAll(async() => {
                                __MONGO_DRIVER__.insertOne.mockResolvedValueOnce(testResult);
                                response = await collection.insertOne(testPayload);
                            });
                            test('calls native Mongo.insertOne with transformed payload', () => {
                                expect(__MONGO_DRIVER__.insertOne).toHaveBeenCalledWith(testPayload);
                            });
                            test('returns expected testResult', () => {
                                expect(response).toMatchObject({ value: concatBar(testResult) });
                            });
                        });
                    });
                    describe('updateOne', () => {
                        let response = null;
                        const testResult = { hgfhgfhfghgf: 'qeawfsg' };
                        beforeAll(async() => {
                            __MONGO_DRIVER__.updateOne.mockResolvedValueOnce(testResult);
                            response = await collection.updateOne(testPayload);
                        });
                        test('calls native Mongo.updateOne with transformed payload', async() => {
                            expect(__MONGO_DRIVER__.updateOne).toHaveBeenCalledWith(testPayload);
                        });
                        test('returns expected result', () => {
                            expect(response).toMatchObject({ value: concatFoo(testResult) });
                        });
                    });
                    describe('findOne', () => {
                        let response = null;
                        const testResult = { hgfhgfhfghgf: 'qeawfsg' };
                        beforeAll(async() => {
                            __MONGO_DRIVER__.findOne.mockResolvedValueOnce(testResult);
                            response = await collection.findOne(testPayload);
                        });
                        test('calls native Mongo.updateOne with expected payload', async() => {
                            expect(__MONGO_DRIVER__.findOne).toHaveBeenCalledWith(testPayload);
                        });
                        test('returns expected result', () => {
                            expect(response).toMatchObject({ value: concatBaz(testResult) });
                        });
                    });
                });
            });
        });
    });
});
