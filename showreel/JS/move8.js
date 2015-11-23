// JavaScript Document


function move(obj,json,opational){
	
	opational=opational||{};
    opational.time=opational.time||400;
	opational.fn=opational.fn||null;
	opational.type=opational.type||'ease-out';
	
	
	var start={};
	var dis={};
	for(var key in json){
		start[key]=parseFloat(getStyle(obj,key));
		dis[key]=json[key]-start[key];
    }
	var count=Math.round(opational.time/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var key in json){
			
			switch(opational.type){
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a);
					break;
				case 'linear':
					var a=n/count;
					var cur=start[key]+dis[key]*a;
					break;
				case 'ease-in-out':
					if(n/count<=0.5){
						
						var a=n/count*1.5;
					    var cur=start[key]+dis[key]*a*a;   //仍然有问题
						
						//move(obj,json,{time:opational.time/2,type:'ease-in'}); //一半的时间跑完全程，不合适 未解
						
					}else{
						
						move(obj,json,{time:opational.time/2,type:'ease-out',fn:opational.fn});
					}
					break;
				
			}
			
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
			}
		}
		
		if(n==count){
			//alert(obj.offsetLeft)
			clearInterval(obj.timer);
			opational.fn&&opational.fn();
			
		}
	},30);
	
}

			
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}