import {
    __,
    binary,
    bind,
    call,
    compose,
    curry,
    evolve,
    identity,
    map,
    memoizeWith,
    pipe,
    unapply,
    useWith,
} from 'ramda';

/**
 * Infinite arity memoize
 * @type {function}
 */
export const memoizeAll = memoizeWith(unapply(identity));

/**
 * Bind function to provided object
 * @param {object} obj object to bound to
 * @returns {function} bound function
 */
export const bindTo = obj => bind(__, obj);

/**
 * binary pipe
 * @type {function}
 */
export const pipe2 = compose(curry, binary)(pipe);

/**
 * Transform spec before target handler
 * @type {function}
 */
export const pipeSpec = useWith(evolve, [map(pipe2), identity]);

/**
 * Apply list of specs to target handler
 * @param {object} target target handler
 * @param {[object]} pipeline list of specs
 * @returns {function} function
 */
export const pipeSpecs = curry(
    (target, pipeline) => call(pipe(...map(pipeSpec, pipeline)), target)
);
