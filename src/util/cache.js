import LRU from 'lru-cache';
import { always, compose, converge, curry, either, evolve, pipe, prop, tap, when } from 'ramda';
import { isEmptyOrNil } from '../lib/common';

export const defaultCacheOptions = {
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

export const withCache = function withCache(target, options = defaultCacheOptions) {
    const cache = createCache(options);
    const idSelector = prop('id');
    const allSelector = always('*');
    const findSelector = when(isEmptyOrNil, allSelector);
    return evolve(
        {
            find: cache.cacheBy(findSelector),
            findOne: cache.cacheBy(idSelector),
            updateOne: cache.bustCacheBy(idSelector),
            insertOne: cache.bustCacheBy(allSelector),
        },
        target);
};
