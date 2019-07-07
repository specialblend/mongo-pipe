import packageJSON from './package.json';

export default [
    {
        input: 'src/lib/mongo.js',
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
];
