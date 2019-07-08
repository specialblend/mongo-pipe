import { always, curryN, length, times, zipObj } from 'ramda';

const nativeSpecMethods = [
    'aggregate',
    'bulkWrite',
    'count',
    'countDocuments',
    'createIndex',
    'createIndexes',
    'deleteMany',
    'deleteOne',
    'distinct',
    'drop',
    'dropAllIndexes',
    'dropIndex',
    'dropIndexes',
    'ensureIndex',
    'estimatedDocumentCount',
    'find',
    'findAndModify',
    'findAndRemove',
    'findOne',
    'findOneAndDelete',
    'findOneAndReplace',
    'findOneAndUpdate',
    'geoHaystackSearch',
    'group',
    'indexes',
    'indexExists',
    'indexInformation',
    'initializeOrderedBulkOp',
    'initializeUnorderedBulkOp',
    'insert',
    'insertMany',
    'insertOne',
    'isCapped',
    'listIndexes',
    'mapReduce',
    'options',
    'parallelCollectionScan',
    'reIndex',
    'remove',
    'rename',
    'replaceOne',
    'save',
    'stats',
    'update',
    'updateMany',
    'updateOne',
    'watch',
];

const helperMethods = [
    'all',
    'createOne',
    'findOneById',
    'updateOneById',
    'upsertOneById',
    'removeOneById',
];

const mockedMethods = [
    ...nativeSpecMethods,
    ...helperMethods,
];

export const MockCollection = zipObj(mockedMethods, times(() => jest.fn(), length(mockedMethods)));

export const MockHandler = jest.fn(curryN(2, always(MockCollection)));

const mongo = jest.fn(async() => MockHandler);

export default mongo;
