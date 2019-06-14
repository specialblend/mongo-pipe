import * as R from 'ramda';

export const nativeDriver = {
    insertOne: jest.fn(),
    findOne: jest.fn(),
};

export class NativeCollection {
    async insertOne(...args) {
        return nativeDriver.insertOne(...args);
    }

    async findOne(...args) {
        return nativeDriver.findOne(...args);
    }
}

export const __generateNativeDriver__ = R.always(nativeDriver);

export const __generateClient__ = R.always({
    collection: jest.fn(async() => new NativeCollection),
});
