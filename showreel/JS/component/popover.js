/**
 * @file popover.js 弹出框组件
 * @author zhaowei
 */
(function($) {
	var exports, // 将要拓展到APP命名空间的容器

		alert,      // 提示框
		confirm,    // 确认框 
		flash,      // 自动消失的提示框
		loading = Loading || new Loading(),
		addOverlay, // 加入遮罩层
		addPopover, // 加入弹出层
		overlay,    // 引用遮罩层
		popover,    // 引用弹出层
		listPorover,// 弹出选择列表层
		destroy;    // 销毁dom节点

	addOverlay = function() {
		$(document.body).append('<div id="overlay" class="hide"></div>');
		overlay = $("#overlay");
	};

	addPopover = function() {
		$(document.body).append('<div id="popover-wrapper"></div>');
		popover = $("#popover-wrapper");
	};

	destroy = function() {
		overlay.remove();
		popover.remove();
	};

	/**
	 * @method alert
	 */

	flash = function(args) {
		/**
		 * @param args {Object} e.g. {message: "你确定？"}
		 */
		var title = args.title || null,
			htmlMessage = args.html || null,
			message = args.message || "",
			callback = args.callback || APP.noop;

		var html = "";

		html += '<div class="popover popover-flash"><header>';
		if (title !== null) {
			html += '<h2 class="popover-title">';
			html += title;
			html += '</h2>';
		}
		html += '</header><div class="popover-content">';

		if (htmlMessage !== null) {
			html += htmlMessage;
		} else {
			html += '<p class="popover-message">';
			html += message;
			html += '</p>';
		}

		html += '</div></div>';

		addOverlay();
		addPopover();
		overlay.removeClass("hide");
		popover.append(html);

		setTimeout(function() {
			callback();
			destroy();
		}, 3 * 1000);
	};

	alert = function(args) {
		/**
		 * @param args {Object} e.g. {message: "你确定？"}
		 */
		var title = args.title || null,
			htmlMessage = args.html || null,
			message = args.message || "",
			callback = args.callback || APP.noop,
			button = args.button || "确定";

		var html = "";

		html += '<div class="popover popover-alert"><header>';
		if (title !== null) {
			html += '<h2 class="popover-title">';
			html += title;
			html += '</h2>';
		}
		html += '</header><div class="popover-content">';

		if (htmlMessage !== null) {
			html += htmlMessage;
		} else {
			html += '<p class="popover-message">';
			html += message;
			html += '</p>';
		}

		html += '</div><footer><button id="button" class="button-cta button-cta-full"><h2>';
		html += button;
		html += '</h2></button></footer></div>';

		addOverlay();
		addPopover();
		popover.append(html);
		overlay.removeClass("hide");

		$("#button").on('click', function() {
			callback();
			destroy();
		});
	};

	/**
	 * @method confirm
	 */
	confirm = function(args) {
		/**
		 * @param args {Object} e.g. {message: "你确定？"}
		 */
		var title = args.title || null,
			htmlMessage = args.html || null,
			message = args.message || "",
			confirmCb = args.confirmCb || APP.noop,
			cancelCb = args.cancelCb || APP.noop,
			confirmBtn = args.confirmBtn || "确认",
			cancelBtn = args.cancelBtn || "取消";

		var html = "";

		html += '<div class="popover popover-comfirm"><header>';
		if (title !== null) {
			html += '<h2 class="popover-title">';
			html += title;
			html += '</h2>';
		}
		html += '</header><div class="popover-content">';

		if (htmlMessage !== null) {
			html += htmlMessage;
		} else {
			html += '<p class="popover-message">';
			html += message;
			html += '</p>';
		}

		html += '</div><footer><div class="button-cta-group-2 clearfix"><button id="confirmBtn" class="button-cta"><h2>';
		html += confirmBtn;
		html += '</h2></button><button id="cancelBtn" class="button-cta"><h2>';
		html += cancelBtn;
		html += '</h2></button></div></footer></div>';

		addOverlay();
		addPopover();
		popover.append(html);
		overlay.removeClass("hide");

		$("#confirmBtn").on('click', function() {
			confirmCb();
			destroy();
		});

		$("#cancelBtn").on('click', function() {
			cancelCb();
			destroy();
		});
	};
	/**
	 * @method toast
	 * 土司效果
	 * 调用时传入提示信息参数以： {message:'提示内容'}格式
	 */
	toast = function(args) {
		/**
		 * @param args {Object} e.g. {message: "你确定？"}
		 */
		var message = args.message || "";
		var div = $("<div class=' popover-toast'>");
		div.append('<div id="floater"></div><p class="popover-message">' + message + '</p>');
		$("body").append(div);
		setTimeout(function() { //动画先将透明度降到0，然后移除
			$('.popover-toast').eq(0).animate({
				opacity: '0'
			}, "slow").remove();
		}, 3000);

	};

	/*
	 * 加载遮罩效果
	 * 调用后记得要移除
	 * 使用：APP.loading.show();
	 * 移除：APP.loading.hide();
	 */
	function Loading() {
		this.on = false;
	}

	loading.show = function() {
		if (!this.on) {
			var load = $("<div class='popover-loading'><div class='load-img'><img src='../css/img/loading.gif'/> <p class='load-msg'>请等待...</p></div></div>");
			/*load.css({'position':'fixed','left':0,'top':0,'z-index':'100','width':'100%','height':'100%','background': '#8a8787', 'opacity': '.6',
			    'vertical-align': 'middle','text-align':'center','font-size':'1.2rem'});*/
			$("body").append(load);
			this.on = true;
		};
	}

	loading.hide = function() {
		var load;
		if (this.on) {
			load = $(".popover-loading");
			load.remove();
			this.on = false;
		};
	}
    /**
    * 页面列表选项弹窗
    * 参数：args={htmlList:['男','女'],input:'要赋值的input'}
    */
	listPorover = function(args) {
		/**
		 * @param args
		 */
		var htmlList = args.htmlList || [];
		tar = $(args.tar) || null,
		input = $(args.input) || null,
		html = "",
        pop = $(".div-popover");

        pop.on("click", function() {
            $(this).hide();
        });
        html += '<ul style="width: 88%;margin: 40% auto;">';
        for (var i=0; i< htmlList.length;i++) {
            html += '<li class="check" data-value="' + htmlList[i] + '">' + htmlList[i] + '</li>';
        }
        html += '</ul>';
        pop.html(html).show();
        //给列表设置样式及绑定事件
        pop.find("ul").css({
                "margin-top": (window.innerHeight - pop.find("ul").height()) / 2 +'px'
        });
        pop.on("click",'li', function(e) {
                $(this).addClass('check').siblings().removeClass("check");
                input.val(pop.find(".check").attr("data-value"));
        });
    };      

	exports = {
		flash: flash,
		alert: alert,
		confirm: confirm,
		toast: toast,
		loading: loading,
		listPorover: listPorover
	};
	$.extend(APP, exports);

})(window.Zepto);