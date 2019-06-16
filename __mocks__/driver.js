export const __REF__ = Symbol('__REF__');

const __NATIVE_METHOD_ASYNC__ = () => null;

export const __MONGO_DRIVER__ = {
    aggregate: jest.fn(__NATIVE_METHOD_ASYNC__),
    bulkWrite: jest.fn(__NATIVE_METHOD_ASYNC__),
    count: jest.fn(__NATIVE_METHOD_ASYNC__),
    countDocuments: jest.fn(__NATIVE_METHOD_ASYNC__),
    createIndex: jest.fn(__NATIVE_METHOD_ASYNC__),
    createIndexes: jest.fn(__NATIVE_METHOD_ASYNC__),
    deleteMany: jest.fn(__NATIVE_METHOD_ASYNC__),
    deleteOne: jest.fn(__NATIVE_METHOD_ASYNC__),
    distinct: jest.fn(__NATIVE_METHOD_ASYNC__),
    drop: jest.fn(__NATIVE_METHOD_ASYNC__),
    dropAllIndexes: jest.fn(__NATIVE_METHOD_ASYNC__),
    dropIndex: jest.fn(__NATIVE_METHOD_ASYNC__),
    dropIndexes: jest.fn(__NATIVE_METHOD_ASYNC__),
    ensureIndex: jest.fn(__NATIVE_METHOD_ASYNC__),
    estimatedDocumentCount: jest.fn(__NATIVE_METHOD_ASYNC__),
    find: jest.fn(__NATIVE_METHOD_ASYNC__),
    findAndModify: jest.fn(__NATIVE_METHOD_ASYNC__),
    findAndRemove: jest.fn(__NATIVE_METHOD_ASYNC__),
    findOne: jest.fn(__NATIVE_METHOD_ASYNC__),
    findOneAndDelete: jest.fn(__NATIVE_METHOD_ASYNC__),
    findOneAndReplace: jest.fn(__NATIVE_METHOD_ASYNC__),
    findOneAndUpdate: jest.fn(__NATIVE_METHOD_ASYNC__),
    geoHaystackSearch: jest.fn(__NATIVE_METHOD_ASYNC__),
    group: jest.fn(__NATIVE_METHOD_ASYNC__),
    indexes: jest.fn(__NATIVE_METHOD_ASYNC__),
    indexExists: jest.fn(__NATIVE_METHOD_ASYNC__),
    indexInformation: jest.fn(__NATIVE_METHOD_ASYNC__),
    initializeOrderedBulkOp: jest.fn(__NATIVE_METHOD_ASYNC__),
    initializeUnorderedBulkOp: jest.fn(__NATIVE_METHOD_ASYNC__),
    insert: jest.fn(__NATIVE_METHOD_ASYNC__),
    insertMany: jest.fn(__NATIVE_METHOD_ASYNC__),
    insertOne: jest.fn(__NATIVE_METHOD_ASYNC__),
    isCapped: jest.fn(__NATIVE_METHOD_ASYNC__),
    listIndexes: jest.fn(__NATIVE_METHOD_ASYNC__),
    mapReduce: jest.fn(__NATIVE_METHOD_ASYNC__),
    options: jest.fn(__NATIVE_METHOD_ASYNC__),
    parallelCollectionScan: jest.fn(__NATIVE_METHOD_ASYNC__),
    reIndex: jest.fn(__NATIVE_METHOD_ASYNC__),
    remove: jest.fn(__NATIVE_METHOD_ASYNC__),
    rename: jest.fn(__NATIVE_METHOD_ASYNC__),
    replaceOne: jest.fn(__NATIVE_METHOD_ASYNC__),
    save: jest.fn(__NATIVE_METHOD_ASYNC__),
    stats: jest.fn(__NATIVE_METHOD_ASYNC__),
    update: jest.fn(__NATIVE_METHOD_ASYNC__),
    updateMany: jest.fn(__NATIVE_METHOD_ASYNC__),
    updateOne: jest.fn(__NATIVE_METHOD_ASYNC__),
    watch: jest.fn(__NATIVE_METHOD_ASYNC__),
};

export class MongoCollection {
    constructor(name) {
        this.name = name;
    }
    [__REF__]() {
        return __REF__;
    }
    async aggregate(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.aggregate(...args) };
    }
    async bulkWrite(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.bulkWrite(...args) };
    }
    async count(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.count(...args) };
    }
    async countDocuments(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.countDocuments(...args) };
    }
    async createIndex(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.createIndex(...args) };
    }
    async createIndexes(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.createIndexes(...args) };
    }
    async deleteMany(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.deleteMany(...args) };
    }
    async deleteOne(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.deleteOne(...args) };
    }
    async distinct(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.distinct(...args) };
    }
    async drop(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.drop(...args) };
    }
    async dropAllIndexes(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.dropAllIndexes(...args) };
    }
    async dropIndex(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.dropIndex(...args) };
    }
    async dropIndexes(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.dropIndexes(...args) };
    }
    async ensureIndex(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.ensureIndex(...args) };
    }
    async estimatedDocumentCount(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.estimatedDocumentCount(...args) };
    }
    async find(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.find(...args) };
    }
    async findAndModify(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.findAndModify(...args) };
    }
    async findAndRemove(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.findAndRemove(...args) };
    }
    async findOne(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.findOne(...args) };
    }
    async findOneAndDelete(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.findOneAndDelete(...args) };
    }
    async findOneAndReplace(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.findOneAndReplace(...args) };
    }
    async findOneAndUpdate(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.findOneAndUpdate(...args) };
    }
    async geoHaystackSearch(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.geoHaystackSearch(...args) };
    }
    async group(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.group(...args) };
    }
    async indexes(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.indexes(...args) };
    }
    async indexExists(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.indexExists(...args) };
    }
    async indexInformation(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.indexInformation(...args) };
    }
    async initializeOrderedBulkOp(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.initializeOrderedBulkOp(...args) };
    }
    async initializeUnorderedBulkOp(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.initializeUnorderedBulkOp(...args) };
    }
    async insert(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.insert(...args) };
    }
    async insertMany(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.insertMany(...args) };
    }
    async insertOne(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.insertOne(...args) };
    }
    async isCapped(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.isCapped(...args) };
    }
    async listIndexes(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.listIndexes(...args) };
    }
    async mapReduce(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.mapReduce(...args) };
    }
    async options(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.options(...args) };
    }
    async parallelCollectionScan(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.parallelCollectionScan(...args) };
    }
    async reIndex(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.reIndex(...args) };
    }
    async remove(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.remove(...args) };
    }
    async rename(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.rename(...args) };
    }
    async replaceOne(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.replaceOne(...args) };
    }
    async save(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.save(...args) };
    }
    async stats(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.stats(...args) };
    }
    async update(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.update(...args) };
    }
    async updateMany(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.updateMany(...args) };
    }
    async updateOne(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.updateOne(...args) };
    }
    async watch(...args) {
        return { ref: this[__REF__], result: await __MONGO_DRIVER__.watch(...args) };
    }
}

export const __MONGO_CLIENT__ = jest.fn(async name => new MongoCollection(name));

export const __MONGO_CLIENT_ERR__ = new Error('__MONGO_CLIENT_ERR__');
