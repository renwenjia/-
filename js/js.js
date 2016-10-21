/*js函数封装*/
/*=========================判断是否为数字==================================*/

function isNum(){
	for(var i=0; i<arguments.length; i++){
		if(isNaN(arguments[i])){
			return 0;
		}else{
			if(arguments[i] == arguments[arguments.length-1]){
				return 1;
			}
		}
	}
}

/*=========================计算年月日差值==================================*/

function myTime(oYear,oMonth,oDay,oHour,oMinute,oSecond){
	var xxx = new Date();
	if(oHour == undefined){
		xxx = new Date(oYear,oMonth-1,oDay);
	}else if(oMinute == undefined){
		xxx = new Date(oYear,oMonth-1,oDay,oHour);
	}else if(oSecond == undefined){
		xxx = new Date(oYear,oMonth-1,oDay,oHour,oMinute);
	}else{
		xxx = new Date(oYear,oMonth-1,oDay,oHour,oMinute,oSecond);
	}
	var oNow = new Date();
	if(xxx < oNow){
		var t = xxx;
		xxx = oNow;
		oNow = t;
	}
	var cha = Math.floor((xxx - oNow)/1000);
	
	var oSeconds = cha%60;
	var oMinutes = Math.floor(cha/60%60);
	var oHours = Math.floor(cha/60/60%24);
	var oDay = Math.floor(cha/60/60/24);
	
	return oDay + "天" + oHours + "时" + oMinutes + "分" + oSeconds + "秒";
}

/*=========================写一个m-n范围的随机数==================================*/

function Rand(min,max){
	if(min > max){
		var c = min;
		min = max;
		max = c;
	}
	var rand = Math.floor(Math.random()*(max-min+1)+min);
	return rand;
}

/*=========================数字排序(大到小)（只限数组）==================================*/

function Positive(arr){
	for(var i=0; i<arr.length-1; i++){
		for(var j=i+1; j<arr.length; j++){
			if(arr[j] > arr[i]){
				var n = arr[j];
				arr[j] = arr[i];
				arr[i] = n;
			}
		}
	}
	return arr;
}

/*=========================数字排序(小到大)（只限数组）==================================*/

function Inverted(arr){
	for(var i=0; i<arr.length-1; i++){
		for(var j=i+1; j<arr.length; j++){
			if(arr[j] < arr[i]){
				var n = arr[j];
				arr[j] = arr[i];
				arr[i] = n;
			}
		}
	}
	return arr;
}

/*=========================输出最大值（只限数组）==================================*/

function Max(arr){
	var oMax = arr[0];
	for(var i=1; i<arr.length; i++){
		if(oMax < arr[i]){
			oMax = arr[i];
		}
	}
	return oMax;
}

/*=========================输出最小值（只限数组）==================================*/

function Min(arr){
	var oMin = arr[0];
	for(var i=1; i<arr.length; i++){
		if(oMin > arr[i]){
			oMin = arr[i];
		}
	}
	return oMin;
}


/*=========================忽略空白文本节点==================================*/

function noSpace(node){
	var arr = [];
	for(var i=0; i<node.length; i++){
		if(node[i].nodeType == 3 && /^\s+$/.text(node[i].nodeValue)){
			continue;
		}else{
			arr[i].push(node[i]);
		}
	}
	return arr;
}

/*=========================删除空白文本节点==================================*/

function removeSpace(node){
	for(var i=0; i<node.length; i++){
		if(node[i].nodeType == 3 && /^\s+$/.text(node[i].nodeValue)){
			node[i].parentNode.removeChild(node[i]);
		}
	}
	return node;
}

/*=========================拖拽封装==================================*/

function drag(obj){
	obj.onmousedown = function(evt){
		var e = evt || window.event;
		var x = e.offsetX;
		var y = e.offsetY;
		
		document.onmousemove = function(evt){
			var e = evt || window.event;
			var d_x = e.clientX;
			var d_y = e.clientY;
			
			var L = d_x - x;
			var T = d_y - y;
			if(L <= 0){
				L = 0;
			}else if(L >= document.documentElement.clientWidth - obj.offsetWidth){
				L = document.documentElement.clientWidth - obj.offsetWidth;
			}
			
			if(T <= 0){
				T = 0;
			}else if(T >= document.documentElement.clientHeight - obj.offsetHeight){
				T = document.documentElement.clientHeight - obj.offsetHeight;
			}
			obj.style.left = L + "px";
			obj.style.top = T + "px";
		};
		
		document.onmouseup = function(){
			document.onmousemove = null;
		};
	};

}

/*=========================拖拽封装(面向对象)==================================*/

function Drag(id){
	var _this = this;
	this.disX = 0;
	this.disY = 0;
	this.oDiv = document.getElementById(id);
	this.oDiv.onmousedown = function(evt){
		_this.fnDown(evt);
	};
};
Drag.prototype.fnDown = function(evt){
	var _this = this;
	var e = evt || window.event;
	this.disX = e.offsetX;
	this.disY = e.offsetY;
	
	document.onmousemove = function(evt){
		_this.fnMove(evt);
	}
	document.onmouseup = function(){
		_this.fnUp();
	}
}
Drag.prototype.fnMove = function(evt){
	var e = evt || window.event;
	this.oDiv.style.left = e.clientX - this.disX + "px";
	this.oDiv.style.top = e.clientY - this.disY + "px";
};
Drag.prototype.fnUp = function(){
	document.onmousemove = null;
};
			

/*=========================封装创建cookie==================================*/
function setCookie(key,value,expires,path,domain,secure){
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	if(expires instanceof Date){
		cookie += ";expires=" + expires;
	}
	if(path){
		cookie += ";path=" + path;
	}else{
		cookie += ";path=/";
	}
	if(domain){
		cookie += ";domain=" + domain;
	}
	if(secure){
		cookie += ";secure=" + secure;
	}
	document.cookie = cookie;
}

/*=========================封装创建cookie失效时间==================================*/
function setCookieDay(day){
	var date = null;
	if(typeof day == "number" && day > 0){
		date = new Date();
		date.setDate(date.getDate()+day);
	}
	return date;
}

/*=========================获取指定键的cookie值==================================*/
function getCookie(key){
	var cookieName = encodeURIComponent(key) + "=";
	var cookieValue = "";
	var cookieStart = document.cookie.indexOf(cookieName);
	if(cookieStart > -1){
		var cookieEnd = document.cookie.indexOf(";",cookieStart);
		if(cookieEnd == -1){
		cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
	}
	return cookieValue;
}

/*=========================删除cookie==================================*/
function removeCookie(key){
	document.cookie = key+"=;expires="+new Date(0)+";path=/";
}

/*=========================封装ajax函数==================================*/

function ajax(url,fnWin,fnFaild){
	//1.创建ajax
	
	var ajax = null;
	if(window.XMLHttpRequest){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//2.连接服务器
	ajax.open("GET",url,true);//true(异步)false(同步)
	
	//3.传送数据
	ajax.send();
	
	//4.接收数据
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4){
			if(ajax.status == 200){
				fnWin(ajax.responseText);
			}else{
				if(fnFaild){
					fnFaild();
				}
			}
		}
	};
}
	
/*=========================事件监听器兼容==================================*/
	
function addListener(obj,event,fn,boo){
	if(obj.addEventListener){
		obj.addEventListener(event,fn,boo);
	}else{
		obj.attachEvent("on" + event,fn);
	}
}
	
/*=========================移除事件监听器兼容==================================*/
	
function removeListener(obj,event,fn,boo){
	if(obj.removeEventListener){
		obj.removeEventListener(event,fn,boo);
	}else{
		obj.detachEvent("on" + event,fn);
	}
}

/*=========================封装匀速运动函数==================================*/

function startMov(obj,target,speed,interval){//obj：移动的元素，target：目标距离，speed：移动速度，interval：移动间隔毫秒数
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var newLeft = getStyle(obj,'left');
		speed = newLeft < target ? speed : -speed;
		
		if(newLeft == target){
			clearInterval(obj.timer);
		}else{
			obj.style.left = newLeft + speed + "px";
		}
	},interval);
}

/*=========================封装淡入淡出函数==================================*/

function startGo(obj,target,speed,interval){alert(1);
	clearInterval(obj.timer);
	speed = obj.alpha < target ? speed : -speed;
	obj.timer = setInterval(function(){
		if(obj.alpha == target){
			
			clearInterval(obj.timer);
		}else{
			obj.alpha += speed;
			if(speed > 0){
				if(obj.alpha > target){
					obj.alpha = target;
				}
			}
			if(speed < 0){
				if(obj.alpha < target){
					obj.alpha = target;
				}
			}
			obj.style.opacity = obj.alpha/100;
			obj.style.filter = "alpha(opacity="+obj.alpha+")";
		}
	},interval);
}

/*=========================封装缓冲运动函数==================================*/

function startMove(obj,json,fn){
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		var stop = true;//假设当前已经执行完所有目标
		for(var attr in json){
			var newVal = 0;
			if(attr == "opacity"){
				newVal = parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				newVal = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - newVal)/8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			console.log(speed,newVal,json[attr]);
			
			if(newVal != json[attr]){
				stop = false;
			}  
			
			if(attr == "opacity"){
				obj.style.opacity = (newVal + speed)/100;
				obj.style.filter = "alpha(opacity="+(newVal + speed)+")";
			}else{
				obj.style[attr] = newVal + speed + "px";
			}
			
		}
		if(stop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},30);
}

/*=========================封装调用对象的属性==================================*/

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}

/*=========================封装设置对象的属性==================================*/

function setStyle(obj,json){
	for(var attr in json){
		obj.style[attr] = json[attr];
	}
}

/*=========================getAttribute()兼容问题==================================*/

function getAttr(obj){
	return obj.getAttribute("class") === null ? obj.getAttribute("className") : obj.getAttribute("class");
}




















