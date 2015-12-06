/**
* @file http.js AJAX methods
* @author zhaowei
*/
(function ($) {
    var exports, getJSON, getMessageId;
    
    getMessageId = function () {
        /**
        * @method getMessageId 生成一个随机编号，用于调用数据接口时传递`messageId`字段
        */
        return new Date().getTime() + Math.ceil(Math.random() * 9);
    };
    
    getJSON = function (params, transCode, postSuccess, silent) {
        /**
        * @method getJson
        * @param params {Object}
        * @param transCode {String}
        * @param postSuccess {Function} ajax调用成功（ajax请求&&接口返回正确数据）之后的回调函数
        * @param silent {Boolean} 是否为静默调用，如果不是，则显示“加载中”遮罩层，并且弹出错误提示，默认false
        */
        var METHOD = 'post',
            api = APP.env.p17_api,
            success,
            error,
            beforeSend,
            complete,
            timeout = 30 * 1000,
            commonParams = {}; // 所有接口都要用到的请求参数
        
        postSuccess = postSuccess || APP.noop;
        
        silent = silent || false;

        beforeSend = function () {
            !silent && APP.loading.show();
        };
		
        complete = function () {
            // ajax 结束后关闭遮罩            
            APP.loading.on && APP.loading.hide();
        };
        
        success = function (response) {
            console.log('AJAX response data');
            console.log(response);
            if (response.errorCode){ // 服务器异常
                APP.loading.on && APP.loading.hide();
                APP.toast({message: '系统出错（服务器异常），请联系运维中心。'});
                return;
            }
            
            if (+response.responseBody.ifSuccess || transCode === 'A0010008') {
                // transCode === 'A0010008' 时，不返回ifsuccess字段，详见接口文档
				        try {
                            postSuccess(response.responseBody);
				        } catch(e) {
                            console.log('所在文件：'+e.fileName+'<br>代码行号：'+e.lineNumber+'<br>错误消息：'+e.message);
                            APP.loading.on && APP.loading.hide();
                            APP.alert({
                                title: '系统错误',
                                message: '所在文件：'+e.fileName+'<br>代码行号：'+e.lineNumber+'<br>错误消息：'+e.message
                            });
                            //APP.toast({message: '系统出错（客户端异常），请联系运维中心。'});
				        }
            } else {
                !silent && APP.toast({
                    message: response.responseBody.returnMessage
                });
            }
        };
                
        error = function () {
            APP.toast({message: '网络请求失败，请稍后重试。'});
        };

        // encode params
        //serialize(params);

        commonParams.requestBody = {};
        commonParams.transCode = transCode;
        commonParams.requestBody.messageId = getMessageId();
        $.extend(commonParams.requestBody, params);
        commonParams.requestBody = JSON.stringify(commonParams.requestBody);

        console.log('AJAX request data');
        console.log(commonParams);
		
        $.ajax({
            type: METHOD,
            url: api,
            data: commonParams,
            dataType: 'json',
            cache: false,
            contentType: 'application/x-www-form-urlencoded;' + (transCode !== 'A0010008' ? ' charset=utf-8' : ''),
            timeout: timeout,
            success: success,
            error: error,
            beforeSend: beforeSend,
            complete: complete
        });
    };
    
    exports = {getJSON: getJSON, getMessageId: getMessageId};
    $.extend(APP, exports);
})(window.Zepto);