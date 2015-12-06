$(function(){

	$(".prop").on("click",function(){
		$(this).hide();
		$(".shade").hide();
	})


	//分享提示渲染
	function renderShareTip(){
		var html = "<img src='../image/share_tip.gif' height='200' width='200'/>";
		$(".shade").html(html);
	}

	$(".share").on("click",function(){
		$(".shade").show();//弹出遮罩
		renderShareTip();
	})

	//关闭弹出框及遮罩
	$(".shade").on("click",function(){
		$(this).hide();
		// $(".alertbox").hide();
	})



    //判断有无缓存
    if (!sessionStorage.getItem("PAGE_TIPS")) {
		var html = {};
		if (APP.TIP_PAGES) {
			for(var i = 0; i < APP.TIP_PAGES.length; i++){
				html[APP.TIP_PAGES[i]] =true;
			}
		};
		var PAGE_TIPS = JSON.stringify(html);
		sessionStorage.setItem("PAGE_TIPS",PAGE_TIPS)
	}

})

//判断是否是第一次进入引导页
function showTip(page){
	var pageTip = JSON.parse(sessionStorage.getItem("PAGE_TIPS"));
	if (pageTip) {
		var flag = false;
		if (pageTip[page]) {
			flag = true;
			pageTip[page] = false;
			sessionStorage.setItem("PAGE_TIPS",JSON.stringify(pageTip));
			return flag;
		}
	}
}

/**
* @param inputId 要绑定日历输入控件的input的ID
* @param minDate 最小显示日期
* @param maxDate 最大显示日期
*/
function inputDate (inputId,minDate,maxDate){

    var fun = function () {
        $(inputId).scroller('destroy').scroller({
            preset: 'date',
            minDate: minDate || new Date(1900, 3, 10, 9, 22),
            maxDate: maxDate || new Date(2050, 7, 30, 15, 44),
//          invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] },
            theme: "android-ics light",
            mode: "scroller",
            lang: 'zh',
            display: "modal",
            animate: ""
        });
    }
    $('.settings select').bind('change', function () {
        fun();
    });
    fun();
}