//版权 北京智能社©, 保留所有权利
//jsonp({url:xx,data:{act:xx...},success:xxx,error:xxx,callbackkey:xxx,timeout:xxx})
function jsonp(opations){
	
	opations = opations || {};
	
	if(!opations.url){
	    return;	
	}
	
	opations.data = opations.data || {};
	opations.callbackkey = opations.callbackkey || 'cb';
	opations.timeout = opations.timeout || 0;
	
	//2 回调函数名字处理
	var cbName = 'jsonp' + Math.random();
	
	cbName = cbName.replace('.','');
	opations.data[opations.callbackkey] = cbName;
    
	
	//3 定义回调函数
	window[opations.data[opations.callbackkey]] = function(json){
		clearTimeout(timer);
		opations.success && opations.success(json);
		document.head.removeChild(oScript);
		window[opations.data[opations.callbackkey]] = null;
	};
	
	
	//1 拼url 创建script,把ur赋l给script的src
	var arr = [];
	for(var key in opations.data){
		arr.push(key + '=' + encodeURIComponent(opations.data[key]));
	}
	opations.url = opations.url + '?' + arr.join('&');
	
	var oScript = document.createElement('script');
	
	oScript.src = opations.url;
	document.head.appendChild(oScript);
	//alert(opations.url)
	
	
	//4 设定超时
	if(opations.timeout){
		var timer = setTimeout(function(){
			    document.head.removeChild(oScript);
				window[opations.data[opations.callbackkey]] = null;
			    alert('超时了');
				opations.error && opations.error();
			},opations.timeout);
	}
	
}
