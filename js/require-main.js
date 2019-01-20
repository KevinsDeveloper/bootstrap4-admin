require.config({
    urlArgs: "v=",
    packages: [{
        name: 'moment',
        location: '../libs/moment',
        main: 'moment'
    }
    ],
    //在打包压缩时将会把include中的模块合并到主文件中
    include: ['css', 'layer', 'toastr', 'fast'],
    paths: {
        'lang': "empty:",
        'form': 'require-form',
        'table': 'require-table',
        'upload': 'require-upload',
        'validator': 'require-validator',
        'drag': 'jquery.drag.min',
        'drop': 'jquery.drop.min',
        'echarts': 'echarts.min',
        'echarts-theme': 'echarts-theme',
        'adminlte': 'adminlte',
        'bootstrap-table-commonsearch': 'bootstrap-table-commonsearch',
        'bootstrap-table-template': 'bootstrap-table-template',
        //
        // 以下的包从bower的libs目录加载
        'jquery': '../../vendor/jquery/jquery.min',
        'bootstrap': '../../vendor/bootstrap/js/bootstrap.min',
        'raphael': '../../vendor/raphael/raphael.min',
        'morris': '../../vendor/morrisjs/morris.min',
    },
    // shim依赖配置
    shim: {
        'addons': ['base'],
        'bootstrap': ['jquery', 'base'],
        'bootstrap-table': {
            deps: [
                'bootstrap',
                // 'css!../libs/bootstrap-table/dist/bootstrap-table.min.css'
            ],
            exports: '$.fn.bootstrapTable'
        },
        'bootstrap-table-lang': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-export': {
            deps: ['bootstrap-table', 'tableexport'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-mobile': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-advancedsearch': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-commonsearch': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-template': {
            deps: ['bootstrap-table', 'template'],
            exports: '$.fn.bootstrapTable.defaults'
        },
    },
    baseUrl: '../dist/js/', //资源基础路径
    map: {
        '*': {
            'css': '../libs/require-css/css.min'
        }
    },
    waitSeconds: 30,
    charset: 'utf-8' // 文件编码
});

require(['jquery', 'bootstrap'], function ($, undefined) {
    //初始配置
    var Config = requirejs.s.contexts._.config.config;
    //将Config渲染到全局
    window.Config = Config;
    // 配置语言包的路径
    var paths = {};
    paths['lang'] = '';
    // 避免目录冲突
    paths['module/'] = 'module/';
    require.config({ paths: paths });
    
    // // 初始化
    $(function () {
        require(['fast'], function (Fast) {
            //加载相应模块
            if (Config.jsname) {
                require([Config.jsname], function (Controller) {
                    Controller[Config.actionname] != undefined && Controller[Config.actionname]();
                }, function (e) {
                    console.error(e);
                    // 这里可捕获模块加载的错误
                });
            }
        });
    });
});
