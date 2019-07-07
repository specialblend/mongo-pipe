import { converge, curry, map, pick, pipe, then } from 'ramda';
import { bindTo, memoizeAll } from './common';
import { MongoClient } from 'mongodb';
import { nativeSpecMethods } from './config';
import withHelperMethods from './helpers';

/**
 * Explicitly copy native methods
 * and bind them to collection
 * @type {Function}
 */
const explicateNativeMethods = converge(map, [bindTo, pick(nativeSpecMethods)]);

const setupCollection = pipe(explicateNativeMethods, withHelperMethods);

const connect = memoizeAll(MongoClient.client);

const withConnection = curry(
    (connection, dbName, collectionName) =>
        setupCollection(
            connection
                .db(dbName)
                .collection(collectionName),
        ),
);

const mongo = pipe(connect, then(withConnection));
export default mongo;
