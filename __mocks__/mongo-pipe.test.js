import mongo, { MockCollection, MockHandler } from '../src/mongo';

jest.mock('../src/mongo', () => require('./mongo-pipe'));

test('foo', async() => {
    const withDB = await mongo('mongodb.example.com');
    const collectionFoo = withDB('test.db.name', 'test.collection');

    expect(MockHandler).toHaveBeenCalledWith('test.db.name', 'test.collection');

    const mockPayload = Symbol('mock:payload');

    await collectionFoo.createOne(mockPayload);

    expect(MockCollection.createOne).toHaveBeenCalledWith(mockPayload);
});
