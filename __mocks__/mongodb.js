import { always, length, times, zipObj } from 'ramda';
import { nativeSpecMethods } from '../src/manifest';

export const MockCollection = zipObj(nativeSpecMethods, times(() => jest.fn(), length(nativeSpecMethods)));

export const MockDatabase = {
    collection: jest.fn(always(MockCollection)),
};

export const MockConnection = {
    db: jest.fn(always(MockDatabase)),
};

const connect = jest.fn(async() => MockConnection);

export const MongoClient = {
    connect,
};
