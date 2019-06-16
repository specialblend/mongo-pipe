import moment from 'moment';
import { lensProp, set } from 'ramda';
import { pipeSpec } from '../lib/transform';

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
export const withTimestamps = pipeSpec([injectTimestamps]);
