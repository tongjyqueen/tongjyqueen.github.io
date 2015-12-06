/**
 * @file user_bind.js 绑定用户页面逻辑控制
 * @author zhouxiaotian
 * @date 2015-7/24
 */
$(function() {
	//点击“绑定”，页面验证是否必填字段录入完整，
	//如录入完整，页面跳转至“热卖产品库”页面。
	//如录入不完整，页面提示：亲，必填项补充完整才可以成功绑定哦。
	$("#submit").on("click", function() {
		if(check())
			location.assign("hot_product.html");
		else
			alert('亲，必填项补充完整才可以成功绑定哦。');
	});
	
	/**
	 * @description 页面提交之前的验证
	 * @param none
	 * @author zhouxiaotian
	 * @returns true为验证通过
	 */
	function check() {
		//验证 姓名是否正确输入
		if (!$("input[name=userName]").val())
			return false;
		//验证 资格证号是否正确输入
		var idcardNo = $("input[name=qualificationNum]").val();
		if (!idcardNo)
			return false;
		//验证 手机号码是否正确
		var phone = $("input[name=phone]").val();
		if (!phone || !((/^0?(13|14|15|18|17)[0-9]{9}$/).test(phone)))
			return false;
		//验证 验证码是否正确
		var code = $("input[name=code]").val();
		if (!code)
			return false;
		return true;
	}
});