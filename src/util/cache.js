import LRU from 'lru-cache';
import { __, call, compose, converge, curry, either, identity, pipe, prop, tap, then } from 'ramda';
import { transformSpec } from '../lib/transform';

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
    return [cacheGet, cacheSet];
};

const handleCache = curry(([cacheGet, cacheSet], handler) =>
    either(cacheGet, converge(cacheSet, [identity, handler]))
);

export function withCache(options = defaultCacheOptions) {
    const cache = createCache(options);
    return transformSpec([{
        findOne: handleCache(cache),
    }]);
}
