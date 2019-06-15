import moduleES from './dist/main.esm';
import moduleCJS from './dist/main.cjs';

import * as utilES from './dist/util.cjs';
import * as utilCJS from './dist/util.cjs';

describe('main', () => {
    const expectedExport = {
        withCollection: expect.any(Function),
        transform: expect.any(Function),
    };
    test('exports are importable', () => {
        expect(moduleES).toMatchObject(expectedExport);
        expect(moduleCJS).toMatchObject(expectedExport);
    });
});

describe('util', () => {
    const expectedExport = {
        withTimestamps: expect.any(Function),
    };
    test('exports are importable', () => {
        expect(utilES).toMatchObject(expectedExport);
        expect(utilCJS).toMatchObject(expectedExport);
    });
});
