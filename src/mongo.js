import { MongoClient } from 'mongodb';
import { converge, curry, map, memoizeWith, pick, pipe, then } from 'ramda';

import withHelperMethods from './helpers';
import { bindTo, memoizeAll } from './common';
import { nativeSpecMethods } from './manifest';

/**
 * Explicitly copy native methods
 * and bind them to collection
 * @type {Function}
 */
const explicateNativeMethods = converge(map, [bindTo, pick(nativeSpecMethods)]);

/**
 * Setup collection
 * @type {Function}
 */
const setupCollection = pipe(explicateNativeMethods, withHelperMethods);

/**
 * Memoized connector
 */
const connect = memoizeAll(MongoClient.connect);

const makeCollection = memoizeWith(
    (connection, dbName, collectionName) => [
        connection, dbName, collectionName,
    ],
    (connection, dbName, collectionName) =>
        setupCollection(
            connection
                .db(dbName)
                .collection(collectionName),
        ),
);

/**
 * Handle Mongo connection
 * @type {Function}
 */
const withConnection = curry(makeCollection);

/**
 * Connect to Mongo and return a curried connection handler
 * @type {Function}
 */
const mongo = pipe(connect, then(withConnection));

export default mongo;
