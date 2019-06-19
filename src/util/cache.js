import LRU from 'lru-cache';
import { compose, converge, curry, either, evolve, identity, pipe, prop, tap, unary } from 'ramda';

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
    return { cacheGet, cacheSet, cacheClear };
};

const cacheBy = curry((selector, { cacheGet, cacheSet }, handler) =>
    either(compose(cacheGet, selector), converge(cacheSet, [selector, handler])),
);

const bustCacheBy = curry((selector, { cacheClear }, handler) =>
    pipe(tap(compose(cacheClear, selector)), handler),
);

export function withCache(target, options = defaultCacheOptions) {
    const cache = createCache(options);
    const selector = prop('id');
    return evolve(
        {
            findOne: cacheBy(selector, cache),
            updateOne: bustCacheBy(selector, cache),
        },
        target);
}
