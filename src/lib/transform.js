import { compose, evolve, identity, map, pipe, then, useWith } from 'ramda';

import withCollection from './mongo';

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
export default function transformSpec(pipeline, target = withCollection) {
    return transform(pipeline, target);
}
