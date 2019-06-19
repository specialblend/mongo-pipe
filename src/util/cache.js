import LRU from 'lru-cache';
import { converge, curry, either, evolve, identity, pipe, tap } from 'ramda';

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

const handleCacheGet = curry(({ cacheGet, cacheSet }, handler) =>
    either(cacheGet, converge(cacheSet, [identity, handler])),
);

const handleCacheBust = curry(({ cacheClear }, handler) =>
    pipe(tap(cacheClear), handler),
);

export function withCache(target, options = defaultCacheOptions) {
    const cache = createCache(options);
    return evolve(
        {
            findOne: handleCacheGet(cache),
            updateOne: handleCacheBust(cache),
        },
        target);
}
