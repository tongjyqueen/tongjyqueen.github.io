/**
*  @file hot_product.js 热卖产品库页面逻辑控制
*  @author wangkui
*  @date 2015-07-15 
**/

$(function(){
    //点击产品图片，跳转到对应页面
    $(".content").on("click",".list-item img",function(){
        location.assign("product_detail.html")
    })
    
    //点击生成二维码
    var btn = $(".list-item").find("button");
    btn.on("click",function(){
    	alert("开始生成二维码咯")
    })
})