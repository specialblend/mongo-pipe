import assert from '@specialblend/assert';
import { memoizeWith, unapply, identity, either, isEmpty, isNil, compose, curry, binary, pipe, useWith, evolve, map, call, bind, __, converge, pick, then, mergeRight } from 'ramda';

/**
 * Infinite arity memoize
 * @type {function}
 */
const memoizeAll = memoizeWith(unapply(identity));

/**
 * Returns true if expression is empty or nil (null or undefined)
 * @type {function}
 */
const isEmptyOrNil = either(isEmpty, isNil);

/**
 * Bind function to provided object
 * @param {object} obj object to bound to
 * @returns {function} bound function
 */
const bindTo = obj => bind(__, obj);

/**
 * binary pipe
 * @type {function}
 */
const pipe2 = compose(curry, binary)(pipe);

/**
 * Transform spec before target handler
 * @type {function}
 */
const pipeSpec = useWith(evolve, [map(pipe2), identity]);

/**
 * Apply list of specs to target handler
 * @param {object} target target handler
 * @param {[object]} pipeline list of specs
 * @returns {function} function
 */
const pipeSpecs = curry(
    (target, pipeline) => call(pipe(...map(pipeSpec, pipeline)), target)
);

/**
 * List of native Mongo collection methods to proxy
 * @type {[string]}
 */
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

/**
 * Explicitly copy native methods
 * and bind them to collection
 * @type {function}
 */
const explicateNativeMethods = converge(map, [bindTo, pick(nativeSpecMethods)]);

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

var main = { withCollection, pipeSpec };

export default main;
