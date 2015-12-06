/**
* @file config.js 应用配置项管理的API
* @author zhaowei
* @deps APP.js 依赖于APP命名空间
*/
(function ($) {
    var exports, configs, setConfig, getConfig, storageKey, initConfig;
    
    storageKey = APP.storageKey.appConfig;
    
    configs = {
        // 配置项初始值
        // 此处可修改初始值
        // 此处还可新增、删除配置项
        autoPopupTask: true
    };
    
    function notifyAppVoiceAlert() {
        /**
        * 通知App（安卓、IOS）进行新任务语音播报配置项调整
        * @param operation {Boolean}
        */
        var operation = APP.getConfig('voiceAlert');
        cpic.AppInfo.setMessagePlayStatus({
            isMessagePlay: Number(operation),
            callback: function(code, msg, data) {
            }
        });
        /*cpic.AppInfo.getMessagePlayStatus({
            callback: function(code, msg, data){
            }
        });*/
    };

    initConfig = function () {
        if (localStorage.getItem(storageKey)) return;
        localStorage.setItem(storageKey, JSON.stringify(configs));
        // 设置App端新任务语音播报配置
    };
    
    setConfig = function (item, value) {
        var configs = JSON.parse(localStorage.getItem(storageKey));
        configs[item] = value;
        localStorage.setItem(storageKey, JSON.stringify(configs));
        // 设置App端新任务语音播报配置
        
    };
                             
    getConfig = function (item) {
        var configs = JSON.parse(localStorage.getItem(storageKey));
        return configs[item];
    };
    
    exports = {
        setConfig: setConfig,
        getConfig: getConfig,
        initConfig: initConfig
    };
    
    // 将exports中的属性和方法拓展到APP命名空间
    $.extend(APP, exports);
})(window.Zepto);