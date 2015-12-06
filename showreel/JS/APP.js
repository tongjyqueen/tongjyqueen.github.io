/**
* @file APP.js 定义`APP`命名空间，以及整体框架
* @author zhaowei
* @dep Zepto.js, gmu.js
*/

APP = {
    /**/
    noop: function () {
        /**
        * @method noop No-Operation
        * @desc a reference for empty functions
        */
    },

    init: function (postInit) {
        console.log('APP app init start');
        /**
        * @method init
        * @desc called on page ready
        */
        this.initConfig();
        this.pageInit();
        //this.checkLogin(postInit);
        console.log('APP app init over');
    },
    
    checkLogin: function (postLogin) {
        if (this.loginUser()) {
            console.log('already login');
            postLogin();
            return;
        }
        // need login
        this.getLoginInfo(function(user){
            if (!(user&&user.userid)) {
                console.log('获取查勘员信息失败，请重新打开查勘员应用。');
                APP.alert({
                    message: '获取查勘员信息失败，请重新打开查勘员应用。',
                    callback: function() {
                        history.back();
                    }
                });
                return;
            }
            APP.loginUser(user);
            console.log('login success');
            postLogin();
        });
    },
    
    ready: function (readyTodo) {
        /**
        * @method ready
        * @param readyTodo 框架初始化完成之后运行该函数
        * @desc 入口函数——框架初始化完毕
        *       可以在readyTodo中运行页面逻辑
        */
        try {
        readyTodo = readyTodo || this.noop;
        Zepto(function ($) {
           /* if (cpic.isRunByApp) {
                $(document).one('deviceready', function(){
                    console.log('deviceready');
                    APP.init(readyTodo);
                }, false);
            } else {*/
                APP.init(readyTodo);
            //}
        });
        } catch(e) {
            alert('JavaScript异常'+e.message);
        }
    }
};