import packageJSON from './package.json';

export default [
    {
        input: 'src/mongo.js',
        output: [
            {
                name: 'mongo',
                file: packageJSON.main,
                format: 'cjs',
            },
            {
                name: 'mongo',
                file: packageJSON.module,
                format: 'esm',
            },
        ],
    },
    {
        input: '__mocks__/mongodb.js',
        output: {
            name: 'mongodb',
            file: 'mock/mongodb.js',
            format: 'cjs',
        },
    },
    {
        input: '__mocks__/mongo-pipe.js',
        output: {
            name: 'mongo-pipe',
            file: 'mock/mongo-pipe.js',
            format: 'cjs',
        },
    },
];
