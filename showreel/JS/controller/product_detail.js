/**
*  @file product_detail.js 产品详情页面逻辑控制
*  @author wangkui
*  @date 2015-07-15 
**/

$(function(){

   //首次进入页面显示引导层
    if (showTip("product_detail")) {
        $(".prop").show();
        $(".shade").show();
    }

	//关闭引导页弹出层以及遮罩
	$(".prop").on("click",function (){
		$(this).hide();
		$(".shade").hide();
	})

    /*
	初始化按钮切换
	@param 第一个参数 为按钮组上的ID，
	@param 第二个参数为点击之后执行的回调函数
	*/
	new APP.Btn2Groups('#taocan_btn',function(btn){
		alert($(btn).hasClass("active"));
	});
	
    //点击立即投保按钮，跳转到健康告知页面
    $(".confirm-btn").on("click",function (){
        location.assign("health_declare.html");
    })
   
    //点击详情按钮，跳转到产品介绍界面
    var checkBtn = $(".header-right");
    checkBtn.on("click",function (){
        location.assign("product_introduce.html");
    })

})
