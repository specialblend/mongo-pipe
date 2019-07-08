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
