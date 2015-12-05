// JavaScript Document

function loadImages(json,fn){
	
	var count = 0;
	var len = 0;
	
	var result = {};
	
	for(var name in json){
		
		len ++;
		
		var oImg = new Image();
		result[name] = oImg;
		oImg.src = json[name];
		
		oImg.onload = function(){
			count ++;
			if(count == len){
				fn(result);
			}
		};
	}
	
} 

function d2a(n)
{
	return n*Math.PI/180;
}

function a2d(n)
{
	return n*180/Math.PI;
}

function rnd(n, m)
{
	return Math.floor(Math.random()*(m-n)+n);
}

