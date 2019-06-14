import moduleES from './dist/index.esm';
import moduleCJS from './dist/index.cjs';
const moduleUMD = require('./dist/index.umd');

const expectedExport = {
    withCollection: expect.any(Function),
    transform: expect.any(Function),
};

test('exports are importable', () => {
    expect(moduleUMD).toMatchObject(expectedExport);
    expect(moduleES).toMatchObject(expectedExport);
    expect(moduleCJS).toMatchObject(expectedExport);
});
