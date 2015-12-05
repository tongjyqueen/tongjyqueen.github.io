// JavaScript Document



(function(){
	
var added = false;

window.myCalendar = function(oText){
	
	oText.onfocus = function(){
		oDiv.style.left = this.offsetLeft + "px";
		oDiv.style.top  = this.offsetTop + this.offsetHeight + "px";
		oDiv.style.display = "block";
	};
	
	var oDiv = document.createElement("div");
	
	oDiv.className = "calendar";
	document.body.appendChild(oDiv);
	
	oDiv.innerHTML = '<a class="prev" href="javascript:;">&lt;&lt;</a>\
	<a class="next" href="javascript:;">&gt;&gt;</a>\
    <span>2015年11月</span>\
    <ol>\
	    <li class="week_end">日</li>\
    	<li>一</li>\
    	<li>二</li>\
    	<li>三</li>\
    	<li>四</li>\
    	<li>五</li>\
    	<li class="week_end">六</li>\
    </ol>\
    <ul>\
    </ul>';
	
	
	var oPrev = oDiv.children[0];
	var oNext = oDiv.children[1];
	var oSpan = oDiv.children[2];
	var oUl   = oDiv.children[4];
	
	var iNow = 0;
	
	oPrev.onclick = function(){
	   	iNow--;
		refresh();
	};
	oNext.onclick = function(){
	   	iNow++;
		refresh();
	};
	
	refresh();
	function refresh(){
		
		oUl.innerHTML = "";
		//显示当前月
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oSpan.innerHTML = oDate.getFullYear() +"年"+ (oDate.getMonth()+1) +"月";
		
		
		//补空白
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		
		oDate.setDate(1);
		
		var day = oDate.getDay();  //[0-6]
		
		if(day == 0){
			day = 7;
		}
		
		day;
		
		var count = 0;
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setDate(0);
		
		var t = oDate.getDate();
		
		for(var i = 0; i < day; i++){
			var oLi = document.createElement("li");
			
			oLi.innerHTML = t + 1 - day + count;
			oLi.className = "past";
			count++;
			oUl.appendChild(oLi);
		}

				
		//当天几号
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		var today = oDate.getDate();
		
		//计算当月天数
		var oDate = new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		
		oDate.setDate(1);
		oDate.setMonth(oDate.getMonth()+1);
		oDate.setDate(0);
		
		var total = oDate.getDate();
		
		//创建li
		
		for(var i = 1; i <= total; i++){
			var oLi = document.createElement("li");
			
			oLi.innerHTML = i;
			
			if(iNow == 0){
				
				if(today == i){
					oLi.className = "today";
				}
				
			}
			
			oUl.appendChild(oLi);
			
			//添加点击事件
			oLi.onclick = function(){
				//2015-11-05
				var oDate = new Date();
				oDate.setMonth(oDate.getMonth() + iNow);
				oText.value = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + this.innerHTML;
				oDiv.style.display = "none";
			};
			
			
			//添加over out事件
			oLi.onmouseover = function(){
				
				this.style.background = "#F9F";
			};
			
			oLi.onmouseout = function(){
				
				this.style.background = "";
			};
			
		
		}
		
		
		//周末变红
		for(var i = 0; i < oUl.children.length; i++){
			
			if(oUl.children[i].className == ""){
				if(i%7 == 0 || i%7 == 6){
					oUl.children[i].className = "week_end";
				}
			}
			
		}
	
	
	   //补月末的空白li
	   
		//alert(42 - oUl.children.length)
		var n = 42 - oUl.children.length;
		for(var i = 1 ; i <= n; i++){
			
			var oLi = document.createElement('li');
			oLi.innerHTML = i;
			oLi.className = "past";
			
			oUl.appendChild(oLi);
		}
	}
	
	
	if(!added){
		var oLink = document.createElement("link");
	
	    oLink.rel = "stylesheet";
		oLink.href = "css/myCalendar.css";
		document.body.appendChild(oLink);
	}
	
	
}

})();