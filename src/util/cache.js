import LRU from 'lru-cache';
import { compose, curryN, either, identity, pipe, prop, tap, then } from 'ramda';
import { transformSpec } from '../lib/transform';

export const defaultCacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 60,
};

const createCache = options => {
    const cache = new LRU(options);
    const cacheGet = cache.get.bind(cache);
    const cacheSet = curryN(2, cache.set.bind(cache));
    return [cacheGet, cacheSet];
};


export function withCache(options = defaultCacheOptions) {
    const [cacheGet, cacheSet] = createCache(options);
    return transformSpec([{
        findOne: handler =>
            either(
                cacheGet,
                props => pipe(
                    handler,
                    compose(then, tap, cacheSet)(props)
                )(props)
            ),
    }]);
}
