import { MongoClient } from 'mongodb';
import { curry, identity, memoizeWith, pipe, then, unapply } from 'ramda';

const memoize = memoizeWith(unapply(identity));

const connect = memoize(MongoClient.connect);

const withConnection = curry(memoizeWith(
    (connection, dbName, collectionName) => [
        connection, dbName, collectionName,
    ],
    (connection, dbName, collectionName) =>
        connection
            .db(dbName)
            .collection(collectionName)

));

/**
 * Connect to Mongo and return a curried connection handler
 * @type {Function}
 */
const mongo = pipe(connect, then(withConnection));

export default mongo;
