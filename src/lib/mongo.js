import * as R from 'ramda';
import assert from '@specialblend/assert';

import { buildSpec, isEmptyOrNil, memoizeAll } from './common';

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
    assert(!isEmptyOrNil(client), 'Mongo client cannot be empty or nil');
    assert(!isEmptyOrNil(name), 'Mongo collection name cannot be empty or nil');
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
