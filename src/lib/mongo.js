import * as R from 'ramda';
import { buildSpec, memoizeAll } from './common';

/**
 * List of native Mongo collection methods to proxy
 * @type {*[]}
 */
export const nativeSpecMethods = ['insertOne', 'findOne'];

/**
 * Native Mongo spec
 * @type {object}
 */
export const nativeSpec = buildSpec(nativeSpecMethods);

/**
 * Returns a memoized native Mongo collection
 * @type {function}
 * @param {Client} client native Mongo client
 * @params {string} name Mongo collection name
 */
export const connect = R.curryN(2, memoizeAll((client, name) => client.collection(name)));

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
const withCollection = R.pipe(connect, construct);

export default withCollection;
