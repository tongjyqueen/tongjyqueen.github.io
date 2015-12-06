/**
* recognizee_info(被保人信息)页面业务逻辑
*  @author liangxiaojun
*  @date 2015-07-15 
**/
$(function(){
    
    //给生日栏添加日期控件 来自common.js
    inputDate('#birthday');
    
    //性别栏 添加选项绑定事件
	$('.sexLabel').on('click',function(){
		new APP.listPorover({
			htmlList:APP.OPTION_LIST.sex,
			input:$(this).find("input"),
			tar:$(this)
		});
	})
    //证件类型栏 添加选项绑定事件
	$('.idcardTypeLabel').on('click',function(){
		new APP.listPorover({
			htmlList:APP.OPTION_LIST.idcardType,
			input:$(this).find("input"),
			tar:$(this)
		});
	})
    
});