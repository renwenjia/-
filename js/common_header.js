$(function(){
	/*-------------------------头部json数据加载---------------------------------*/
	$.ajax({
		url:"json/header.json",
		dateType:"json",
		success:function(mag){
			var data1 = mag.data1;
			/*----------------------在json中获取logo图片放入结构中-----------------------*/
			for(var i in data1){
				$(".box1 .box1Left a").eq(i).html(data1[i].img);
			}
			$("img").on("mouseenter",function(){
				$(this).stop().animate({"opacity":"0.8"},300).siblings().css("opacity","1");
			})
			$("img").on("mouseleave",function(){
				$(this).stop().animate({"opacity":"1"},300);
			})
		}
		
		
	})
	/*--------------------当前页面的代表logo背景色改变-------------------------*/
	$(".box1 .box1Left a").eq(0).css("background","#fff");
	
	/*---------------------进入页面时候判断是否存在登录名------------------------*/
	if(getCookie("userName") != ""){//IE问题，如果不存在cookie就获取会报错，所以进行一次判断
		var userName = getCookie("userName");//创建变量等于获取的用户名
		if(userName != ""){//判断获取的是否存在
			$(".bigul_li1,.bigul_li2").css("display","none");
			$("<li class='username l'><a href='javascript:;'>"+ userName +"&nbsp;&nbsp;</a><a class='res' href='javascript:;'>[退出]</a></li>").prependTo($(".bigul"))
		//存在就让登录和注册两个标签消失，创建一个新的标签包含用户名和以及一个退出事件按钮
		}
	}
	$(".res").on("click",function(){//给创建的退出事件按钮添加的事件函数
		$(".username").remove();//移除创建的页面元素
		removeCookie("userName");//移除用户名信息，防止退出后刷新还会继续获取
		$(".bigul_li1,.bigul_li2").css("display","block");//让原标签登录和注册显示
	})
	
	/*-----------------登录等移入移出下拉菜单-----------------------*/
	var login1 = $(".bigul_li1");//登录
	login1.on("mouseenter",function(){//移入移出的时候改变下拉菜单的显示状态以及原有列表的宽高值防止变形
		login1.css({"width":"24px","height":"18px","padding":"9px 24px 0 10px","position":"relative","borderLeft":"1px solid #b5b5b5","borderRight":"1px solid #b5b5b5"});
		$(".bigul_li1 .hid,.bigul_li1_smallul").css("display","block");
	})
	login1.on("mouseleave",function(){
		login1.css({"width":"24px","height":"18px","padding":"9px 25px 0 10px","position":"relative","border":"0"})
		$(".bigul_li1 .hid,.bigul_li1_smallul").css("display","none")
	})	
	
	var login3 = $(".bigul_li3")//我的邦购
	login3.on("mouseenter",function(){
		login3.css({"width":"48px","height":"18px","padding":"9px 24px 0 9px","position":"relative","borderLeft":"1px solid #b5b5b5","borderRight":"1px solid #b5b5b5"})
		$(".bigul_li3_smallul").css("display","block")
	})
	login3.on("mouseleave",function(){
		login3.css({"width":"48px","height":"18px","padding":"9px 25px 0 10px","position":"relative","border":"0"})
		$(".bigul_li3_smallul").css("display","none")
	})	
	
	var login5 = $(".bigul_li5")//下载APP
	login5.on("mouseenter",function(){
		login5.css({"width":"65px","height":"18px","padding":"9px 24px 0 9px","position":"relative","borderLeft":"1px solid #b5b5b5","borderRight":"1px solid #b5b5b5"})
		$(".bigul_li5 .hid,.imgbox").css("display","block")
	})
	login5.on("mouseleave",function(){
		login5.css({"width":"65px","height":"18px","padding":"9px 25px 0 10px","position":"relative","border":"0"})
		$(".bigul_li5 .hid,.imgbox").css("display","none")
	})
	
	var login7 = $(".bigul_li7")//微信
	login7.on("mouseenter",function(){
		$(".bigul_li7 span").css("display","block")
	})
	login7.on("mouseleave",function(){
		$(".bigul_li7 span").css("display","none")
	})
	
	
	/*-------------------搜索框的值得焦失焦事件---------------------------*/
	$("#header .box3 .center input").val("");//刷新时清空文本框输入值
	var inpres = $("#header .box3 .center input").attr("placeholder");//获取设定的placeholder值
	$("#header .box3 .center input").on("focus",function(){//得焦时将placeholder值清空
		$("#header .box3 .center input").attr("placeholder","");
	})
	$("#header .box3 .center input").on("blur",function(){//失焦时变回
		$("#header .box3 .center input").attr("placeholder",inpres);
	})



	/*-------------------------------显示购物车件数---------------------------*/
	//	ie 兼容问题多余补写一个添加
	//让页面刷新时默认就添加一个标签元素显示购物车件数默认0
	$("#header .box3 .right").html("<a href='html/shoppingcart.html'>购物袋<span class='numcolor'>&nbsp;0&nbsp;</span>件</a>");
	if(getCookie("things") != ""){//ie兼容
		var things = getCookie("things");//获取代表购物车件数的cookie，在购物车页面的时候会创建
		if(things != ""){//如果存在就添加其值为件数显示，否则还是显示为0；
			$("#header .box3 .right").html("<a href='html/shoppingcart.html'>购物袋<span class='numcolor'>&nbsp;" + things + "&nbsp;</span>件</a>");
		}else{
			$("#header .box3 .right").html("<a href='html/shoppingcart.html'>购物袋<span class='numcolor'>&nbsp;0&nbsp;</span>件</a>");
		}
	}
	
	/*------------------------页面跳转-------------------------*/
	//点击头部的sale，新客分享，邦邦团的时候跳转至其详情页面
	$(".box4 li.jumpdetail a").on("click",function(){
		document.cookie = "dataid="+$(this).attr("dataid")+";path=/;";
		document.cookie = "dataid"+$(this).attr("dataid")+"="+$(this).attr("dataid")+";path=/;";
	})//并且创建一个cookie代表其本身的产品的id，id值一般在列表页进行json载入添加，这里在页面里添加以代替
	//列表页呈现一个简易效果检测，获取这个链接的自定义id的值创建即可；
	
	/*------------------------公用样式点击回到头部-------------------------*/
	$(window).on("scroll",function(){//当页面开始滚动的时候
		if($(this).scrollTop() >= 880){//判断一个数值，大于时即显示，小于则消失
			$(".jumptop .jump").css("visibility","visible");
		}else{
			$(".jumptop .jump").css("visibility","hidden");
		}
	})
	$(".jumptop .jump").on("click",function(){//点击的跳转事件
		$("html,body").animate({"scrollTop":"0"},300);//让页面滚动条的值以动画的方式变回0
	})
	
})
