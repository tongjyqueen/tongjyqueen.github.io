/**
*  @file health_declare.js 健康告知页面逻辑控制
*  @author wangkui
*  @date 2015-07-15 
**/

$(function(){

	//首次进入页面显示引导层
    if (showTip("health_declare")) {
        $(".prop").show();
        $(".shade").show();
    }

	//关闭引导页弹出层以及遮罩
	$(".prop").on("click",function(){
		$(this).hide();
		$(".shade").hide();
	})
	
	//点击是、否按钮，弹出、关闭备注框
	$(".btn-group").on("click",".button",function(){
		$(this).addClass("theme-back").removeClass("gray")
		.siblings().addClass("gray").removeClass("theme-back");//点击是、否按钮，被选中的添加颜色
		var btn = $(this).attr("data-opearate");
		switch(btn){
			case "show-remark": //选中是
			$(this).parent().siblings(".remark").removeClass("hide").find("textarea").addClass("show");
			break;
			case "hide-remark": //选中否
			$(this).parent().siblings(".remark").addClass("hide").find("textarea").removeClass("show");
			break;
		}
	})
	
	//点击下一步按钮，跳转到提交订单页面
	$(".contorl-footer").on("click",function(){
		var arr1 = $(".content").find(".theme-back"); //‘是’‘否’按钮被选中的数组
		if(arr1.length === 3){ //至少选了三个按钮
			var arr2 = $(".show"); //‘是’按钮被选中的数组，即有备注框
			if(arr2.length > 0){
				for( var i = 0; i < arr2.length; i++){
                    if ($(arr2[i]).val().length < 10) { //文本域至少输入10个字符
                    	APP.toast({message:"备注信息至少输入10个字"});
                    	//alert("备注信息至少输入10个字");
                    	$(arr2[i]).focus();
                    	return false;
                    }
				}
			}
		}else{
			APP.toast({message:"请将调查表填写完整"});
			return false;
		}
		 location.assign("submit_order.html");
	});

	//点击返回按钮，返回产品详情页面
	var btn = $(".top_header").find(".ion-ios-arrow-left");
    btn.on("click",function(){
        location.assign("product_detail.html");
    })
	
	
})