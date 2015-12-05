// JavaScript Document

window.onload = function(){

     
	 $oHouse = $(".house");
	 $oDesk = $(".desk");
	 $oBed = $(".bed");
	 $oHours = $(".hours");
	 $oMinutes = $(".minutes");
	 $oPattern= $(".pattern");
	 
	 
	 
	 var oHouse = $oHouse.get([0]);
	
	 var oDesk = $oDesk.get([0]);
	 var oBed = $oBed.get([0]);
	 var oHours = $oHours.get([0]);
	 var oMinutes = $oMinutes.get([0]);
	 var oPattern = $oPattern.get([0]);
	 var oMoon = $(".bg_moon").get([0]);
	 var oSun = $(".bg_sun").get([0]);
	 
	 var count = 0;
	 var minutes = 0;
	 var hours = 0;
	 var moonT = 30;
	 var moonL = 0;
	 var moonOpt = 1;
	 var CloundL = 0;
	 var deskR = 0;
	 
	
	 
	 skillClound();
	 
	 
	 
	 addLink();
	 
	
	 function addLink(){
	
		//var aLi = $(".nav").get([0]).children;
		var oCardHeadP = document.getElementById("nav");
		
		var aCardHead = oCardHeadP.children;
		
		var oUl = document.getElementById("ulIndex");
		var aCardBody = oUl.children;
		
		for(var i = 0; i < aCardBody.length; i++){
			aCardHead[i].index = i;
			aCardHead[i].onclick = function(){
				//alert(this.index)
				for(var j = 0; j < aCardHead.length; j++){
					
					move(aCardBody[j],{left:-aCardBody[j].offsetWidth,opacity:0});
				}
				aCardBody[this.index].style.display = "block";
				move(aCardBody[this.index],{left:0,opacity:1});
			    
				if(aCardBody[2].style.display == "block"){
					showreelTab();
				}
		
			};
		}
		
		
	};

	
	var bReady= true;
	var textTimer = null; 
    var oBox = $(".box").get([0]);
	//alert(oBox)
	//给想要的对象添加滚轮事件
	addMouseWheel(oBox,function(fx){
		
		//alert(1)
		if(fx){
			//向下
			if(!bReady) return;
			if(count >= 4){
				
				$(".bg_moon").css({left:1100,top:-120,opacity: 0});
				$(".bg_box_night").css({opacity:0});
				$(".bg_sun").css({top:30,left:900});
				$(".bg_box_day").css({opacity:1});
				$(".bed_sheet").css({top:-60});
				$(".bed").css({opacity:0});
				$(".mainboard").css({right:260,top:300});
				oHours.style.transform = "rotateZ(-70deg);";
				oMinutes.style.transform = "rotateZ(360deg);";
				
				$(".nav").get([0]).style.display = "block";
				$(".nav").animate({opacity:1},{duration:800,complete:function(){
					bReady= true;
				}});
				
				//setW();
				
				//IndexTab();
				
				return;
			} 
			$(".nav").animate({opacity:0},{duration:800,complete:function(){
				bReady= true;
			}});
			count++;
			//向下滚动的事件
			minutes += 90;
			moonT -= 50;
			moonL += 60;
			CloundL += 10;
			moonOpt -= 0.3;
		
            
			oMinutes.style.transform = "rotateZ("+ minutes +"deg)";
			if(minutes%360 == 0){
			  //hours += 60;
			  oHours.style.transform = "rotateZ("+ (-130 - count*60) +"deg)";	
			}
			//alert(moonL)
			if(moonOpt <= 0) moonOpt = 0;
			if(moonL >= 200) moonL = 200;
			if(moonT <= -160) moonT = -160;
			if(CloundL >= 200) CloundL = 200;
			
			
			$(".bg_moon").animate({top:30 + moonT,left:900 + moonL},{duration:500,complete:function(){
				bReady= true;
			}});
			$(".bg_box_night").animate({opacity:moonOpt},{duration:500,complete:function(){
				bReady= true;
			}});
			
			$(".bg_sun").animate({top:190 + moonT,left:700+moonL},{duration:500,complete:function(){
			    bReady= true;	
			}});
			$(".bg_box_day").animate({opacity:1 - moonOpt},{duration:500,complete:function(){
				bReady= true;
			}});
			$(".cloud1").animate({left:-300 + CloundL},{duration:800,complete:function(){
			    bReady= true;	
			}});
			$(".cloud2").animate({left:600 + CloundL},{duration:800,complete:function(){
				bReady= true;
			}});
			$(".pattern").animate({right:- moonL},{duration:800,complete:function(){
				bReady= true;
			}});
			$(".desk").animate({left:200 - moonL},{duration:800});
			$(".bed_sheet").animate({top:-60},{duration:600});
			
			if(moonOpt <= 0.6){
				$(".bed").animate({opacity:0},{duration:600});
			}
			
			if(moonOpt <= 0.5){
				
				//alert(deskR)
				deskR += 400;
				if(deskR >= 1060) deskR = 1060;
				$(".mainboard").animate({right:-800 + deskR},{duration:600});
				
				var mainboardR = $(".mainboard").get([0]).offsetLeft;
				
				if(count == 3){
					
					$(".text").get([0]).innerHTML = "";
					addText();
				}
			}
		} else {
			if(!bReady) return;
			//alert(count);
			//alert(count);
			if(count <= 0){
				
				$(".bg_moon").animate({left:900,top:30,opacity:1});
				//$(".bg_moon").css({left:900,top:30,opacity:1});
				$(".bg_box_night").css({opacity:1});
				$(".bg_sun").css({left:500,top:200});
				$(".bg_box_day").css({opacity:0});
				$(".bed_sheet").css({top:0});
				$(".bed").css({opacity:1});
				$(".mainboard").css({right:-800,top:300});
				$(".text").get([0]).innerHTML = "";
				oHours.style.transform = "rotateZ(-130deg);";
				oMinutes.style.transform = "rotateZ(0deg);";
				return;
			} 
			$(".nav").animate({opacity:0},{duration:800});
			count--;
			//向上滚动的事件
			var MT = $(".bg_moon").get([0]).offsetTop + 40;   
			var ML = $(".bg_moon").get([0]).offsetLeft - 60;
			var ST = $(".bg_sun").get([0]).offsetTop + 50;
			var SL = $(".bg_sun").get([0]).offsetLeft - 60;

			
			//if(count = 0) return;
			minutes -= 90;
			moonT += 50;
			moonL -= 60;
			//CloundL += 10;
			moonOpt += 0.5;
			
		oMinutes.style.transform = "rotateZ("+ minutes +"deg)";
			if(minutes%360 == 0){
			  //hours -= 60;
			  oHours.style.transform = "rotateZ("+ (-130 + count*60) +"deg)";	
			}
			
			//alert(moonL)
			if(moonOpt >= 1) moonOpt = 1;

			$(".bg_moon").animate({top:MT,left:ML,opacity:moonOpt},{duration:500});
			$(".bg_box_night").animate({opacity:moonOpt},{duration:500});
			
			$(".bg_sun").animate({top:ST,left:SL},{duration:500});
		    $(".bg_box_day").animate({opacity:1 - moonOpt},{duration:500});
		
			$(".pattern").animate({right:- moonL},{duration:800,complete:function(){
			    bReady= true;	
			}});
			$(".desk").animate({left:200 - moonL},{duration:800});
		    $(".bed_sheet").animate({top:0},{duration:600});
			
				if(moonOpt >= 0.6){
				$(".bed").animate({opacity:1},{duration:600});
			}
			
			if(moonOpt >= 0.5){
				
				//alert(deskR)
				deskR -= 400;
				if(deskR <= 0) deskR = 0;
				//var mainBoardR = 
				if($(".mainboard"))
				$(".mainboard").animate({right:-800 + deskR},{duration:600});
				
				var mainboardR = $(".mainboard").get([0]).offsetLeft;
				
				if(count == 0){
					var oTextDiv = $(".text").get([0]);
					oTextDiv.innerHTML = "";
				}
			}	
		}
	
		
	})
	
	//添加鼠标滚轮事件函数
	function addMouseWheel(obj,fn){
		
		//1.判断浏览器类型
		if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
			//for FF
		   obj.addEventListener('DOMMouseScroll',fnWheel,false);
		}else{
			//for ie chrome
		   obj.onmousewheel=fnWheel;
		   //alert(obj)
		}
		
		//2.确定鼠标滚动的方向
		function fnWheel(ev){
			
			var oEvt=ev||event;
			var down=true;
			
			if(oEvt.wheelDelta){//ie chrome 
			   down=oEvt.wheelDelta<0?true:false;
			}else{ //FF
			   down=oEvt.detail>0?true:false;
			}
			
			//回调函数 定好方向后做事
			fn(down);
			
			/*oEvt.preventDefault&& oEvt.preventDefault();
			return false;
	  */
	    }
	
    }
	
	
	//主题板文字书写
	
	function addText(){
		
		var oTextDiv = $(".text").get([0]);
		var textStr = "欢迎来到我的个人网站"; 
		var i = 0;
		clearInterval(textTimer);
		oTextDiv.innerHTML = "";
		
		var tmpArr = textStr.split("");
		
	
		textTimer = setInterval(function(){
			
			(function(i){
			   oTextDiv.innerHTML += tmpArr[i];	
			})(i);
			i++;
			if(i >= tmpArr.length){
				clearInterval(textTimer);
			}
			
		},500);
		
	}
	
	
	//导航选项卡
	
	setW();
	
	window.onresize = setW; 

	
	
	//SKILL li 的animate
	
	 //showreelTab();

		
	//拉钩
	Lagou();
	
	
	//屏保
	
	pingBao();
	
	//换肤
	var oUl = $("#ulIndex").get([0]);
    var aUlLi = oUl.children;

	
	var oSquare = document.getElementById("square");
	var aSquareDiv = oSquare.getElementsByTagName("div");
	
	//alert(aSquareDiv.length)
	for(var i = 0; i < aSquareDiv.length; i ++){
		(function(index){
			aSquareDiv[i].onclick = function(){
				for(var i = 0; i < aUlLi.length; i ++){
					aUlLi[i].style.background = "url(images/libg"+index+".jpg)";
					aUlLi[i].style.backgroundSize = "cover";
					aUlLi[i].style.zIndex = "-99";
				}
				
			};
		})(i);
		
	}
	
	
};
window.onresize = setW; 

function setW(){
		//var aCardHeadP = $("#nav").get([0]);
		//var aCardHead = aCardHeadP.children;
		var oBody = $("body").get([0]);
		var oUlBody = $(".showreel_body").get([0]);
		var aUlBody = oUlBody.children;
		var aOlBody = oUlBody.getElementsByTagName("ol");
	    var oUl = $("#ulIndex").get([0]);
        var aUlLi = oUl.children;

		var aCardBody = oUl.children;
		var w = document.documentElement.clientWidth;
		//alert(aOlBody.length)
		for(var i = 0; i < aCardBody.length; i++){
			aCardBody[i].style.width = w + "px";
			aUlBody[i].style.width = w*0.8 + "px";
			//aUlBody[i].children.style.width = w + "px";
		}
		
		for(var i = 0; i < aOlBody.length; i++){
			var arrLi = aOlBody[i].children;
			aOlBody[i].style.width = w*0.8 + "px";
		}
		
		//{float:left;margin:20px 0 0 20px;width:150px;height:150px;background:#FFC;border:2px solid #3F9;overflow:hidden;}
		
		
		//showreelTab();
		
		
		
		
		oUlBody.style.width = w + "px";
		oBody.style.width = w + "px";
		oBody.style.overflow = "hidden";
		oUl.style.width = 3192 + "px";
        oUl.style.background = "#333";
		//oUl.style.backgroundSize = "cover";
		for(var i = 0; i < aUlLi.length; i ++){
			aUlLi[i].style.background = "url(images/libg4.jpg)";
			aUlLi[i].style.backgroundSize = "cover";
			aUlLi[i].style.zIndex = "-99";
		}
		
		oUl.style.zIndex = "-9";
};
