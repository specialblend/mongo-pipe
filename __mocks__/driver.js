export const __REF__ = Symbol('__REF__');

export const __MONGO_DRIVER__ = {
    aggregate: jest.fn(),
    bulkWrite: jest.fn(),
    count: jest.fn(),
    countDocuments: jest.fn(),
    createIndex: jest.fn(),
    createIndexes: jest.fn(),
    deleteMany: jest.fn(),
    deleteOne: jest.fn(),
    distinct: jest.fn(),
    drop: jest.fn(),
    dropAllIndexes: jest.fn(),
    dropIndex: jest.fn(),
    dropIndexes: jest.fn(),
    ensureIndex: jest.fn(),
    estimatedDocumentCount: jest.fn(),
    find: jest.fn(),
    findAndModify: jest.fn(),
    findAndRemove: jest.fn(),
    findOne: jest.fn(),
    findOneAndDelete: jest.fn(),
    findOneAndReplace: jest.fn(),
    findOneAndUpdate: jest.fn(),
    geoHaystackSearch: jest.fn(),
    group: jest.fn(),
    indexes: jest.fn(),
    indexExists: jest.fn(),
    indexInformation: jest.fn(),
    initializeOrderedBulkOp: jest.fn(),
    initializeUnorderedBulkOp: jest.fn(),
    insert: jest.fn(),
    insertMany: jest.fn(),
    insertOne: jest.fn(),
    isCapped: jest.fn(),
    listIndexes: jest.fn(),
    mapReduce: jest.fn(),
    options: jest.fn(),
    parallelCollectionScan: jest.fn(),
    reIndex: jest.fn(),
    remove: jest.fn(),
    rename: jest.fn(),
    replaceOne: jest.fn(),
    save: jest.fn(),
    stats: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    updateOne: jest.fn(),
    watch: jest.fn(),
};

export class MongoCollection {
    constructor(name) {
        this.name = name;
    }
    [__REF__]() {
        return __REF__;
    }
    async aggregate(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.aggregate(...args) };
    }
    async bulkWrite(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.bulkWrite(...args) };
    }
    async count(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.count(...args) };
    }
    async countDocuments(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.countDocuments(...args) };
    }
    async createIndex(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.createIndex(...args) };
    }
    async createIndexes(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.createIndexes(...args) };
    }
    async deleteMany(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.deleteMany(...args) };
    }
    async deleteOne(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.deleteOne(...args) };
    }
    async distinct(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.distinct(...args) };
    }
    async drop(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.drop(...args) };
    }
    async dropAllIndexes(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.dropAllIndexes(...args) };
    }
    async dropIndex(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.dropIndex(...args) };
    }
    async dropIndexes(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.dropIndexes(...args) };
    }
    async ensureIndex(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.ensureIndex(...args) };
    }
    async estimatedDocumentCount(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.estimatedDocumentCount(...args) };
    }
    async find(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.find(...args) };
    }
    async findAndModify(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.findAndModify(...args) };
    }
    async findAndRemove(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.findAndRemove(...args) };
    }
    async findOne(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.findOne(...args) };
    }
    async findOneAndDelete(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.findOneAndDelete(...args) };
    }
    async findOneAndReplace(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.findOneAndReplace(...args) };
    }
    async findOneAndUpdate(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.findOneAndUpdate(...args) };
    }
    async geoHaystackSearch(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.geoHaystackSearch(...args) };
    }
    async group(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.group(...args) };
    }
    async indexes(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.indexes(...args) };
    }
    async indexExists(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.indexExists(...args) };
    }
    async indexInformation(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.indexInformation(...args) };
    }
    async initializeOrderedBulkOp(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.initializeOrderedBulkOp(...args) };
    }
    async initializeUnorderedBulkOp(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.initializeUnorderedBulkOp(...args) };
    }
    async insert(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.insert(...args) };
    }
    async insertMany(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.insertMany(...args) };
    }
    async insertOne(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.insertOne(...args) };
    }
    async isCapped(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.isCapped(...args) };
    }
    async listIndexes(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.listIndexes(...args) };
    }
    async mapReduce(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.mapReduce(...args) };
    }
    async options(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.options(...args) };
    }
    async parallelCollectionScan(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.parallelCollectionScan(...args) };
    }
    async reIndex(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.reIndex(...args) };
    }
    async remove(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.remove(...args) };
    }
    async rename(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.rename(...args) };
    }
    async replaceOne(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.replaceOne(...args) };
    }
    async save(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.save(...args) };
    }
    async stats(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.stats(...args) };
    }
    async update(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.update(...args) };
    }
    async updateMany(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.updateMany(...args) };
    }
    async updateOne(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.updateOne(...args) };
    }
    async watch(...args) {
        return { ref: this[__REF__], result: __MONGO_DRIVER__.watch(...args) };
    }
}

export const __MONGO_CLIENT__ = {
    collection: jest.fn(async name => new MongoCollection(name)),
};
