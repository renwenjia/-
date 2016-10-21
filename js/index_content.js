$(function(){
	/*-----------------轮播图1--------------------------*/
	var index = 0;//定义一个变量，用于充当轮播下标
	$(".center_top_ul li:first").css("display","block")//让第一张图显示
	var timer = setInterval(changeImg,1500);//调用更换图片函数
	function changeImg(){//定义一个图片更换函数
		index++;//每次调用时增加index值
		if(index >=$(".center_top_ul li").size()){//判断index值超过轮播li长度得时候变为0
			index = 0;
		}else if(index < 0){//如果低于0的时候直接变为最后一个
			index = $(".center_top_ul li").size()-1;
		}
		//默认第一个是显示，所以调用后即第一个消失第二个开始显示
		$(".center_top_ul li").eq(index).fadeIn(300);//每次调用时让当前下标的淡入显示
		$(".center_top_ul li").eq(index).siblings().fadeOut(300);//其他下标的淡出消失
		$(".content_box1_top_center .blackline").css("left",144*index + "px");//让轮播图下的黑色标志线跟随下标值进行变动
		$(".content_box1_top_center .center_bottom_ul li").eq(index).css("color","#000")//让对应的下标的文字显示颜色改变
		.siblings().css("color","#666");//其他的变回
	}
//	轮播图划入划出事件
	$(".content_box1_top_center").on("mouseenter",function(){
		$(".content_box1_top_center .btn").css("display","block");
		clearInterval(timer);//当划入的时候让左右方向箭显示出来，并且停止所有定时器
	})
	$(".content_box1_top_center").on("mouseleave",function(){
		$(".content_box1_top_center .btn").css("display","none");
		timer = setInterval(changeImg,1500);//移出的时候再让箭头消失，并重启计时器
	})
//	箭头点击事件
	$(".content_box1_top_center .btn").on("click",function(){
		if($(this).index() == 0){//判断箭头的方向，0代表左
			index = index - 2;//左的时候就需要后退到上一个显示，因为执行换图函数的时候，index值会默认++，所以需要将index值减去2，执行函数后才会变为上一个显示
			changeImg();
		}else{
			changeImg();
		}	
	})
	
	
	
//	轮播图1对应列表事件
	var tmout = null;
	$(".center_bottom_ul li").on("mouseenter",function(){
		index = $(this).index()-1;//因为让当前显示，所以将下标减少1即可
		tmout = setTimeout(changeImg,1000);	//添加定时器，1秒后执行换图函数
	})
	$(".center_bottom_ul li").on("click",function(){
		index = $(this).index()-1;//点击的时候就需要停止定时，然后执行一次换图
		clearTimeout(tmout);
		changeImg();
	})
	$(".center_bottom_ul li").on("mouseleave",function(){
		clearTimeout(tmout);//移出的时候需要删除定时器以免重复执行
	})
	
	/*-------------------------计时器图片数据更换------------------*/
	$.ajax({
		url:"json/index_content.json",
		dataType:"json",
		success:function(mag){
//			box1右侧加载事件
			var data1 = mag.data1;
			
//			页面刷新时直接加载时间和图片并显示在页面			
			//set();
			var now = new Date();//获取当前时间
			if(!(now.getHours()%2)){//如果当前时间的小时为偶数，将图片替换为当前时间除以2的json数据里面代表的那张图
				$(".content_box1_top_right .timesale a").html(data1[now.getHours()/2].img);
			}else{//当为基数的时候图片为其上一个偶数的那张图
				$(".content_box1_top_right .timesale a").html(data1[((now.getHours())-1)/2].img);
			}
			var timeCount = setInterval(set,100)//调用计时器
			
//			定时器函数
			function set(){
				var now = new Date();
				
				if(now.getHours()%2){//返还出时间差值放入页面
					var count = myTime1(now.getFullYear(),now.getMonth()+1,now.getDate(),now.getHours()+1)
				}else{
					var count = myTime1(now.getFullYear(),now.getMonth()+1,now.getDate(),now.getHours()+2)
				}
				$(".content_box1_top_right .timesale .countdown").html("仅剩：<span>"+count+"</span>");
				if($(".countdown span").text() == "00:00:00"){//当倒计时为0的时候就更换图片
					if(!(now.getHours()%2)){	
						$(".content_box1_top_right .timesale a").html(data1[now.getHours()/2].img);
					}else{
						$(".content_box1_top_right .timesale a").html(data1[((now.getHours())-1)/2].img);
					}
				}
			}
//			时间函数获取
			function myTime1(oYear,oMonth,oDay,oHour,oMinute,oSecond){
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
				
				var oSeconds = cha%60<10?"0"+cha%60:cha%60;
				var oMinutes = Math.floor(cha/60%60)<10?"0" + Math.floor(cha/60%60):Math.floor(cha/60%60);
				var oHours = Math.floor(cha/60/60%24)<10?"0" + Math.floor(cha/60/60%24):Math.floor(cha/60/60%24);
				var oDay = Math.floor(cha/60/60/24);
					
					return oHours + ":" + oMinutes + ":" + oSeconds;
			}
			

			/*------------------二级菜单----------------------------*/

//			一级菜单左侧加载事件
			var data2 = mag.data2
			for(var i in data2){//将该json里面的所有值都添加都页面元素里面
				$(".big_ul_li_dt").eq(i).html(data2[i].dt);
				$(".big_ul_li_dd").eq(i).html(data2[i].dd);
			}
			
//			一级菜单移入移出事件
			$(".big_ul_li").on("mouseenter",function(){//移入的时候显示右侧的二级菜单以及一个跟随的小标签
				$(".big_ul_li i").eq($(this).index()).css({"left":"218px","height":"14px","background":"url('img/header_box2.png') no-repeat scroll 0 -211px"})
				//因为每个创建的时候都是以他本身的父盒子创建的，所以要显示在统一的位置值，找到其高度乘以其下标值在top值上减去即可
				$(".small_dl").eq($(this).index()).css({"display":"block","left":"223px","top":$(this).index()*-56 + "px"})
			})
			$(".big_ul_li").on("mouseleave",function(){
				$(".big_ul_li i").eq($(this).index()).css({"left":"210px","height":"10px","background":"url('img/header_box2.png') no-repeat scroll 0 -191px"})
				$(".small_dl").eq($(this).index()).css({"display":"none","left":"224px"})
			})
//			二级菜单内容添加
			var data3 = mag.data3
			for(var i in data3){
				$(".small_li").eq(i).html(data3[i].li);
			}
			var data4 = mag.data4
			for(var i in data4){
				$(".small_dd").eq(i).html(data4[i].dd);
			}
			
//			box1下边栏加载，/*------------------轮播图2----------------------------*/
//			设置下边栏UL的宽度
			$(".content_box1_bottom ul").css("width",$(".content_box1_bottom ul li").size()*$(".content_box1_bottom li").eq(0).width())
			var data5 = mag.data5
			for(var i in data5){
				$(".content_box1_bottom li a").eq(i).html(data5[i].img)
			}
//			点击事件
			$(".content_box1_bottom i").on("click",function(){
				if($(this).index() == 0){					
					$(".content_box1_bottom ul").stop().animate({"marginLeft":"0"},300)
				}else{	
					$(".content_box1_bottom ul").stop().animate({"marginLeft":$(".content_box1_bottom li").eq(0).width()*-5},300)
				}
			})
			/*box1所有内容结束*/
			/*----------------box2推荐区的json载入数据----------------------*/
			var data6 = mag.data6
			for(var i in data6){
				$(".cotent_box2 div").eq(i).html(data6[i].div)
			}
//			该网站喜欢的透明样式
			$("img").on("mouseenter",function(){
				$(this).stop().animate({"opacity":"0.8"},300)
			})
			$("img").on("mouseleave",function(){
				$(this).stop().animate({"opacity":"1"},300)
			})
		}
	})
})
