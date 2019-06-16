import { __, apply, compose, converge, curry, evolve, identity, juxt, map, pipe, then, unapply, useWith } from 'ramda';
import assert from '@specialblend/assert';
import { isEmptyOrNil, pipeBefore } from './common';

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
const validateSpec = function validateSpec(transformerSpec) {
    assert(!isEmptyOrNil(transformerSpec), '`spec` cannot be empty or nil');
    assert(typeof transformerSpec === 'object', '`spec` must be object');
};

const validateTransform = (spec, target) => {
    validateSpec(spec);
    validateTarget(target);
};


const transform = curry(function transform(spec, target) {
    validateTransform(spec, target);
    return compose(then(evolve(spec)), target);
});

/**
 * Takes a mongo-pipe constructor and
 * returns a transformed mongo-pipe constructor
 * according to provided spec
 * @param {object} spec transformer spec
 * @param {function} target mongo-pipe constructor
 * @returns {Function|*} transformed mongo-pipe constructor
 */
export default transform;


const handlePipeline = pipeline => then(apply(pipe, map(evolve, pipeline)));

export const transformSpec = unapply(useWith(compose, [handlePipeline, identity]));
