/* eslint-disable padded-blocks */

import {
    always,
    converge,
    curry,
    flatten,
    head,
    is,
    map,
    objOf,
    omit,
    pathSatisfies,
    pick,
    pipe,
    prop,
    then,
    unapply,
    unless,
    useWith,
    when,
} from 'ramda';
import { pipeSpecs } from './common';

const isArray = Array.isArray;
const opIsOk = pathSatisfies(Boolean, ['result', 'ok']);
const flattenChild = when(is(Object), unless(isArray, flatten));
const flattenChildren = map(flattenChild);
const getOps = prop('ops');
const getFirstOp = pipe(getOps, head);
const withId = pick(['id']);
const withoutId = omit(['id']);
const withSet = objOf('$set');
const toArray = Array.from;

export const withSetProps = pipe(withoutId, flattenChildren, withSet);

/**
 * Call primary async handler and return
 * if first result satisfies predicate, otherwise
 * call secondary handler
 * @type {Function}
 */
const eitherAsync = curry(
    (predicate, primary, secondary) =>
        async(...payload) => {
            const response = await primary(...payload);
            if (predicate(response)) {
                return response;
            }
            return secondary(...payload);
        }
);

const returnOriginal = false;

/**
 * Add helper methods to collection object
 * @param {Object} collection Mongo collection object
 * @returns {object} collection with helper methods
 */
const withHelperMethods = collection => {

    /**
     * Extract native methods
     */
    const { find, findOne, findOneAndUpdate, insertOne, remove } = collection;

    /**
     * Local helpers
     */
    const updatePropsWithId = converge(findOneAndUpdate, [withId, withSetProps, always({ returnOriginal })]);

    /**
     * Exported helper methods
     */
    const all = pipe(find, then(toArray));
    const createOne = pipe(insertOne, then(getFirstOp));
    const findOneById = useWith(findOne, [withId]);
    const removeOneById = pipe(withId, remove);
    const updateOneById = pipe(updatePropsWithId, then(getFirstOp));
    const upsertOneById = pipe(eitherAsync(opIsOk, updatePropsWithId, insertOne), then(getFirstOp));

    const pipeTransformers = unapply(pipeSpecs(collection));

    return Object.assign(collection, {
        all,
        createOne,
        findOneById,
        updateOneById,
        upsertOneById,
        removeOneById,
        pipe: pipeTransformers,
    });
};

export default withHelperMethods;
