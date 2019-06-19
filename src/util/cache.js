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
    const cacheBy = curry((selector, handler) =>
        either(compose(cacheGet, selector), converge(cacheSet, [selector, handler])),
    );

    const bustCacheBy = curry((selector, handler) =>
        pipe(tap(compose(cacheClear, selector)), handler),
    );
    return { cacheGet, cacheSet, cacheClear, cacheBy, bustCacheBy };
};

export function withCache(target, options = defaultCacheOptions) {
    const cache = createCache(options);
    const selector = prop('id');
    return evolve(
        {
            findOne: cache.cacheBy(selector),
            updateOne: cache.bustCacheBy(selector),
        },
        target);
}
