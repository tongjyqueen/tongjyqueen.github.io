/*
* @applicant_info(投保人)页面业务逻辑
**/
$(function(){

	//给生日栏添加日期控件
	inputDate('#birthday');
    
    //证件类型栏 添加选项绑定事件
	$('.idcardtypeLabel').on('click', function(){
		new APP.listPorover({
			htmlList:APP.OPTION_LIST.relationType,
			input:$(this).find("input"),
			tar:$(this)
		});
	});

	//性别栏 添加选项绑定事件
	$('.sexLabel').on('click', function(){
		new APP.listPorover({
			htmlList:APP.OPTION_LIST.sex,
			input:$(this).find("input"),
			tar:$(this)
		});
	})
		
	
});













//模拟jquery的获取方法，减少获取元素的代码
/*function $(s){
	return document.querySelectorAll(s)
}
window.onload = function(){

	var date = $(".ion-calendar")[0];
	var dateInput = $("input[type='date']")[0];
	date.onclick = dateInput.click()
}
*/



	/*$(".ion-calendar").on("click",function(){
		$('#picktime').click(function(){
			var years =[]; 
			var nowYear = (new Date()).getFullYear()
			for(var i=1970;i< nowYear;i++){
				years.push(i)
			}
			console.log(years+"==")
			$('#picktime').mtimer({
				mode : 1, //时间选择器模式：1：年月日，2：年月日时分（24小时），3：年月日时分（12小时），4：年月日时分秒。默认：1
				format : 1, //时间格式化方式：1：2015年06月10日 17时30分46秒，2：2015-05-10  17:30:46。默认：2
				years : years, //年份数组
				nowbtn :true, //是否显示现在按钮
				onOk : function(){
					alert('OK');
				},  //点击确定时添加额外的执行函数 默认null
				onCancel : function(){
					alert('A');
				}, //点击取消时添加额外的执行函数 默认null
			});	
		})
	})*/
/*	var idcardType = '<ul class="list sexSelect" style="line-height:20px;width: 80%;margin: 50% 10%;"><li class="item check" data-value="身份证">身份证</li>'+
	'<li class="item" data-value="军官证">军官证</li><li class="item" data-value="其他">其他</li></ul>'
	nextIcon("#idcardType").on("click",function(e){
		popover(idcardType, $("#idcardType"),e.target)
		
	})
	var sex ='<ul class="list sexSelect" style="line-height:20px;width: 80%;margin: 50% 10%;"><li class="item check"  data-value="男">男</li><li class="item"  data-value="女">女</li></ul>';
	nextIcon("#sex").on("click",function(e){
		popover(sex, $("#sex"),e.target)
	})
	var time ='<ul class="pop-time sexSelect" style="width: 80%;margin: 50% 10%;background: #fff;font-size: 1.2rem;"><li class="zong check" data-value="2015年06月20日">2015年06月20日</li>'
	+'<li class="hang"><ul class="shijian"><li class="shu"><span>2014</span><span>2014</span><span>2014</span></li>'
			+'<li class="shu"><span>5月</span><span>6月</span><span>7月</span></li><li class="shu"><span>18</span><span>19</span><span>20</span></li>'
		+'</ul></li><li class="bottom"><button>确定</button><button>取消</button></li>'
	+'<div style="clear:both"></div></ul>';
	/*nextIcon("#birthday").on("click",function(e){
		popover(time, $("#birthday"),e.target)
	})
});
var tar1
function popover(content,input,tar){
	var popover = $(".div-popover")
	popover.html(content).show();
	popover.find("li").on("click", function(e){
		$(this).addClass('check').siblings().removeClass("check");
		input.val(popover.find(".check").attr("data-value"))
		popover.hide()
		e.stopPropagation()
	})
	tar1 = tar
	popover.on("click",function(){
		$(tar1).prev("input").val(popover.find(".check").attr("data-value"))
		$(this).hide()
	})
	
}

function nextIcon(inputId){
	return $(inputId).eq(0).next(".icon")
}*/