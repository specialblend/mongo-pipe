import { bind, compose, either, flip, identity, isEmpty, isNil, memoizeWith, unapply } from 'ramda';

/**
 * Infinite arity memoize
 * @type {function}
 */
export const memoizeAll = compose(memoizeWith, unapply)(identity);

/**
 * Returns true if expression is empty or nil (null or undefined)
 * @type {function}
 */
export const isEmptyOrNil = either(isEmpty, isNil);

/**
 * Bind function to provided object
 */
export const bindTo = flip(bind);
