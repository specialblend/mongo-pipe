import { always, length, times, zipObj } from 'ramda';
import { nativeSpecMethods } from '../src/manifest';

export const __MONGO_COLLECTION__ = zipObj(nativeSpecMethods, times(() => jest.fn(), length(nativeSpecMethods)));

export const __MONGO_DATABASE__ = {
    collection: jest.fn(always(__MONGO_COLLECTION__)),
};

export const __MONGO_CONNECTION__ = {
    db: jest.fn(always(__MONGO_DATABASE__)),
};

export const connect = jest.fn(async() => __MONGO_CONNECTION__);

export const MongoClient = {
    connect,
};
