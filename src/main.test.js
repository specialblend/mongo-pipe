import main from './main';
import withCollection from './lib/mongo';
import transform from './lib/transform';

describe('main', () => {
    test('exports expected functions', () => {
        expect(main).toMatchObject({
            withCollection,
            transform,
        });
    });
});
