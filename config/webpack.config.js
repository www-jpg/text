const path=require('path'); // 模块写法 nodejs
const HtmlWebpackPlugin=require('html-webpack-plugin');
const miniCssExtractPlugin=require('mini-css-extract-plugin');
const { loader } = require('mini-css-extract-plugin');
module.exports={
    mode: 'production',// development开发环境  production生产环境 压缩.优化  默认生产环境.
    entry: {
        index: './src/index.js',
        product: './src/product.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),// 打包完成输出的文件的路径
        // filename: 'index.js'// 输出文件的名称
        filename: '[name].[hash].js'
    },
    devServer:{
        contentBase: path.join(__dirname, 'dist'),
        
    },
    module: {
        rules: [ // 解析规则
            {
                test: /\.css$/,
                use: [ // 表示匹配到的文件需要哪些loader来处理
                    {loader: miniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                ]
            },
            {
                test: /\.less$/,
                use: [ // 表示匹配到的文件需要哪些loader来处理
                    {loader: miniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [ // 表示匹配到的文件需要哪些loader来处理
                    {loader: miniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            // {
            //     test: /\.(jpg|png|gif|webp|jpeg)$/,
            //     use: [ // 表示匹配到的文件需要哪些loader来处理
            //         {loader: 'file-loader'}
            //     ]
            // },
            {
                test: /\.(jpg|png|gif|webp|jpeg)$/,
                use: [ // 表示匹配到的文件需要哪些loader来处理
                    {
                        loader: 'url-loader',
                        options: {
                            limit : 102400  // 单位是byte 图片小于100k时base64
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude:/(node_modules|brower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options:{
                            presets:['env']
                        }
                    }
                ]
            }
        ] 
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '网页标题',
            template: './src/tpl.html',
            inject: 'head',
            minify: { // 压缩规则
                removeComments: false, // 是否移除注释
                removeAttributeQuotes: false, // 是否移除属性的引号
                collapseWhitespace: false //是否移除空白
            },
            filename: 'index_1.html' // 输出模板名称
        }),
        new miniCssExtractPlugin({
            filename: '[name].[hash].css',
        })
    ]
}