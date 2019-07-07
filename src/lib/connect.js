import { MongoClient } from 'mongodb';
import { curry, identity, memoizeWith, pipe, then, unapply } from 'ramda';

const connect = memoizeWith(unapply(identity), MongoClient.client);
const handleQuery = curry(
    (connection, dbName, collectionName, method, ...payload) =>
        connection
            .db(dbName)
            .collection(collectionName)[method](payload)
);

const mongo = pipe(connect, then(handleQuery));
export default mongo;
