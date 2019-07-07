import moduleCJS from './dist/mongo.cjs';
import moduleESM from './dist/mongo.esm';

describe('main', () => {
    test('exports are importable', () => {
        expect(moduleCJS).toBeFunction();
        expect(moduleESM).toBeFunction();
    });
});
