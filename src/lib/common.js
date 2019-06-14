import * as R from 'ramda';

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
