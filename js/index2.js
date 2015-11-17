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
	 //灯的效果
	$oLight= $(".house_light");
	
    light();
	function light(){
		var timer = null;
		var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
		//var oLight = $oLight.get([0]);
		Light1 = $(".light1").get([0]);
		Light2 = $(".light2").get([0]);
		Light3 = $(".light3").get([0]);
		Light4 = $(".light4").get([0]);
	    
		var n = 0;
		
		clearInterval(timer);
		timer = setInterval(function(){
			n++;
			
			if(n%2 == 0){
				Light1.style.transform = "rotateZ(3deg)";
				Light2.style.transform = "rotateZ(-5deg)";
				Light3.style.transform = "rotateZ(4deg)";
				Light4.style.transform = "rotateZ(-2deg)";
			} else {
				Light1.style.transform = "rotateZ(-3deg)";
				Light2.style.transform = "rotateZ(5deg)";
				Light3.style.transform = "rotateZ(-4deg)";
				Light4.style.transform = "rotateZ(2deg)";
			}
			
		},2000);
		
		
		if(scrTop >= 600){
			
		}
		
	}
	
	 
	
	
	//给想要的对象添加滚轮事件
	addMouseWheel(document,function(fx){
		
		
		if(fx){
			//alert(count);
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
				
				$(".nav").animate({opacity:1},{duration:800});
				
				return;
			} 
			$(".nav").animate({opacity:0},{duration:800});
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
			
			
			$(".bg_moon").animate({top:30 + moonT,left:900 + moonL},{duration:500});
			$(".bg_box_night").animate({opacity:moonOpt},{duration:500});
			
			$(".bg_sun").animate({top:190 + moonT,left:700+moonL},{duration:500});
			$(".bg_box_day").animate({opacity:1 - moonOpt},{duration:500});
			$(".cloud1").animate({left:-300 + CloundL},{duration:800});
			$(".cloud2").animate({left:600 + CloundL},{duration:800});
			$(".pattern").animate({right:- moonL},{duration:800});
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
					addText();
					
				}
			}
		} else {
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
		
			$(".pattern").animate({right:- moonL},{duration:800});
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
			
			oEvt.preventDefault&& oEvt.preventDefault();
			return false;
	  
	    }
	
    }
	
	
	//主题板文字书写
	
	function addText(){
		
		var oTextDiv = $(".text").get([0]);
		var textStr = "欢迎来到我的个人网站"; 
		var i = 0;
		
		var tmpArr = textStr.split("");
		var textTimer = null;
	
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
	
	addLink();
	
};