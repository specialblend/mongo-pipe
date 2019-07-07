'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var LRU = _interopDefault(require('lru-cache'));
var ramda = require('ramda');

const isEmptyOrNil = ramda.either(ramda.isEmpty, ramda.isNil);

const defaultCacheOptions = {
    max: 500,
    maxAge: 1000 * 60 * 60,
};

const createCache = options => {
    const cache = new LRU(options);
    const cacheGet = cache.get.bind(cache);
    const cacheSet = ramda.curry((key, value) => {
        cache.set(key, value);
        return value;
    });
    const cacheClear = cache.del.bind(cache);
    const cacheBy = ramda.curry((selector, handler) =>
        ramda.either(ramda.compose(cacheGet, selector), ramda.converge(cacheSet, [selector, handler])),
    );

    const bustCacheBy = ramda.curry((selector, handler) =>
        ramda.pipe(ramda.tap(ramda.compose(cacheClear, selector)), handler),
    );
    return { cacheGet, cacheSet, cacheClear, cacheBy, bustCacheBy };
};

const createDefaultCacheMap = (options = defaultCacheOptions) => {
    const { cacheBy, bustCacheBy } = createCache(options);
    const selectById = ramda.prop('id');
    const selectAll = ramda.always('*');
    const selectFind = ramda.when(isEmptyOrNil, selectAll);
    return {
        find: cacheBy(selectFind),
        findOne: cacheBy(selectById),
        updateOne: bustCacheBy(selectById),
        insertOne: bustCacheBy(selectAll),
    };
};

const withCache = function withCache(target, cacheMap = createDefaultCacheMap()) {
    return ramda.evolve(cacheMap, target);
};

exports.defaultCacheOptions = defaultCacheOptions;
exports.withCache = withCache;
