import { MongoClient } from 'mongodb';
import { converge, curry, map, pick, pipe, then } from 'ramda';

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

/**
 * Handle Mongo connection
 * @type {Function}
 */
const withConnection = curry(
    (connection, dbName, collectionName) =>
        setupCollection(
            connection
                .db(dbName)
                .collection(collectionName),
        ),
);

/**
 * Connect to Mongo and return a curried connection handler
 * @type {Function}
 */
const mongo = pipe(connect, then(withConnection));

export default mongo;
