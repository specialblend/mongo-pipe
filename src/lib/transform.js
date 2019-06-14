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
 * Validate transform target
 * @param {function} target target
 * @returns {void}
 */
const validateTarget = function validateTarget(target) {
    assert(!isEmptyOrNil(target), '`target` cannot be empty or nil');
    assert(typeof target === 'function', '`target` must be function');
};

/**
 * Validate transformerSpec
 * @param {object} transformerSpec spec
 * @returns {void}
 */
const validateTransformerSpec = function validateTransformerSpec(transformerSpec) {
    assert(!isEmptyOrNil(transformerSpec), '`transformerSpec` cannot be empty or nil');
    assert(typeof transformerSpec === 'object', '`transformerSpec` must be object');
};

/**
 * Takes a mongo-pipe constructor and
 * returns a transformed mongo-pipe constructor
 * according to provided spec
 * @param {function} target mongo-pipe constructor
 * @param {object} transformerSpec transformer spec
 * @returns {Function|*} transformed mongo-pipe constructor
 */
const transform = function transform(target, transformerSpec) {
    validateTarget(target);
    validateTransformerSpec(transformerSpec);
    return R.pipeP(
        target,
        constructTransformer(transformerSpec),
    );
};

export default transform;
