import * as R from 'ramda';
import assert from '@specialblend/assert';
import { isEmptyOrNil } from './common';

/**
 * Builds a transformer spec
 * @type {function}
 * @param {object} spec transformed spec
 * @returns {function} transformed spec
 */
const constructTransformer = spec => R.evolve(R.map(R.curryN(2, R.pipe), spec));

/**
 * Takes a mongo-pipe constructor and
 * returns a transformed mongo-pipe constructor
 * according to provided spec
 * @param {function} target mongo-pipe constructor
 * @param {object} transformerSpec transformer spec
 * @returns {Function|*} transformed mongo-pipe constructor
 */
const transform = function transform(target, transformerSpec) {
    assert(!isEmptyOrNil(target), 'transform target cannot be empty or nil');
    assert(!isEmptyOrNil(transformerSpec), 'transformerSpec target cannot be empty or nil');
    assert(typeof target === 'function', 'transform target must be a function');
    assert(typeof transformerSpec === 'object', 'transformerSpec must be an object');
    return R.pipeP(
        target,
        constructTransformer(transformerSpec),
    );
};

export default transform;
