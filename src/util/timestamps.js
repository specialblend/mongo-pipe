import { lensProp, pipe, set } from 'ramda';
import moment from 'moment';
import transform from '../lib/transform';

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
const withTimestampsSpec = {
    insertOne: handler => pipe(injectCreatedAt, handler),
    updateOne: handler => pipe(injectUpdatedAt, handler),
};

/**
 * Create a collection factory that
 * injects current time on inserts and updates
 * @param {function} factory parent factory
 * @returns {function} new factory
 */
export const withTimestamps = transform(withTimestampsSpec);
