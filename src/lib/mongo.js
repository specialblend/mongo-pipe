import { binary, compose, curry, is, map, pick, pipe } from 'ramda';
import assert from '@specialblend/assert';
import { bindTo, isEmptyOrNil, memoizeAll } from './common';

/**
 * List of native Mongo collection methods to proxy
 * @type {[string]}
 */
export const nativeSpecMethods = [
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

// export const explicateNativeMethods = converge(map, [bindTo, pick(nativeSpecMethods)]);

export const explicateNativeMethods = collection => pipe(
    pick(nativeSpecMethods),
    map(bindTo(collection)),
)(collection);

/**
 * Validate Mongo client
 * @param {Client} factory Mongo client
 * @returns {void}
 */
const validateFactory = function validateFactory(factory) {
    assert(!isEmptyOrNil(factory), '`factory` cannot be empty or nil');
    assert(typeof factory === 'function', '`factory` must be function');
};

/**
 * Validate Mongo collection name
 * @param {string} name Mongo collection name
 * @returns {void}
 */
const validateCollectionName = function validateCollectionName(name) {
    assert(!isEmptyOrNil(name), 'collection `name` cannot be empty or nil');
    assert(is(String, name), 'collection `name` must be string');
};

/**
 * Returns a native Mongo collection
 * @type {function}
 * @param {function} factory native Mongo collection factory
 * @param {string} name Mongo collection name
 * @returns {MongoCollection} Mongo collection
 */
export const connect = function connect(factory, name) {
    validateFactory(factory);
    validateCollectionName(name);
    return factory(name).then(explicateNativeMethods);
};

/**
 * Curried, memoized mongo-pipe constructor
 * @type {function}
 * @param {Client} client native Mongo client
 * @params {string} name Mongo collection name
 */
const withCollection = compose(curry, binary(memoizeAll))(connect);

export default withCollection;
