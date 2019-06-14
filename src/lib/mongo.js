import * as R from 'ramda';
import { buildSpec, memoizeAll, validateClient, validateCollectionName } from './common';

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
export const construct = R.applySpec(nativeSpec);

/**
 * Connects to Mongo and
 * resolves to a mongo-pipe collection
 * @type {function}
 * @param {Client} client native Mongo client
 * @params {string} name Mongo collection name
 */
const withCollection = R.pipeP(connect, construct);

export default withCollection;
