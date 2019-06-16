import {
    bind,
    compose,
    either,
    flip,
    identity,
    isEmpty,
    isNil,
    memoizeWith,
    pipe, then,
    unapply,
} from 'ramda';

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

/**
 * Returns a function
 * that calls handler
 * with result of calling pipeline
 * @param {[function]} pipeline list of functions
 * @returns {function(*=)} pipeline
 */
export const pipeBefore = (...pipeline) => target => pipe(...pipeline, target);

/**
 * Returns a function
 * that calls pipeline
 * with result of calling handler
 * @param {[function]} pipeline list of functions
 * @returns {function(*=)} pipeline
 */
export const pipeAfter = (...pipeline) => target => pipe(target, then(pipe(...pipeline)));
