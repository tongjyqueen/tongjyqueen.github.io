/**
*  @file confirm_pay_union_success.js 银联支付成功页面逻辑控制
*  @author wangkui
*  @date 2015-07-15 
**/

$(function(){
    //点击保单详情或返回首页，跳转到其它页面
    (function addListernerToLink(){
    	$(".operate_btn").on("click",".tip-btn",function(){
	    	var btn = $(this).attr("data-operate");
	    	switch(btn){
	    	    case "detail-btn":
	    	    location.assign("order_detail.html");//投保单保障一览页面
	    	    break;
	    	    case "index-btn":
	    	    location.assign("product_detail.html");//首页
	    	    break;
	        }
	    })
    })();
    
})