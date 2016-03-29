// JavaScript Document
var shareData = {
	title: '仅仅是把剃须刀吗？',
	desc: '超乎想象的智能理容工具，超凡脱俗的颜值养成计划，更精准的了解，更全面的呵护。',
	link: 'http://www.lvlvlaw.com/',
	imgUrl: '',
	success: function (res) {
		//_hmt.push(['_trackPageview', '/share_end']);
		//location.href="shareEnd.html";
	},
	cancel: function (res) {

	},
	fail: function (res) {

	}
}
var shareData2 = {
	title: shareData.title,
	desc: shareData.desc,
	link: shareData.link,
	imgUrl: shareData.imgUrl,
	success: shareData.success,
	cancel: shareData.cancel,
	fail: shareData.fail
}

$.ajax({
	url:"http://uniqueevents.sinaapp.com/wx/getJsAPIA.php?callback=?",
	dataType:"jsonp",
	data:{
		
		url:location.href
	}
}).done(function(data) {
	//_hmt.push(['_trackPageview', '/share_end']);
	if(data) {
		var res = data.result;
		if(res == 1) {
			  wx.config({
				debug: false,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo'
				]
			});

			wx.ready(function () {
				wx.onMenuShareAppMessage(shareData);
				wx.onMenuShareTimeline(shareData2);
			});
		} else {
			//self.showError(data.msg);
		}
	}
}).always(function() {
	
});
