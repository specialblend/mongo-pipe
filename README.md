# @specialblend/mongo-pipe

fluent/functional utility and wrapper around [mongodb](https://github.com/mongodb/node-mongodb-native)

## installation

`npm i @specialblend/mongo-pipe mongodb`

## usage

```ecmascript 6
import mongo from '@specialblend/mongo-pipe'

const host = 'mongodb.example.com'

const options = {
    // see mongodb docs for connection options
}

const database = 'example_database'


async function main() {

    const withDatabase = await mongo(host, options)
    const withCollection = withDatabase(database)

    const personCollection = withCollection('person')

    // or pass both database and collection at once
    
    const userCollection = withDatabase(database, 'user')

    // personCollection and userCollection 
    // have all native mongodb methods (e.g. findOne, insertOne, etc)
    // plus mongo-pipe helper methods (see below)

}
```

### helper methods

- `all([query])`: alias for `find` that casts result to Array
- `createOne(props)`: insert object into collection and return resulting object
- `findOneById(props)`: find object where ID is equal to `props.id`
- `updateOneById(props)`: update object with props where ID is equal to `props.id`
- `upsertOneById(props)`: upsert object where ID is equal to `props.id`
- `removeOneById(props)`: remove object where ID is equal to `props.id`
- `pipe(...transformers)`: map data with provided transformers before calling native methods (see below)

### pipe/transformers

(needs documentation)

### testing/mocking

This package exports two Jest mocks for your convenience.

#### mongodb

```ecmascript 6
// __mocks__/mongodb.js

export * from '@specialblend/mongo-pipe/mock/mongodb';
```

```ecmascript 6
// __mocks__/mongodb.test.js

import { MongoClient, MockCollection, MockConnection, MockDatabase } from 'mongodb';

test('foo', async() => {
    const collectionFoo = await MongoClient
        .connect('mongodb.example.com')
        .then(connection => connection.db('test.db.name').collection('test.collection'));

    expect(MockConnection.db).toHaveBeenCalledWith('test.db.name');

    expect(MockDatabase.collection).toHaveBeenCalledWith('test.collection');

    const mockPayload = Symbol('mock:payload');

    await collectionFoo.insertOne(mockPayload);

    expect(MockCollection.insertOne).toHaveBeenCalledWith(mockPayload);
});

```

#### mongo-pipe

```ecmascript 6
// __mocks__/@specialblend/mongo-pipe.js

export * from '@specialblend/mongo-pipe/mock/mongo-pipe';
```

```ecmascript 6
// __mocks__/@specialblend/mongo-pipe.test.js

import mongo, { MockCollection, MockHandler } from '@specialblend/mongo-pipe';

test('foo', async() => {
    const withDB = await mongo('mongodb.example.com')
    const collectionFoo = withDB('test.db.name', 'test.collection')

    expect(MockHandler).toHaveBeenCalledWith('test.db.name', 'test.collection');

    const mockPayload = Symbol('mock:payload');

    await collectionFoo.createOne(mockPayload);

    expect(MockCollection.createOne).toHaveBeenCalledWith(mockPayload);
});

```
