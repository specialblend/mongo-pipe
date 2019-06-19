import main from './main';
import withCollection from './lib/mongo';
import { pipeSpec } from './lib/common';

describe('main', () => {
    test('exports expected functions', () => {
        expect(main).toMatchObject({
            withCollection,
            pipeSpec,
        });
    });
});
