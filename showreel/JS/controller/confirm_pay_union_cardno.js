/**
 * @file confirm_pay_union_cardNo.js 银联支付-银联卡号 页面逻辑控制
 * @author zhouxiaotian
 * @date 2015-7/16
 */
$(function() {
	
	//日历控件，具体使用参考vendor文件夹下demo以及说明
	var fun = function() {
		$('#birthday').scroller('destroy').scroller({
			preset: 'date',
			minDate: new Date(1900, 3, 10, 9, 22),
			maxDate: new Date(2050, 7, 30, 15, 44),
			theme: "android-ics light",
			mode: "scroller",
			lang: 'zh',
			display: "modal",
			animate: ""
		});
	}
	$('.settings select').bind('change', function() {
		fun();
	});
	fun();
})