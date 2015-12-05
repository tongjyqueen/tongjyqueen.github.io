// JavaScript Document

function Fish(imgs, type)
{
	Sprite.call(this, imgs['fish'+type]);
	
	var size=[
		null,
		{w: 37, h: 55},
		{w: 64, h: 78},
		{w: 56, h: 72},
		{w: 59, h: 77},
		{w: 122, h: 107},
	];
	
	this.w=size[type].w;
	this.h=size[type].h;
	
	this.speed=rnd(1,3);
	this.rotate=90;
	
	this.count=0;
}

Fish.prototype=new Sprite();
Fish.prototype.constructor=Fish;

var oldMove=Fish.prototype.move;

Fish.prototype.move=function ()
{
	//定时器执行1次，执行1次
	oldMove.call(this);
	
	this.count++;
	
	if(this.count%4==0)
	{
		//定时器执行4次，执行1次
		this.sx+=this.w;
		if(this.sx>=this.w*4)
			this.sx=0;
	}
};






