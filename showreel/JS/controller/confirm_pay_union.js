/**
 * @file confirm_pay_union.js 银联支付页面逻辑控制
 * @author zhouxiaotian
 * @date 2015-7/16
 */
$(function() {
	//给 选择证件类型文本框 绑定点击事件
	$("label.select-item").on("click", function(e) {
		new APP.listPorover({
			htmlList: APP.OPTION_LIST.idcardType,
			input: $(this).find("input"),
			tar: e.target
		});
	});

	//点击确定支付按钮，跳转到下一页
	$("div.save-btn").on("click", function() {
		if (check())
			location.assign("confirm_pay_union_cardNo.html");
		else
			alert("请先检查资料填写是否正确");
	});

	/**
	 * @description 页面提交之前的验证
	 * @param none
	 * @author zhouxiaotian
	 * @returns true为验证通过
	 */
	function check() {
		//验证 证件号码输入是否合法
		var idcardNo = $("input[name=idcardNo]").val();
		if (!idcardNo || !((/^\d{17}[\d|x]|\d{15}$/).test(idcardNo)))
			return false;
		//验证 银行账户输入是否合法
		var account = $("input[name=account]").val();
		if (!account || !((/^\d*$/).test(account)))
			return false;
		return true;
	}
})