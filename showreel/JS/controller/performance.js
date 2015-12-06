/**
* @author liangxiaojun
* @fileOverview performance(我的业绩)页面的相关业务逻辑
* @date 2015-07-15
**/
$(function(){
	//画布对象，宽度为频幕宽度
	var canvas = document.getElementById('saleCanvas');
	/*
	初始化按钮切换
	@param 第一个参数 为按钮组上的ID，
	@param 第二个参数为点击之后执行的回调函数
	*/
	new APP.Btn2Groups('#sales_btn',function(btn){
		alert($(btn).hasClass("active"));
	});

	//(闭包自执行)画出圆环图
	(function(){
		var s_width = window.innerWidth;
		var opts = {},
			elements = [{color:"#22c064",value:2},{color:"#e0483e",value:1},{color:"#22c064",value:''},{color:"#f7941d",value:1},{color:"blue",value:2},{color:"red",value:4}];
		elements.centerText= '您的业绩';
		if (s_width > 496) {//大分辨率下设置固定的宽度和高度
			canvas.width = s_width;
			canvas.height = 400;
			opts = {r:130,size:80,fontSize:20};//圆环半径、圆环厚度、字体大小
		}else{
			canvas.width = s_width;
			canvas.height = s_width - 80;
		}
		//new一个圆环对象并画到页面上
		new APP.Annulus(canvas,elements,opts).draw();

	})();

});
