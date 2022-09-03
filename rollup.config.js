import babel from '@rollup/plugin-babel'; // 引入babel
import commonjs from '@rollup/plugin-commonjs'; // 引入cjs插件
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 引入resolve
import { terser } from 'rollup-plugin-terser'; // 压缩打包文件
// import typescript from 'rollup-plugin-typescript2';

let {
    NODE_ENV, // 环境参数
    target, // 环境参数
} = process.env; // 环境参数
// 是否是ssr
const isSsr = target === 'ssr';
//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

const extensions = ['.js', '.jsx'];

const pkg = require('./package.json'); // 从package.json引入

const version = pkg.version; // 项目版本
const license = pkg.license; // 协议
const author = pkg.author; // 作者

// 打包文件的头部声明
const banner =
    '/*!\n' +
    ` * ${pkg.name} v${version}\n` +
    ` * (c) 2022-${new Date().getFullYear()} ${author}\n` +
    ` * Released under the ${license} License.\n` +
    ' */';

// 忽略文件
const externalConfig = [
    (id) => /\/__expample__|main.tsx/.test(id), // 组件的本地测试文件，不希望被打包。
    'react',
    'react-dom',
    'classname',
    'react-is',
    '**/node_modules/**',
];

module.exports = {
    input: 'src/index.js',
    output: [
        ...(isEnvProduction
            ? [
                  // 文件输出配置
                  {
                      file: 'dist/umd/index.min.js', // 打包后生产的文件位置，及文件名
                      format: 'umd',
                      name: 'ReactRouterDOM', // 包的全局变量名称
                      banner,
                  },
                  {
                      file: 'dist/esm/index.min.js', // 打包后生产的文件位置，及文件名
                      format: 'esm',
                      banner,
                  },
                  {
                      file: 'dist/cjs/index.min.js', // 打包后生产的文件位置，及文件名
                      format: 'cjs',
                      banner,
                  },
              ]
            : [
                  // 文件输出配置
                  {
                      file: 'dist/umd/index.js', // 打包后生产的文件位置，及文件名
                      format: 'umd',
                      name: 'ReactRouterDOM', // 包的全局变量名称
                      banner,
                  },
                  {
                      file: 'dist/esm/index.js', // 打包后生产的文件位置，及文件名
                      format: 'esm',
                      banner,
                  },
                  {
                      file: 'dist/cjs/index.js', // 打包后生产的文件位置，及文件名
                      format: 'cjs',
                      banner,
                  },
              ]),
    ],
    globals: {
        // react: 'React',
        //   'react-dom': 'ReactDOM'
    },
    plugins: [
        // 可使用 `import {module} from './file'` 替换 `import {module} from './file/index.js`
        nodeResolve({
            extensions,
            modulesOnly: true,
        }),
        // 支持commonjs，包括第三方引入使用到commonjs语法
        commonjs({
            include: ['node_modules/**'],
            // namedExports: {
            //     'node_modules/react/index.js': [
            //         'createElement',
            //         'Children',
            //         'Component',
            //         'PropTypes',
            //         'createElement',
            //     ],
            // },
        }),
        // typescript支持
        //  typescript(),
        // babel
        babel({
            exclude: '**/node_modules/**',
            babelHelpers: 'runtime',
            include: 'src/**',
            extensions,
        }),
        ...(isEnvProduction ? [terser()] : []),
    ],
    external: externalConfig,
};
