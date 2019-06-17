import LRU from 'lru-cache';
import { either, pipe, prop } from 'ramda';
import { transformSpec } from '../lib/transform';

export const defaultCacheOptions = {
    max: 500,
    length(n, key) {
        return n * 2 + key.length;
    },
    dispose(key, n) {
        n.close();
    },
    maxAge: 1000 * 60 * 60,
};

export function withCache(options = defaultCacheOptions) {
    const cache = new LRU(options);
    const getKey = pipe(prop('id'), cache.get.bind(cache));
    return transformSpec([{
        findOne: handler => either(getKey, handler),
    }]);
}
