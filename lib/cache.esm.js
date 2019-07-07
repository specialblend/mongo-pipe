import LRU from 'lru-cache';
import { either, isEmpty, isNil, evolve, prop, always, when, curry, compose, converge, pipe, tap } from 'ramda';

const isEmptyOrNil = either(isEmpty, isNil);

const defaultCacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 60,
};

const createCache = options => {
    const cache = new LRU(options);
    const cacheGet = cache.get.bind(cache);
    const cacheSet = curry((key, value) => {
        cache.set(key, value);
        return value;
    });
    const cacheClear = cache.del.bind(cache);
    const cacheBy = curry((selector, handler) =>
        either(compose(cacheGet, selector), converge(cacheSet, [selector, handler])),
    );

    const bustCacheBy = curry((selector, handler) =>
        pipe(tap(compose(cacheClear, selector)), handler),
    );
    return { cacheGet, cacheSet, cacheClear, cacheBy, bustCacheBy };
};

const createDefaultCacheMap = (options = defaultCacheOptions) => {
    const { cacheBy, bustCacheBy } = createCache(options);
    const selectById = prop('id');
    const selectAll = always('*');
    const selectFind = when(isEmptyOrNil, selectAll);
    return {
        find: cacheBy(selectFind),
        findOne: cacheBy(selectById),
        updateOne: bustCacheBy(selectById),
        insertOne: bustCacheBy(selectAll),
    };
};

const withCache = function withCache(target, cacheMap = createDefaultCacheMap()) {
    return evolve(cacheMap, target);
};

export { defaultCacheOptions, withCache };
