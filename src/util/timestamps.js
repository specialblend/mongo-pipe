import * as R from 'ramda';
import moment from 'moment';
import transform from '../lib/transform';

/**
 * Inject current time as `createdAt`
 * @param {object} props props
 * @param {moment} now current time
 * @returns {function} transformer
 */
const injectCreatedAt = (props, now = moment()) => R.set(R.lensProp('createdAt'), now, props);

/**
 * Inject current time as `updatedAt`
 * @param {object} props props
 * @param {moment} now current time
 * @returns {function} transformer
 */
const injectUpdatedAt = (props, now = moment()) => R.set(R.lensProp('updatedAt'), now, props);

/**
 * Inject current time on inserts and updates
 * @type {{insertOne: (function(*=): (Function|*)), updateOne: (function(*=): (Function|*))}}
 */
export const withFingerprintsSpec = {
    insertOne: handler => R.pipe(injectCreatedAt, handler),
    updateOne: handler => R.pipe(injectUpdatedAt, handler),
};

/**
 * Create a collection factory that
 * injects current time on inserts and updates
 * @param {function} factory parent factory
 * @returns {function} new factory
 */
export default function withTimestamps(factory) {
    return transform(withFingerprintsSpec, factory);
}
