import {
    compose,
    converge,
    curry,
    flatten,
    head,
    invoker,
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
const isOk = pathSatisfies(Boolean, ['result', 'ok']);
const flattenChild = when(is(Object), unless(isArray, flatten));
const flattenChildren = map(flattenChild);
const getOps = prop('ops');
const getFirstOp = pipe(getOps, head);
const withId = pick(['id']);
const withoutId = omit(['id']);
const withSet = objOf('$set');
export const withSetProps = compose(withSet, flattenChildren, withoutId);
const toArray = Array.from;

const eitherAsync = curry(
    (primary, secondary) =>
        async(...payload) => {
            const response = await primary(...payload);
            if (isOk(response)) {
                return response;
            }
            return secondary(...payload);
        }
);

const withHelperMethods = collection => {
    const { find, findOne, updateOne, insertOne, remove } = collection;

    const all = pipe(find, then(toArray));
    const createOne = pipe(insertOne, then(getFirstOp));
    const findOneById = useWith(findOne, [withId]);
    const removeOneById = pipe(withId, remove);
    const updatePropsWithId = converge(updateOne, [withId, withSetProps]);
    const updateOneById = pipe(updatePropsWithId, then(getFirstOp));
    const upsertOneById = pipe(eitherAsync(updatePropsWithId, insertOne), then(getFirstOp));

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
