/**
 * @file confirm_pay_union_check.js 银联支付相关页面逻辑控制
 * @author zhouxiaotian
 * @date 2015-7/16
 */

$(function() {
	//给 获取手机验证码 绑定点击事件
	$("#getCode").on("click", function() {
		var mobile = $("#phone").val().trim();
		if (!mobile) {
			alert("手机号不能为空");
			return;
		}
		if (!((/^(13|14|15|18)[0-9]{9}$/).test(mobile))) {
			alert("手机号不正确哦！")
			return;
		}
		$(this).attr('disabled',true);
		var t = 59;
		alert("验证码已发出 " + t + " 秒后失效");
		var timer = setInterval(function() {
			$("#getCode").text(t + " 秒后重新获取");
			t--;
			if (t == 0) {
				clearInterval(timer);
				$("#getCode").text("获取验证码").removeAttr("disabled");
			}
		}, 1000);
	})
});