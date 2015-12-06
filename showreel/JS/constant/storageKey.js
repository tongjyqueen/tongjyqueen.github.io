/**
* @file storageKey.js key for webstorage, including localStorage and sessionStorage
* @author zhaowei@ihandy.cn
*/
(function ($) {
    var keys,    //缓存变量键集
    option_list, //弹窗选项列表
    tip_pages; //页面操作提示缓存

    keys = {
        activeTask: 'ACT_TASK',
        alertTaskQueue: 'ALT_QUE',
        appConfig: 'USER_CONFIG',
        loginUser: 'LOGIN_USR',
        myTaskLastTab: 'LAST_TAB',
        myTaskQueryTime: 'QUERY_TIME',
        taskPre: 'TASK',            // 任务缓存的key前缀
        policyPre: 'POLICY',
        reassignLoss: 'RAS_LOSS'    // 任务改派时勾选的损失项序号（即损失项在案例对象中的损失项列表序号）'1,3'表示第2和第4项
    };

    option_list = {
        relationType:["本人","妻子","丈夫","儿子","女儿","父亲","母亲","其他"],
        idcardType:["身份证","军官证","其他"],
        sex:["男","女",'其他']
    };

    tip_pages = ['product_detail','health_declare','submit_order'];
    
    APP.TIP_PAGES = tip_pages;
    APP.OPTION_LIST = option_list;
    APP.storageKey = keys;
    
})(window.Zepto);