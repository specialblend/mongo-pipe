import * as R from 'ramda';

/**
 * Builds a transformer spec
 * @type {function}
 * @param {object} spec transformed spec
 * @returns {function} transformed spec
 */
const constructTransformer = spec => R.evolve(R.map(R.curryN(2, R.pipe), spec));

/**
 * Takes a mongo-pipe constructor and
 * returns a transformed mongo-pipe constructor
 * according to provided spec
 * @param {function} target mongo-pipe constructor
 * @param {object} transformerSpec transformer spec
 * @returns {Function|*} transformed mongo-pipe constructor
 */
const transformCollection = (target, transformerSpec) =>
    R.pipeP(
        target,
        constructTransformer(transformerSpec),
    );

export default transformCollection;
