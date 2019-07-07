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
    or,
    pick,
    pipe,
    prop,
    then, unapply,
    unless,
    useWith,
    when,
} from 'ramda';
import { pipeSpecs } from './common';

const eitherAsync = curry((primary, secondary) => async(...payload) => or(await primary(...payload), secondary(...payload)));
const isArray = Array.isArray;
const flattenChild = when(is(Object), unless(isArray, flatten));
const flattenChildren = map(flattenChild);
const getOpsData = pipe(prop('ops'), head);
const withId = pick(['id']);
const withoutId = omit(['id']);
const withSet = objOf('$set');
const withSetProps = compose(withSet, flattenChildren, withoutId);
const toArray = invoker(0, 'toArray');

const withHelperMethods = collection => {
    const { find, findOne, updateOne, insertOne, remove } = collection;

    const findOneById = useWith(findOne, [withId]);
    const updateOneById = converge(updateOne, [withId, withSetProps]);
    const createOne = pipe(insertOne, then(getOpsData));
    const upsertOneById = eitherAsync(updateOne, createOne);
    const removeOneById = pipe(withId, remove);
    const all = pipe(find, toArray);
    const pipeTransformers = unapply(pipeSpecs(collection));

    return Object.assign(collection, {
        findOneById,
        updateOneById,
        createOne,
        upsertOneById,
        removeOneById,
        all,
        pipe: pipeTransformers,
    });
};

export default withHelperMethods;
