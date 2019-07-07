import moduleESM from './dist/main.esm';
import moduleCJS from './dist/main.cjs';

describe('main', () => {
    test('exports are importable', () => {
        expect(moduleESM).toBeFunction();
        expect(moduleCJS).toBeFunction();
    });
});
