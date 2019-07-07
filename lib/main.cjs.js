'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var assert = _interopDefault(require('@specialblend/assert'));
var ramda = require('ramda');

/**
 * Infinite arity memoize
 * @type {function}
 */
const memoizeAll = ramda.memoizeWith(ramda.unapply(ramda.identity));

/**
 * Returns true if expression is empty or nil (null or undefined)
 * @type {function}
 */
const isEmptyOrNil = ramda.either(ramda.isEmpty, ramda.isNil);

/**
 * Bind function to provided object
 * @param {object} obj object to bound to
 * @returns {function} bound function
 */
const bindTo = obj => ramda.bind(ramda.__, obj);

/**
 * binary pipe
 * @type {function}
 */
const pipe2 = ramda.compose(ramda.curry, ramda.binary)(ramda.pipe);

/**
 * Transform spec before target handler
 * @type {function}
 */
const pipeSpec = ramda.useWith(ramda.evolve, [ramda.map(pipe2), ramda.identity]);

/**
 * Apply list of specs to target handler
 * @param {object} target target handler
 * @param {[object]} pipeline list of specs
 * @returns {function} function
 */
const pipeSpecs = ramda.curry(
    (target, pipeline) => ramda.call(ramda.pipe(...ramda.map(pipeSpec, pipeline)), target)
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
const explicateNativeMethods = ramda.converge(ramda.map, [bindTo, ramda.pick(nativeSpecMethods)]);

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
const setupPipe = target => ramda.mergeRight(target, {
    pipe: (...pipeline) => pipeSpecs(target, pipeline),
});

/**
 * create mongo-pipe object
 * @type {function}
 */
const connect = ramda.pipe(ramda.call, ramda.then(ramda.pipe(explicateNativeMethods, setupPipe)));

/**
 * mongo-pipe constructor
 * @type {function}
 * @param {function} factory native Mongo collection factory
 * @param {string} name Mongo collection name
 * @returns {object} mongo-pipe collection
 */
const withCollection = ramda.compose(ramda.curry, memoizeAll)((factory, name) => {
    validateFactory(factory);
    validateCollectionName(name);
    return connect(factory, name);
});

var main = { withCollection, pipeSpec };

module.exports = main;
