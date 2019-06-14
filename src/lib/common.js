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
 * Bind function to provided object
 */
export const bindTo = R.flip(R.bind);
