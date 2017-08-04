'use strict';

// @see http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
// @see https://github.com/webpack/react-starter/blob/master/make-webpack-config.js

var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var _ = require('lodash');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var srcDir = path.resolve(process.cwd(), './src');
var assets = 'build/';
var sourceMap = require('./aliasMap.json');


var excludeFromStats = [
    /node_modules[\\\/]/
];

var projectJson = require('./package.json');

function makeConf(options) {
    options = options || {};

    var debug = options.debug !== undefined ? options.debug : true;
    var entries = genEntries(); 
    var config = {
        entry: entries,
        output: {
            // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存里
            path: path.resolve(debug ? '__build' : assets),
            filename: debug ? '[name].js' : 'scripts/[name].js',
            chunkFilename: debug ? '[name][chunkhash:8].chunk.js' : 'scripts/[name][chunkhash:8].chunk.min.js',
            hotUpdateChunkFilename: debug ?'[id].[chunkhash:8].js' : 'scripts/[id].[chunkhash:8].min.js',
            /** 
            * 这里很重要，请根据需要配置发布路径
            * 若上线到服务端项目中，应配置为在项目中的web路径（以/开头，避免图片路径问题）
            * 若上线到资源服务器，请配置为'资源服务器地址/项目名称/项目版本/'，参照以下
            */

            /*发布的资源放到项目内*/
            // publicPath: debug ? '/__build/' : '/easyHu/'

            /*发布的资源放到测试资源服务器*/
            // publicPath: debug?'/__build/':'//shouyt.yijifu.net/'+projectJson.name +'/'+projectJson.version+'/'

            /*发布的资源放到线上资源服务器*/
            publicPath: debug?'/__build/':'//static.yiji.com/'+projectJson.name +'/'+projectJson.version+'/'
        },
        externals:{
            'jQuery':'window.jQuery',
            '$':'window.jQuery',
            'jquery': 'window.jQuery'
        },

        resolve: {
            root: [srcDir, path.resolve(process.cwd(), './node_modules')],
            alias: sourceMap,
            extensions: ['', '.js', '.css', '.scss', '.tpl', '.png', '.jpg', '.vue']
        },

        resolveLoader: {
            root: path.join(__dirname, 'node_modules')
        },
        module: {
            noParse: ['zepto', 'jquery'],
            loaders: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    //注意后面的name=xx，这里很重要否则打包后会出现找不到资源的
                    loader: 'url-loader?limit=1&minetype=image/jpg&name=images/[name]_[hash].[ext]'
                },
                {
                    test: /\.(woff|eot|ttf)$/i,
                    loader: 'url?limit=1&name=fonts/[name].[ext]'
                },
                {test: /\.(tpl|ejs)$/, loader: 'ejs'},
                {test: /\.js$/, exclude: /node_modules/, loader: 'babel', query:{presets: ['env']}},
                {test: /\.(handlebars|hbs)$/, loader: 'handlebars'},
                {test: /\.vue$/i, loader: 'vue'}
            ]
        },

        plugins: [
        ],

        devServer: {
            stats: {
                cached: false,
                exclude: excludeFromStats,
                colors: true
            }
        }
    };

    var pages = fs.readdirSync(srcDir); 

    var links = [];
    pages.forEach(function(filename) {
        var m = filename.match(/(.+)\.html$/);
        if(m) {

            var fileContent = fs.readFileSync(
                path.resolve(srcDir, filename), "utf-8");
            var injectReg = /\<meta\s[^\<\>]*name=\"no-need-script\"[^\<\>]*\>/;
            var inject = injectReg.test(fileContent)?false:'body';
            var title = (/<title>[^<>]*<\/title>/i).exec(fileContent)[0];
            title = title.replace(/<\/?title>/g, '');
            links.push('<li><a href="'+config.output.publicPath+m[0]+'">'+title+'-'+filename+'</a></li>');

            // @see https://github.com/kangax/html-minifier
            var conf = {
                template: 'html-withimg-loader?min=false!'+path.resolve(srcDir, filename),
                // @see https://github.com/kangax/html-minifier
                // minify: {
                //     collapseWhitespace: true,
                //     removeComments: true
                // },
                filename: filename
            };

            if(m[1] in config.entry) {
                conf.inject = inject;
                conf.chunks = ['common', m[1]];
            }

            config.plugins.push(new HtmlWebpackPlugin(conf));

            var jsPath = path.resolve(srcDir, 'scripts/', filename.replace('.html', '.js'));
            if(!injectReg.test(fileContent) && !fs.existsSync(jsPath)) {
                var fd = fs.openSync(jsPath, 'a');
                fs.appendFileSync(jsPath, '/**\n* '+filename+'的入口文件\n*/\n', {encoding: 'utf-8'});
                fs.closeSync(fd);
            }

        }
    });

    config.entry = entries = genEntries();;

    var chunks = Object.keys(entries);
    config.plugins.push(new CommonsChunkPlugin({
        name: 'common',
        chunks: chunks,
        // Modules must be shared between all entries
        minChunks: chunks.length // 提取所有chunks共同依赖的模块
    }));

    config.plugins.push(new HtmlWebpackPlugin({
        templateContent: function(){
            return '<!DOCTYPE html><html>'
            + '<style>a {background: transparent none repeat scroll 0 0;color: #2db7f5;outline: medium none;transition: color 0.3s ease 0s;}</style>'
            + '<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">'
            + '<title>目录</title><meta name="no-need-script">'
            + '</head><body><div>'
            + '<ul>'+ links.join('') + '</ul>'
            + '</body></html>'
        },
        inject: false,
        filename: '__menu.html'
    }));


    if(debug) {
        // 开发阶段，css直接内嵌
        var cssLoader = {
            test: /\.css$/,
            loader:"style-loader!css-loader"
        };
        var sassLoader = {
            test: /\.scss$/,
            loader: 'style!css!sass'
        };
        var lessLoader = {
            test: /\.less/,
            loader: 'style!css!less'
        };
        config.module.loaders.push(cssLoader);
        config.module.loaders.push(sassLoader);
        config.module.loaders.push(lessLoader);

    } else {

        // 编译阶段，css分离出来单独引入
        var cssLoader = {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?minimize') // enable minimize
        };
        /****
        注意啊，这里一定要用！写第二个参数ExtractTextPlugin.extract('style', 'css!less')，网上很多教程都是错误的
        ****/
        var lessLoader = {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        };
        var sassLoader = {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        };

        config.module.loaders.push(cssLoader);
        config.module.loaders.push(lessLoader);
        config.module.loaders.push(sassLoader);
        config.plugins.push(
            new ExtractTextPlugin('css/[name].css', {
                // 当allChunks指定为false时，css loader必须指定怎么处理
                // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
                // 第一个参数`notExtractLoader`，一般是使用style-loader
                // @see https://github.com/webpack/extract-text-webpack-plugin
                allChunks: false
            })
        );
        // 自动生成入口文件，入口js名必须和入口文件名相同
        // 例如，a页的入口文件是a.html，那么在js目录下必须有一个a.js作为入口文件
        config.plugins.push(new UglifyJsPlugin());

    }

    // 由于html压缩在dbl内部源码中，只能读取webpack配置，这儿处理一下
    config.htmlMin = options.htmlMin; 

    return config;
}

function genEntries() {
    var jsDir = path.resolve(srcDir, 'scripts');
    var names = fs.readdirSync(jsDir);
    var map = {};

    names.forEach(function(name) {
        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(jsDir, name) : '';

        if(entry) map[entry] = entryPath;
    });

    return map;
}

module.exports = makeConf;
