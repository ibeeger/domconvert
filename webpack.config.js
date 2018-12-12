const path = require('path');

const target = process.env.TG;

module.exports = {
    mode:  'production', //'development',
    entry: './libs/dom.js', //入口文件
    output: { //输出文件路径设置
        // library: target == 'commonjs' ? '' : '',
        libraryTarget: target,
        path: path.resolve(__dirname, 'dist'),
        filename: target != 'commonjs' ? 'index.js' : 'index.common.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: {
                loader: 'babel-loader'
            }
        }]
    }
}