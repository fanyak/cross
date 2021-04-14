import { nodeResolve } from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';


// REF: https://github.com/rollup/plugins/tree/master/packages/node-resolve
// rollup --config
export default {
    input: 'public/main.mjs',
    output: {
        file: 'public/bundle.js',
        format: 'es'
    },
    plugins: [
        // minifyHTML(),
        nodeResolve()
    ],
    preserveEntrySignatures: false,
};

/// USE  POLIFYLLS
// https://developers.google.com/web/fundamentals/web-components/shadowdom#support


// LEGACY BUNDLE
// import resolve from '@rollup/plugin-node-resolve';
// import babel from '@rollup/plugin-babel';
// import commonjs from '@rollup/plugin-commonjs';
// import minifyHTML from 'rollup-plugin-minify-html-literals';


// const babelConfig = {
//     babelrc: false,
//     ...{
//         presets: [
//             [
//                 '@babel/preset-env',
//                 {
//                     targets: {
//                         ie: '11',
//                     },
//                 },
//             ],
//         ],
//     },
// };

// const configs = [
//     // The main JavaScript bundle for older browsers that don't support
//     // JavaScript modules or ES2015+.
//     {
//         input: ['public/main.mjs'],
//         output: {
//             dir: 'public/legacyBundle',
//             format: 'systemjs',
//         },
//         plugins: [
//             // minifyHTML(),
//             babel(babelConfig),
//             resolve(),
//             //copy(copyConfig),
//         ],
//         preserveEntrySignatures: false,
//     },

//     // Babel polyfills for older browsers that don't support ES2015+.
//     {
//         input: 'babel-polyfills-nomodule.js',
//         output: {
//             file: 'public/babel-polyfills-nomodule.js',
//             format: 'iife',
//         },
//         plugins: [commonjs({ include: ['node_modules/**'] }), resolve()],
//     },
// ]

// export default configs;
