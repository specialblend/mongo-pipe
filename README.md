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

