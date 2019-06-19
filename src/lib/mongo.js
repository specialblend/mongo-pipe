import assert from '@specialblend/assert';
import { binary, compose, curry, is, map, mergeRight, pick, pipe } from 'ramda';
import { bindTo, isEmptyOrNil, memoizeAll, pipeSpec } from './common';

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

const explicateNativeMethods = collection => pipe(
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
const withCollection = compose(curry, binary(memoizeAll))(
    async function connect(factory, name) {
        validateFactory(factory);
        validateCollectionName(name);
        const target = await factory(name).then(explicateNativeMethods);
        return mergeRight(target, {
            pipe: (...specPipeline) => pipe(...map(pipeSpec, specPipeline))(target),
        });
    }
);

export default withCollection;
