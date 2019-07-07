import moment from 'moment';
import { memoizeWith, unapply, identity, either, isEmpty, isNil, compose, curry, binary, pipe, useWith, evolve, map, call, set, lensProp } from 'ramda';

/**
 * Infinite arity memoize
 * @type {function}
 */
const memoizeAll = memoizeWith(unapply(identity));

/**
 * Returns true if expression is empty or nil (null or undefined)
 * @type {function}
 */
const isEmptyOrNil = either(isEmpty, isNil);

/**
 * binary pipe
 * @type {function}
 */
const pipe2 = compose(curry, binary)(pipe);

/**
 * Transform spec before target handler
 * @type {function}
 */
const pipeSpec = useWith(evolve, [map(pipe2), identity]);

/**
 * Apply list of specs to target handler
 * @param {object} target target handler
 * @param {[object]} pipeline list of specs
 * @returns {function} function
 */
const pipeSpecs = curry(
    (target, pipeline) => call(pipe(...map(pipeSpec, pipeline)), target)
);

/**
 * Inject provided/current time as `createdAt`
 * @param {object} props props
 * @param {moment} now current time
 * @returns {function} transformer
 */
const injectCreatedAt = (props, now = moment()) => set(lensProp('createdAt'), now, props);

/**
 * Inject provided/current time as `updatedAt`
 * @param {object} props props
 * @param {moment} now current time
 * @returns {function} transformer
 */
const injectUpdatedAt = (props, now = moment()) => set(lensProp('updatedAt'), now, props);

/**
 * Inject current time on inserts and updates
 * @type {{insertOne: (function(*=): (Function|*)), updateOne: (function(*=): (Function|*))}}
 */
const injectTimestamps = {
    insertOne: injectCreatedAt,
    updateOne: injectUpdatedAt,
};

/**
 * Create a collection factory that
 * injects current time on inserts and updates
 * @param {function} factory parent factory
 * @returns {function} new factory
 */
const withTimestamps = pipeSpec(injectTimestamps);

export { withTimestamps };
