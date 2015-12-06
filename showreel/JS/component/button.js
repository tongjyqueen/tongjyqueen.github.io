/*
* 连在一起两个按钮的按钮组件
* @author liangxiaojun
Btn2Groups ： 两个按钮切换组件
*/
;(function($){
	 var exports,    // 将要拓展到APP命名空间的容器
        Btn2Groups;   
	 Btn2Groups = function(domId,callback){
		this.groups = $(domId);
		this.swichover(callback);
	}
	/*
	* @切换方法
	* @param callback 点击之后调用的函数，并将点击的按钮对象作为回调的参数
	*/
	Btn2Groups.prototype.swichover = function(callback){
			this.groups.on('click', '.btn2',function(){
				if(!$(this).hasClass('active')){
					$(this).addClass("active").siblings().removeClass("active");
					callback(this);
				}
			})
		}
	exports = {Btn2Groups:Btn2Groups};
	$.extend(APP,exports);

})(window.Zepto)