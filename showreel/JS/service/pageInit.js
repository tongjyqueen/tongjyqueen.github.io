/**
* @file pageInit.js 页面公用元素初始化，主要是为页头上的按钮绑定事件
* @author zhaowei
*/
(function ($) {
    var exports, pageInit;
    
    pageInit = function () {
        var pageBackBtn = $('.page-back'),      // 返回前页按钮
            menuMoreBtn = $('.menu-more');      // 弹出“更多”小菜单按钮

        pageBackBtn.on('click', function () {
            history.back();
        });

        menuMoreBtn.on('click', function () {
            if (APP.tipover) {
                APP.tipover.toggle();
            }
        });
    };
    
    exports = {pageInit: pageInit};
    $.extend(APP, exports);
})(window.Zepto);