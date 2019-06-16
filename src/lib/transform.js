import { curry, evolve, pipe, then } from 'ramda';
import assert from '@specialblend/assert';
import { isEmptyOrNil } from './common';

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
 * @param {[string]} methods list of methods to bind
 * @returns {Function|*} transformed mongo-pipe constructor
 */
const transform = curry(function transform(transformerSpec, target) {
    validateTarget(target);
    validateTransformerSpec(transformerSpec);
    return pipe(
        target,
        then(evolve(transformerSpec)),
    );
});

export default transform;
