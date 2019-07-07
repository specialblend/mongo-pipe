'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var moment = _interopDefault(require('moment'));
var ramda = require('ramda');

/**
 * Infinite arity memoize
 * @type {function}
 */
const memoizeAll = ramda.memoizeWith(ramda.unapply(ramda.identity));

/**
 * Returns true if expression is empty or nil (null or undefined)
 * @type {function}
 */
const isEmptyOrNil = ramda.either(ramda.isEmpty, ramda.isNil);

/**
 * binary pipe
 * @type {function}
 */
const pipe2 = ramda.compose(ramda.curry, ramda.binary)(ramda.pipe);

/**
 * Transform spec before target handler
 * @type {function}
 */
const pipeSpec = ramda.useWith(ramda.evolve, [ramda.map(pipe2), ramda.identity]);

/**
 * Apply list of specs to target handler
 * @param {object} target target handler
 * @param {[object]} pipeline list of specs
 * @returns {function} function
 */
const pipeSpecs = ramda.curry(
    (target, pipeline) => ramda.call(ramda.pipe(...ramda.map(pipeSpec, pipeline)), target)
);

/**
 * Inject provided/current time as `createdAt`
 * @param {object} props props
 * @param {moment} now current time
 * @returns {function} transformer
 */
const injectCreatedAt = (props, now = moment()) => ramda.set(ramda.lensProp('createdAt'), now, props);

/**
 * Inject provided/current time as `updatedAt`
 * @param {object} props props
 * @param {moment} now current time
 * @returns {function} transformer
 */
const injectUpdatedAt = (props, now = moment()) => ramda.set(ramda.lensProp('updatedAt'), now, props);

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

exports.withTimestamps = withTimestamps;
