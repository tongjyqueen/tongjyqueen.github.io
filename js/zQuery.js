// JavaScript Document

(function(window,undefined){

window.$ = window.zQuery = $;
	
function zQuery(args){
	this.elements = [];//装元素
	this.domString = "";
	switch(typeof args){
		case "function":
		   domReady(args);
		   break;
		case "string":
		   if(args.indexOf("<") != -1){
			   this.domString = args;
		   } else {
			  this.elements = getEle(args); 
		   }
		   
		   break;
		case "object":
		   if("length" in args){
			   for(var i = 0; i < args.length; i++){
				   this.elements.push(args[i]);
			   }
		   } else {
			   this.elements.push(args);   
		   }
		   break;
	}
}



function $(args){
	return new zQuery(args);
}

//get   返回的是原生
zQuery.prototype.get = function(index){
	return this.elements[index];
};

//eq    返回的是zQuery对象
zQuery.prototype.eq = function(index){
   return $(this.elements[index]);
};

//index
zQuery.prototype.index = function(){
    var obj = this.elements[0];
	var aChild = this.elements[0].parentNode.children;
	
	for(var i = 0; i < aChild.length; i++){
		if(aChild[i] == obj){
			return i;
		}
	}
};

//show
zQuery.prototype.show = function(){
    for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "block";
	}
};
//hide
zQuery.prototype.hide = function(){
    for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = "none";
	}
};

//addClass
zQuery.prototype.addClass = function(sClass){
   	var re = new RegExp("\\b"+sClass+"\\b");
	for(var i = 0; i < this.elements.length; i++){
		if(!re.test(this.elements[i].className)){
			if(this.elements[i].className){
				this.elements[i].className += " "+sClass;
			} else {
				this.elements[i].className = sClass;
			}
		}
	}
 	
};

//removeClass
zQuery.prototype.removeClass = function(sClass){
	var re = new RegExp("\\b"+sClass+"\\b");
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].className = this.elements[i].className.replace(re,"").replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
		if(!this.elements[i].className){
			this.elements[i].removeAttribute("class");
		}
	}
	
};

//hasClass
zQuery.prototype.hasClass = function(sClass){
	var re = new RegExp("\\b"+sClass+"\\b");
	for(var i = 0; i < this.elements.length; i++){
		if(re.test(this.elements[i].className)){
			return true;
		} 
	}
	return false;
};

//find
zQuery.prototype.find = function(str){
	var aChild = getEle(str,this.elements);
	return $(aChild);
};

//bind
zQuery.prototype.bind = function(sEv,fn){
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i],sEv,fn);
	}
};

//each
zQuery.prototype.each = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		fn.call(this.elements[i],i);
	}
};

//组件
$.fn = zQuery.prototype;

$.fn.extend = function(json){
	for(var name in json){
		zQuery.prototype[name] = json[name];
	}
};

//appendTo
zQuery.prototype.appendTo = function(str){
	//父级  str
	var aParent = getEle(str);
	//子级 this.domString
	for(var i = 0; i < aParent.length; i++){
		appendStr(aParent[i],this.domString);
	}
};

function appendStr(oParent,str){
	var oDiv = document.createElement("div");
	oDiv.innerHTML = str;
	
	var aChild = oDiv.children;   //[]
	//console.log(aChild);
	while(aChild.length > 0){
		//alert(aChild.length);
		oParent.appendChild(aChild[0]);  //每添加一个，【】长度减少一个
	}
}

//静态方法
$.trim = function(str){
   	return str.replace(/^\s+|\s+$/g,"");
};

//ajax
$.ajax = function(options){
	if(options.dataType == "jsonp"){
		jsonp(options);
	} else {
		ajax(options);
	}
};

//animate
zQuery.prototype.animate = function(json,options){
	for(var i = 0; i < this.elements.length; i++){
		move(this.elements[i],json,options);
	}
};


//事件
"click|mouseover|mouseout|contentmenu|mousemove|mousedown|mouseup|scroll|resize|load|focus|blur".replace(/\w+/g,function(sEv){
	zQuery.prototype[sEv] = function(fn){
		for(var i = 0; i < this.elements.length; i++){
			addEvent(this.elements[i],sEv,fn);
		}
	};
});

//toggle
zQuery.prototype.toggle = function(){
    var args = arguments;
	var len = args.length;
	var count = 0;
	var _this = this;
	
	for(var i = 0; i < this.elements.length; i++){
		(function(){
			addEvent(_this.elements[i],"click",function(){
				args[count%len].apply(this,arguments);
				count++;
			});
		})(0);
	}
		
};


//mouseenter
zQuery.prototype.mouseenter = function(fn){ 

    for(var i = 0; i < this.elements.length; i++){
		
		addEvent(this.elements[i],"mouseover",function(ev){
			
		   	var oFrom = ev.fromElement || ev.relatedTarget;
			
			if(oFrom && this.contains(oFrom)){
				return;
			}
			
			fn && fn.call(this,ev);
		});
	}
};
//mouseleave
zQuery.prototype.mouseleave = function(fn){ 
   for(var i = 0; i < this.elements.length; i++){
	   addEvent(this.elements[i],"mouseout",function(ev){
		   var oTo = ev.toElement || ev.releatedTarget;
		   if(oTo && this.contains(oTo)){
			   return;
		   }
		   fn && fn.call(this,ev);
	   });
   }
};

//hover
zQuery.prototype.hover = function(fnOver,fnOut){
	this.mouseenter(fnOver);
    this.mouseleave(fnOut || fnOver);
};

function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,function(ev){
			if(fn.call(obj,ev) == false){
				ev.cancelBubble = true;
				ev.preventDefault();
			}
			
		},false);
	} else{
		obj.attachEvent("on"+sEv,function(){
		   if(fn.call(obj,event) == false){
			   event.cancelBubble = true;
			   return false;
		   }	
		});
	}
}

// css  attr
/*
$obj.css(name); 获取
$obj.css(name,value); 设置
$obj.css({name:value,name,value}); 批量设置
*/
zQuery.prototype.css = function(name,value){
	if(arguments.length == 2){ //设置
		for(var i = 0; i < this.elements.length; i++){
			this.elements[i].style[name] = value;
		}
	} else{
		if(typeof name == "string"){//获取
			return getStyle(this.elements[0],name);
		} else {//批量设置
			for(var i = 0; i < this.elements.length; i++){
			   for(var j in name){
				   this.elements[i].style[j] = name[j];
			   }
		    }
		}
	
	}
};

/*
$obj.attr(name); 获取
$obj.attr(name,value); 设置
$obj.attr({name:value,name,value}); 批量设置
*/
zQuery.prototype.attr = function(name,value){
	if(arguments.length == 2){ //设置
		for(var i = 0; i < this.elements.length; i++){
			this.elements[i].setAttribute(name,value);
		}
	} else{
		if(typeof name == "string"){//获取
			return this.elements[0].getAttribute(name);
		} else {//批量设置
			for(var i = 0; i < this.elements.length; i++){
			   for(var j in name){
				   this.elements[i].setAttribute(j,name[j]);
			   }
		    }
		}
	
	}
};


function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,null))[name];
}


function domReady(fn){
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",fn,false);
	} else {
		document.attachEvent("onreadystatechange",function(){
		   if(document.readyState == "complete"){
			   fn && fn();	   
		   }
		});
	}
}



//获取元素
function getByClass(oParent,sClass){
	
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}
	
	var ret = [];
	var aEle = oParent.getElementsByTagName("*");
	var re = new RegExp(/"\\b"+sClass+"\\b"/);
	
	for(var i = 0; i < aEle.length; i++){
		if(re.test(aEle[i].className)){
			ret.push(aEle[i]);
		}
	}
	return ret;
}

function getByStr(aParent,str){
	var aChild = [];
	
	//str ： #div1  ul  .box
	for(var i = 0; i < aParent.length; i++){
		switch(str.charAt(0)){
			case "#"://id
				var obj = document.getElementById(str.substring(1));
				obj && aChild.push(obj);
				break;
			case "."://class
				var aEle = getByClass(aParent[i],str.substring(1));
				for(var j = 0; j < aEle.length; j++){
					aChild.push(aEle[j]);
				}
				break;
			default://tagName
			   //li.box li#div1 input[type=button] li:eq(index)  li:first 
			   if(/\w+#\w+/i.test(str)){//li#div1
				   var arr = str.split("#");
				   var aEle = aParent[i].getElementsByTagName(arr[0]);
				   for(var j = 0; j < aEle.length; j++){
					   if(aEle.id == arr[1]){
						  aChild.push(aEle[j]); 
					   }
				   }
			   } else if(/\w+\.\w+/i.test(str)){//li.box
				   var arr = str.split(".");
				   var aEle = aParent[i].getElementsByTagName(arr[0]);
				   var re = RegExp("\\b"+ arr[1] +"\\b");
				   for(var j = 0; j < aEle.length; j++){
					   if(re.test(aEle[j].className)){
						  aChild.push(aEle[j]); 
					   }
				   }
			   } else if(/\w+\[\w+=\w+\]/i.test(str)){//input[type=button]
				   var arr = str.split(/\[|=|\]/g);
			       var aEle = aParent[i].getElementsByTagName(arr[0]);
				   
				   for(var j = 0; j < aEle.length; j++){
					   if(aEle[j].getAttribute(arr[1]) == arr[2]){
						  aChild.push(aEle[j]); 
					   }
				   }
			   } else if(/\w+:\w+(\(.\))?/i.test(str)){//li:eq(index)  li:first 
				   var arr = str.split(/:|\(|\)/g);
				   var aEle = aParent[i].getElementsByTagName(arr[0]);
				    
				   switch(arr[1]){
					  case "first":
							aChild.push(aEle[0]);
							break;
						case "last":
							aChild.push(aEle[aEle.length - 1]);
							break;
						case "lt":
							for(var j = 0; j < parseInt(arr[2]); j++){
									aChild.push(aEle[j]); 
							}
						break;
						case "eq":
							aChild.push(aEle[arr[2]]);
							break;
						case "gt":
							for(var j = parseInt(arr[2]) + 1; j < aEle.length; j++){
									aChild.push(aEle[j]); 
							}
							break;
						case "odd":
							for(var j = 0; j < aEle.length; j++){ 
								if(j%2 == 1){
									aChild.push(aEle[j]);
								}
							}
							break;
						case "even":
							for(var j = 0; j < aEle.length; j+=2){ 
								aChild.push(aEle[j]);
							}
							break;
					}
					 
			   } else {//li
				   var aEle = aParent[i].getElementsByTagName(str);
				   for(var j = 0; j < aEle.length; j++){
					aChild.push(aEle[j]);
				}
			   }
			
		}
	}
	return aChild;
}

function getEle(str,aParent){
	var arr = str.replace(/^\s+|\s+$/g,"").split(/\s+/);   //var arr = str.match(/\S+/g);
	
	var aParent = aParent || [document];
	var aChild = [];
	
	for(var i = 0; i < arr.length; i++){
		aChild = getByStr(aParent,arr[i]);
		aParent = aChild;
    }
	return aChild; 
}


//ajax
function json2url(json){
	var arr = [];
	json.t = Math.random();
	for(var name in json){
		arr.push(name + "=" + json[name]);
	}
	return arr.join("&");
}

//options url,data,type,success,error,timeout
function ajax(options){
	
	options = options || {};
	options.data = options.data || {};
	options.type = options.type || "get";
	options.timeout = options.timeout || 0;
		
	if(!options.url){
		return ;
	}
	
	var str = json2url(options.data);
	
	//1 创建对象
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	
	if(options.type == "get"){
		xhr.open("get",options.url + "?" + str,true);
		xhr.send();
	} else {
		xhr.open("post",options.url,true);
		
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		 
		xhr.send(str);	
	}
	
	//4 接收
	xhr.onreadystatechange = function(){
		
		if(xhr.readyState == 4){//完成  并不代表成功
			
			//http状态  2xx  304
			clearTimeout(timer);
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){ 
				//xhr.responseText
				options.success && options.success(xhr.responseText); 
			} else {
				options.error && options.error();
			}
		}	
	}; 
	
	if(options.timeout){
		var timer = setTimeout(function(){
			xhr.abort();
		},options.timeout);
	}
}

//jsonp
//options: url data cbName timeout success error
function jsonp(options){
	options = options ||{};
	if(!options.url){
		return ;
	}
	
	options.data = options.data || {};
	options.cbName = options.cbName || "cb";
	options.timeout = options.timeout || 0;
		
	var fnName = ("jsonp_" + Math.random()).replace(".","");

	var arr = [];
	options.data[options.cbName] = fnName;
	for(var name in options.data){
		arr.push(name + "=" + encodeURIComponent(options.data[name]));
	}
	var str = arr.join("&");
	
	//全局函数
	window[fnName] = function(json){
		options.success && options.success(json);
		//释放资源
		window[fnName] = null;
		oHead.removeChild(oS);
		clearTimeout(timer);
	};
	
	//创建script
	var oS = document.createElement("script");
	oS.src = options.url + "?" + str;
	var oHead = document.getElementsByTagName("head")[0];
	oHead.appendChild(oS);
	
	//超时
	if(options.timeout){
		var timer = setTimeout(function(){
			options.error && options.error();
			window[fnName] = function(){};
			oHead.removeChild(oS);
		},options.timeout);
	}
	
	
}


//options duration easing complete 
function move(obj,json,options){
	
	options = options || {};
	options.duration = options.duration || 700;
	//options.easing = options.easing || Tween.Bounce.easeOut;
	options.easing = options.easing || Tween.Linear;
	
	//起点 
	var start = {};
	var dis = {};
	var count = Math.round(options.duration/30);
	
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		//算位置
		
		for(var name in json){
			
			
			var cur = options.easing(n/count*options.duration,start[name],dis[name],options.duration);
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			}  else if(name == "transform"){
				
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

var Tween = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
}	
	
})(window,undefined);


