import { compose, evolve, identity, map, pipe, then, useWith } from 'ramda';
import { pipeAfter, pipeBefore } from './common';
import withCollection from './mongo';

const map2 = compose(map, map);
const before = map2(pipeBefore);
const after = map2(pipeAfter);
const mapPipeline = pipeline => pipe(...map(evolve, pipeline));
const usePipeline = compose(then, mapPipeline);
const useFactory = identity;
const transform = useWith(compose, [usePipeline, useFactory]);

/**
 * extend target constructor
 * and apply pipeline of spec transformations
 * @param {[object]} pipeline list of transformer spec objects to apply
 * @param {function} target collection constructor to extend
 * @returns {function} transformed factory
 */
export function transformSpec(pipeline, target = withCollection) {
    return transform(pipeline, target);
}

export function pipeSpec(pipeline, target) {
    return transformSpec(before(pipeline), target);
}

export function composeSpec(pipeline, target) {
    return transformSpec(after(pipeline), target);
}
