// JavaScript Document

function skillClound(){
  	
   
   var aSkillLi = $(".skillControll li");
   
    $Img = $(".skill .skill_clound")
   var oImg1 = $Img.get([0]);
   var oImg2 = $Img.get([1]);
   
   oImg1.style.left = -100 + "px";
   oImg1.style.top = 50 + "px";
   oImg2.style.left = 300 + "px";
   oImg2.style.top = 300 + "px";
   
   
   
  
   var cloundTimer = null;
   
   
   clearInterval(cloundTimer);
   
   cloundTimer = setInterval(function(){
	   
	   var l1 = oImg1.offsetLeft + 1;
	   var l2 = oImg2.offsetLeft + 2;
	   
	   
	   oImg1.style.left = l1 + "px";
       oImg2.style.left = l2 + "px";
	   
	   
	   
	   if(l1 > document.documentElement.clientWidth + oImg1.offsetWidth/2){
		   oImg1.style.left = -oImg1.offsetWidth + "px";
	   }
	   
	   if(l2 > document.documentElement.clientWidth + oImg2.offsetWidth/2){
		   oImg2.style.left = -oImg2.offsetWidth + "px";
	   }
	   
	  
   },30);
	
	
		
	var oUl = document.getElementById("skillControll");
	var aSpan = oUl.getElementsByTagName("span");
	//var aSpanTimer = null;
	
	for (var i = 0; i < aSpan.length;i++) {
			(function(index){
				setInterval(function(){
					spanMove(aSpan[index]);
				},2550);
			})(i);
	}
	
	
	
	
	function spanMove(obj){
			move(obj, {left:rnd(-200,220),top:rnd(-150,80)}, {duration:2500,easing:'linear'});
	}
    	     
	
}

function rnd(n,m){
	return n + Math.random()*(m-n);
	
}

//options duration easing complete 
function move(obj,json,options){
	
	options = options || {};
	options.duration = options.duration || 700;
	//options.easing = options.easing || Tween.Bounce.easeOut;
	options.easing = options.easing || "ease-out";
	
	//起点 
	var start = {};
	var dis = {};
	var count = Math.round(options.duration/30);
	
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	
	//console.log(dis)
	var n = 0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			
			switch(options.easing){
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a);
					break;
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in-out':
					if(n/count<=0.5){
						
						var a=n/count*1.5;
					    var cur=start[name]+dis[name]*a*a;  
						
					}else{
						
						move(obj,json,{duration:options.duration/2,easing:'ease-out',fn:options.fn});
					}
					break;
				
			}
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			}  else if (name == "transform"){
				
				obj.style.transform = "rotateZ("+cur+"deg)";
				
			} else {
				obj.style[name] = cur +　"px";
			}
		
		}
		
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
		
	},30);
	
}
function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,null))[name];
}

//showreel选项卡

function showreelClound(){
   oWalkingSheep = $(".walkingsheep .sheep").get([0]);
   var walkN = 0;
   /*var aSkillLi = $(".skillControll li");*/
   
   $Img = $(".showreel_clound");

   var oImg1 = $Img.get([0]);
   var oImg2 = $Img.get([1]);
   var oImg3 = $Img.get([2]);
   
   oWalkingSheep.style.left = 0;
   oImg1.style.left = -350 + "px";
   oImg1.style.top = 190 + "px";
   oImg2.style.left = -20 + "px";
   oImg2.style.top = -180 + "px";
   
   oImg3.style.left = 500 + "px";
   oImg3.style.top = 250 + "px";
   
   
   
  
   var cloundTimer = null;
   
   
   clearInterval(cloundTimer);
   
   cloundTimer = setInterval(function(){
	   if(walkN == 13) walkN = 0;
	   var l1 = oImg1.offsetLeft + 1;
	   var l2 = oImg2.offsetLeft + 1;
	   var l3 = oImg3.offsetLeft + 2;
	    
	   oImg1.style.left = l1 + "px";
       oImg2.style.left = l2 + "px";
	   oImg3.style.left = l3 + "px";
	   
	   if(walkN%2 == 0){
		   var l4 = oWalkingSheep.offsetLeft + 4;
		   move(oWalkingSheep,{left:l4},{duration:300})
	   }
	   //oWalkingSheep.style.left = + "px";
	   //alert(-120*walkN)
	   oWalkingSheep.style.backgroundPosition = -119*walkN + "px 0";
	   
	   if(l1 > document.documentElement.clientWidth + oImg1.offsetWidth/2){
		   oImg1.style.left = -oImg1.offsetWidth + "px";
	   }
	   
	   if(l2 > document.documentElement.clientWidth + oImg2.offsetWidth/2){
		   oImg2.style.left = -oImg2.offsetWidth + "px";
	   }
	   
	   if(l3 > document.documentElement.clientWidth + oImg3.offsetWidth/2){
		   oImg3.style.left = -oImg3.offsetWidth + "px";
	   }
	   
	  walkN++;
   },80);
}

function showreelTab(){
	showreelClound();
		
	var aCardHead = $(".showreel_nav").get([0]).children;
	var aShowreelBody = $(".showreel_body").get([0]).getElementsByTagName("ol");;
	//var aCardBody = $(".showreel_nav").get([0]).children;
	
	var oBox = aCardHead[aCardHead.length - 1];
    var zIndex = 3;

	
	var ready=true;
	
	
	var aLiPos=[[],[],[]];   //存原始坐标
	
	
    for(var j=0;j<aShowreelBody.length;j++){
		
		var aLi = aShowreelBody[j].children;
		
		
		//1 布局转换
		for(var i=0;i<aLi.length;i++){
			
			aLiPos[j].push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop,width:aLi[i].offsetWidth,height:aLi[i].offsetHeight,opacity:1});
			aLi[i].style.left=aLiPos[j][i].left+'px';
			aLi[i].style.top=aLiPos[j][i].top+'px';
			
		}
		
		for(var i=0;i<aLi.length;i++){
			
			aLi[i].style.position="absolute";
			aLi[i].style.margin=0;
			
		}


	}
	
	//alert(aShowreelBody.length)
	for(var i = 0; i < aCardHead.length - 1; i++){
		
		aCardHead[i].index = i;
		
		aCardHead[i].onmouseover = function(){
			moveCardHead(oBox,this.offsetLeft);
		};
		
		aCardHead[i].onclick = function(){
			if(!ready) return;
		    ready=false;
			var _this = this;
			
			
			for(var i = 0; i < aShowreelBody.length; i++){
				down(aShowreelBody[i]);
			}
			
			setTimeout(function(){
				aShowreelBody[_this.index].parentNode.style.zIndex = zIndex++;
			    up(aShowreelBody[_this.index],_this.index);
			},1400);
		};
	}
	
	
	function down(obj1){
	var aLi = obj1.children;
	var i=aLi.length-1;
	var timer=setInterval(function(){
		(function(index){
			move(aLi[i],{left:0,top:0,width:0,height:0,opacity:0},{duration:400});
		})(i);
		i--;
		if(i==-1) {
			
			clearInterval(timer)
			
		};
		
	},100);
}
	
function up(obj2,Index){
	
	var aLi = obj2.children;
	console.log(aLi)
	var i=aLi.length-1;
	var timer=setInterval(function(){
		
		(function(index){
			
			move(aLi[i],aLiPos[Index][i],{duration:500,complete:function(){
			if(index==0) ready=true;	
			obj2.parentNode.style.zIndex = zIndex++;	
	   }});
			
		})(i);
		
		i--;
		if(i==-1) {
			//alert('定时器要被清掉了');
			clearInterval(timer);
		};
	},100);
}
	
}


//拉钩效果开始
function Lagou(){
	
	var $aParent = $(".showreel_body_li");;
	
	var allLi = [];
	
	for(var i = 0; i < 3; i++){
		var tmpArrLi = $aParent.get([i]).getElementsByTagName("li");
		for(var j = 0; j < tmpArrLi.length; j++){
			allLi.push(tmpArrLi[j]);
		}
    }
	
	//alert(allLi.length)
	
	for(var i = 0; i < allLi.length; i++){
		lagou(allLi[i])
	}
	
	function getDir(obj,oEvent){
		var x = oEvent.clientX - obj.offsetLeft - obj.offsetWidth/2;
		var y = obj.offsetTop + obj.offsetHeight/2 - oEvent.clientY;
		
		// n 0 左 1 下  2 右   3 上
		return Math.round((Math.atan2(y,x)*180/Math.PI + 180)/90)%4;
	}
	
	
	function lagou(oDiv){
		oDiv.onmouseover = function(ev){
			var oEvent = ev || event;
			var oFrom = oEvent.fromElement || oEvent.relatedTarget;
			
			if(oDiv.contains(oFrom)){
				return ;
			}
			
			var oSpan = this.children[0];
			var n = getDir(this,oEvent);
			
			switch(n){
				case 0:
					oSpan.style.left = "-150px";
					oSpan.style.top = "0";
					break;
				case 1:
					oSpan.style.left = "0";
					oSpan.style.top = "150px";
					break;
				case 2:
					oSpan.style.left = "150px";
					oSpan.style.top = "0";
					break;
				case 3:
					oSpan.style.left = "0";
					oSpan.style.top = "-150px";
					break;
			}
			
			move(oSpan,{left:0,top:0});
			
				
		};
		
		
		oDiv.onmouseout = function(ev){
			var oEvent = ev || event;
			var oTo = oEvent.toElement || oEvent.relatedTarget;
			
			if(oDiv.contains(oTo)){
				return ;
			}
			var oSpan = this.children[0];
			var n = getDir(this,oEvent);
			
			switch(n){
				case 0:
					move(oSpan,{left:-150,top:0});
					break;
				case 1:
					move(oSpan,{left:0,top:150});
					break;
				case 2:
					move(oSpan,{left:150,top:0});
					break;
				case 3:
					move(oSpan,{left:0,top:-150});
					break;
			}
				
		};
	
	}
}
//拉钩效果结束






var speed = 0;
var left = 0;
		
function moveCardHead(obj,iTarget){
		
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		speed += (iTarget - obj.offsetLeft)/5;
		speed *= 0.7;
		left += speed;
		
		obj.style.left = Math.round(left) + "px";
		
		if(obj.offsetLeft == iTarget && Math.abs(speed) < 1 ){
		  clearInterval(obj.timer);	
		}
				
	},30);

}
	


