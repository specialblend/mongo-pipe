import * as R from 'ramda';
import assert from '@specialblend/assert';

/**
 * Infinite arity memoize
 * @type {function}
 */
export const memoizeAll = R.memoizeWith(R.unapply(R.identity));

/**
 * Returns true if expression is empty or nil (null or undefined)
 * @type {function}
 */
export const isEmptyOrNil = R.either(R.isEmpty, R.isNil);

/**
 * Bind method to constructed spec
 * @type {function}
 */
export const bindMethod = R.converge(R.bind, [R.prop(R.__), R.identity]);

/**
 * Construct collection spec from a list of underlying method names
 * @type {function}
 */
export const buildSpec = R.converge(R.zipObj, [R.identity, R.map(bindMethod)]);

/**
 * Validate Mongo client
 * @param {Client} client Mongo client
 * @returns {void}
 */
export const validateClient = function validateClient(client) {
    assert(!isEmptyOrNil(client), 'client cannot be empty or nil');
    assert(R.is(Object, client), 'client must be object');
    assert(R.has('collection', client), 'client must have property `collection`');
    assert(typeof client.collection === 'function', '`client.collection` must be function');
};

/**
 * Validate Mongo collection name
 * @param {string} name Mongo collection name
 * @returns {void}
 */
export const validateCollectionName = function validateCollectionName(name) {
    assert(!isEmptyOrNil(name), 'Mongo collection name cannot be empty or nil');
    assert(R.is(String, name), 'Mongo collection name must be string');
};
