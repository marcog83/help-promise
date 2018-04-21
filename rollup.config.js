/**
 * Created by mgobbi on 19/04/2017.
 */
import resolve from 'rollup-plugin-node-resolve';
// rollup.config.js
export default {
    input: 'pall.js',

    output: {
        file: 'dist/pall.js'
        , format: 'es'
        , name: 'pall'
        , exports: 'named'
    }, plugins: [resolve()]
};
