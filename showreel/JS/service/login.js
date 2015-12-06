(function ($) {
    var exports,
        getLoginInfo,
        loginUser;
        
    getLoginInfo = function (loginSuccess) {
        var mode, user = {};
        mode = APP.env.mode;
       
        if (mode === 'DEV') {
            loginUser({
                username: 'test',
                userid: '21423'
            });
        }

    };
    
    loginUser = function (user) {
        var storageKey = APP.storageKey.loginUser;
        user = user || null;
        if (user === null) {
            return JSON.parse(sessionStorage.getItem(storageKey));
        } else {
            sessionStorage.setItem(storageKey, JSON.stringify(user));
        }
    };
    
    exports = {loginUser: loginUser, getLoginInfo: getLoginInfo};
    $.extend(APP, exports);
})(window.Zepto);
