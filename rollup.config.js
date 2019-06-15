import packageJSON from './package.json';

export default [
    {
        input: 'src/main.js',
        output: [
            {
                name: 'main',
                file: packageJSON.main,
                format: 'cjs',
            },
            {
                name: 'main',
                file: packageJSON.module,
                format: 'es',
            },
        ],
    },
    {
        input: 'src/util/index.js',
        output: [
            {
                name: 'util',
                file: 'dist/util.cjs.js',
                format: 'cjs',
            },
            {
                name: 'util',
                file: 'dist/util.esm.js',
                format: 'es',
            },
        ],
    },
];
