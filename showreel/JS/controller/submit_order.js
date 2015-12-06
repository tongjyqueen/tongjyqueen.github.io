/**
 * @file submit_order.js 提交订单页面逻辑控制
 * @author zhouxiaotian
 * @date 2015-7/16
 */
$(function() {
	//首次进入页面显示引导层
	if (showTip("submit_order")) {
		$(".prop").show();
		$(".shade").show();
	}

	//从提交订单页面返回，关闭引导页弹出层以及遮罩
	var url = location; //获取url中"?"符后的字串
	var str = url.toString();
	if (str.indexOf("?") != -1) {
		$(".prop").hide();
		$(".shade").hide();
	}

	//日历控件
	inputDate('#birthday');

	//遮罩层
	$('.prop').on("click", function() {
		$(this).hide();
		$(".shade").hide();
	});

	//给我是被保人的...文本框 绑定点击事件
	$('label.select-item').on('click', function() {
		new APP.listPorover({
			htmlList: APP.OPTION_LIST.relationType,
			input: $(this).find("input"),
			tar: $(this)
		});
	});

	//复选框
	$("#remember").on("click", function() {
		if ($('#remember').attr('checked'))
			$(".text-muted").removeClass("click icon-square").addClass("click icon-check-square");
		else
			$(".text-muted").removeClass("click icon-check-square").addClass("click icon-square");

	});
});