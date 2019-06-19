import assert from '@specialblend/assert';
import {
    applySpec,
    binary,
    call,
    compose,
    converge,
    curry,
    identity,
    map,
    mergeRight, objOf,
    pick,
    pipe, then,
    unapply,
} from 'ramda';
import { bindTo, isEmptyOrNil, memoizeAll, pipeSpec, pipeSpecs } from './common';

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
    assert(typeof name === 'string', 'collection `name` must be string');
};

/**
 * Setup pipe
 * @param {object} target target
 * @returns {object} target
 */
const setupPipe = target => mergeRight(target, {
    pipe: (...pipeline) => pipeSpecs(target, pipeline),
});

/**
 * create mongo-pipe object
 * @type {function}
 */
const connect = pipe(call, then(pipe(explicateNativeMethods, setupPipe)));

/**
 * mongo-pipe constructor
 * @type {function}
 * @param {function} factory native Mongo collection factory
 * @param {string} name Mongo collection name
 * @returns {object} mongo-pipe collection
 */
const withCollection = compose(curry, memoizeAll)((factory, name) => {
    validateFactory(factory);
    validateCollectionName(name);
    return connect(factory, name);
});

export default withCollection;
