import packageJSON from './package.json';

export default
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
    plugins: ['rollup-plugin-json'],
};
