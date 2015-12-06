/**
* @file tipover.js 右上角的小型弹出菜单组件
* @author zhaowei
*/
(function ($) {
    var exports;
    
    function Tipover() {
        var html;
        
        html = '<div class="tipover hide"><nav class="navigator-attach"><ul>';
        html += '<li class="navigator-attach-item"><i class="iconfont icon-wheel"></i><a href="my-config.html">系统设置</a></li>';
        /*html += '<li class="navigator-attach-item"><i class="iconfont icon-wheel"></i><a href="cordova-test.html">TEST</a></li>';
        html += '<li class="navigator-attach-item"><i class="iconfont icon-wheel"></i><a href="http://27.115.110.208:81/property/servlet/I16Servlet">P17 TEST</a></li>';
*/
        html += '</ul></nav></div>';
   
        this.on = false;
        
        this.init = function () {
            $(document.body).append(html);            
        };
        
        this.show = function () {
            $('.tipover').removeClass('hide');
            this.on = true;
        };
        
        this.hide = function () {
            $('.tipover').addClass('hide');
            this.on = false;
        };
        
        this.toggle = function () {
            $('.tipover').toggleClass('hide');
            this.on = !this.on;
        };
    };
    
    exports = {tipover: new Tipover()};
    $.extend(APP, exports);
})(window.Zepto);