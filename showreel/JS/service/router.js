/**
* @file router.js 路由服务，实现页面跳转及参数传递
* @author zhaowei@ihandy.cn
*/
(function ($) {
    var exports, // 将要导出到APP命名空间的容器
        redirect,
        getParams;
    
    redirect = function (page, qs) {
        /**
        * @method redirect 页面跳转方法
        * @param page {String} e.g. "my-task"
        * @param qs {Object} queryString 对象 e.g. {taskId: 24214, message: "hi"}，
        *           参数值为String类型，如果需要传递Object，需要先使用JSON.stringfy转成String，然后在接收参数的页面还原成对象
        */
        var baseUrl, search = '', targetUrl;
        baseUrl = location.href.split('html/')[0]+'html/';
        
        for (var key in qs) {
            search += (key + '=' + encodeURIComponent(qs[key]));
            search += '&';
        }
        search = search.slice(0, -1); // 去除结尾的"&"
        targetUrl = baseUrl + page + '.html?' + search;
        location.assign(targetUrl);
    };
        
    getParams = function () {
        /**
        * @method getParams 获取url中的查询字符串并转换为名值对
        */
        var qs = location.search, params = {};
        qs = qs.slice(1); // 去除开头的"?"
        qs = qs.split('&');
        
        qs.forEach(function (item) {
            if (item === '') return;
            
            item = item.split('=');
            params[item[0]] = decodeURIComponent(item[1]);
        });
        
        return params;
    };
    
    exports = {
        redirect: redirect,
        getParams: getParams
    };

    $.extend(APP, exports);
})(window.Zepto);