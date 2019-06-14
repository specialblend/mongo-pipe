import * as R from 'ramda';
import { buildSpec, isEmptyOrNil, memoizeAll } from './common';
import assert from '@specialblend/assert';

/**
 * List of native Mongo collection methods to proxy
 * @type {*[]}
 */
const nativeSpecMethods = ['insertOne', 'findOne'];

/**
 * Native Mongo spec
 * @type {object}
 */
const nativeSpec = buildSpec(nativeSpecMethods);

/**
 * Validate Mongo client
 * @param {Client} client Mongo client
 * @returns {void}
 */
const validateClient = function validateClient(client) {
    assert(!isEmptyOrNil(client), '`client` cannot be empty or nil');
    assert(R.is(Object, client), '`client` must be object');
    assert(R.has('collection', client), '`client` must have property `collection`');
    assert(typeof client.collection === 'function', '`client.collection` must be function');
};

/**
 * Validate Mongo collection name
 * @param {string} name Mongo collection name
 * @returns {void}
 */
const validateCollectionName = function validateCollectionName(name) {
    assert(!isEmptyOrNil(name), 'collection `name` cannot be empty or nil');
    assert(R.is(String, name), 'collection `name` must be string');
};

/**
 * Returns a memoized native Mongo collection
 * @type {function}
 * @param {Client} client native Mongo client
 * @params {string} name Mongo collection name
 */
const connect = R.curryN(2, memoizeAll(function connect(client, name) {
    validateClient(client);
    validateCollectionName(name);
    return client.collection(name);
}));

/**
 * Constructs a mongo-pipe collection from a native Mongo connection
 * @type {function}
 */
const construct = R.applySpec(nativeSpec);

/**
 * Connects to Mongo and
 * resolves to a mongo-pipe collection
 * @type {function}
 * @param {Client} client native Mongo client
 * @params {string} name Mongo collection name
 */
const withCollection = R.pipeP(connect, construct);

export default withCollection;
