/**
*  @author  kevin
*  利用 html5 canvas 技术画圆弧
*/
(function ($) {
	/*
	* 构造函数 
	param canvas对象 和 符合一定格式的json数组对象
	elements = [{color:"#22c064",value:5},{color:"#e0483e",value:2},{color:"#f7941d",value:5}]
	opts : {x:222,y:333, r:100,size:50,fontSize:15, fontWeight:1,}
	*/
	function Annulus(canvas,elements,opts){
		var opts = opts || {};
		this.opts = opts;
		this.x = opts.x || canvas.width / 2;
		this.y = opts.y || canvas.height / 2;
		this.r = opts.r || canvas.width / 4;
		this.size = opts.size || (canvas.width*3/4)/5 ;
		this.fontSize = opts.fontSize || 15;
		this.total = 0;
		this.values = [];
		this.jiedian = [];//节点数，比如三部分则有四个节点
		this.colors = ['red','red','red','red','red'] ;
		this.init(elements);
		this.canvas = canvas;
		//this.draw(canvas)
	};

	Annulus.full = 2*Math.PI;
	/* 
	* 初始化Annulus对象
	* @param num 要处理的数字
	*/
	Annulus.prototype.init = function(elements){
		this.centerText = elements.centerText;
		if (!elements instanceof Array) {
			throw Error('Is not the array object');
		};

		for (var i = 0; i < elements.length; i++) {
			this.values[i] = +elements[i].value;
			this.colors[i] =elements[i].color;
		};
		this.total = eval(this.values.join("+0"));//将数字都加起来
		var temp=0;
		var that = this;
		this.values.forEach(function(item, index){
			that.jiedian.push(temp*Annulus.full/that.total);
			temp += item;
		});
		
	}
	/**
	* 画圆环
	* @param canvas对象
	*/	
	Annulus.prototype.draw = function(){
		var cxt = this.canvas.getContext("2d");
		cxt.save()
		cxt.translate(this.x,this.y);//将坐标转换成 x，y为中心。
		for (var i = 0; i < this.values.length; i++) {
			cxt.beginPath()
			cxt.lineWidth = this.size;
			cxt.strokeStyle = this.colors[i];
			cxt.arc(0,0,this.r,this.jiedian[i],this.jiedian[i+1] || Annulus.full, false);
			cxt.stroke()
		};
		//画文字
		cxt.lineWidth = this.opts.fontWeight || 1;
		cxt.fillStyle = this.opts.fontColor || '#fff';
		cxt.font= this.fontSize+"px Arial";
		var that = this;
		this.jiedian.forEach(function(item, index){
			var start = item,
			end = that.jiedian[index+1] || Annulus.full,
			center = (start + end) / 2;
			if(that.values[index]>0){//等于零的过滤掉
				cxt.beginPath();
	            //对位置略作调整
	            var x = that.r *Math.cos(center)- that.fontSize,
	            y = that.r*Math.sin(center) + that.fontSize/2
	            	//console.log(' '+index+'    '+center+"    "+that.values[index])
	            	cxt.fillText(that.round(that.values[index]/that.total)+'%',x, y)
	            	cxt.fill()
	            }
	        })
		//在圆环中心写字
		if (this.centerText) {
			cxt.fillStyle = this.opts.centerColor || '#000';
			cxt.lineWidth = this.opts.centerFontWeight || this.opts.fontWeight || 1;
			cxt.fillText(this.centerText, -(this.centerText.length+this.CH_count(this.centerText))*(this.fontSize/4),0)
			cxt.fill()
		};
		cxt.restore();
	};
	/**
	* 取一位小数
	* @param num 要处理的数字
	* @returns 返回num处理后保留一位小数
	*/
	Annulus.prototype.round = function (num){
		var str = num*100+"", index = str.indexOf('.');
		if (index>0) {
			return parseFloat(str.substring(0, index+2)) //取到小数点后一位
		}
		return num*100 ;
	}
	/*
	* 计算字符串中的中文个数
	* @param str 要计算的字符串
	* @returns 返回中文汉字的个数
	*/
	Annulus.prototype.CH_count = function (str)
	{ 
		    re=/[\u4E00-\u9FA5]/g;  //测试中文字符的正则
		    if(re.test(str))        //使用正则判断是否存在中文
		    return str.match(re).length //返回中文的个数
		else 
			return 0 
	} 
	APP.Annulus = Annulus;

})(window.Zepto);
/*
//扇形
CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
// 初始保存
this.save();
// 位移到目标点
this.translate(x, y);
this.beginPath();
// 画出圆弧
this.arc(0,0,radius,sDeg, eDeg);
// 再次保存以备旋转
this.save();
// 旋转至起始角度
this.rotate(eDeg);
// 移动到终点，准备连接终点与圆心
this.moveTo(radius,0);
// 连接到圆心
this.lineTo(0,0);
// 还原
this.restore();
// 旋转至起点角度
this.rotate(sDeg);
// 从圆心连接到起点
this.lineTo(radius,0);
this.closePath();
// 还原到最初保存的状态
this.restore();
return this;
}
*/
/*
var ctx = document.getElementById('saleCanvas').getContext('2d');
ctx.sector(100,100,50,0,Math.PI*230/180).fill();*/