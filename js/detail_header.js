$(function(){
	$.ajax({
		type:"get",
		url:"../json/detail_header.json",
		dateType:"json",
		success:function(mag){
			var data1 = mag.data1;
			for(var i in data1){
				$(".box1 .box1Left a").eq(i).html(data1[i].img);
			}
			$("img").on("mouseenter",function(){
				$(this).stop().animate({"opacity":"0.8"},300)
			})
			$("img").on("mouseleave",function(){
				$(this).stop().animate({"opacity":"1"},300)
			})
		}
		
		
	})
	$(".box1 .box1Left a").eq(0).css("background","#fff");
//	判断是否登录了
	if(getCookie("userName") != ""){
		var userName = getCookie("userName");
		if(userName != ""){
			$(".bigul_li1,.bigul_li2").css("display","none");
			$("<li class='username l'><a href='javascript:;'>"+ userName +"&nbsp;&nbsp;</a><a class='res' href='javascript:;'>[退出]</a></li>").prependTo($(".bigul"))
		}
	}
	$(".res").on("click",function(){
		$(".username").remove();
		removeCookie("userName");
		$(".bigul_li1,.bigul_li2").css("display","block");
	})
	
//	下拉菜单
	var login1 = $(".bigul_li1")
	login1.on("mouseenter",function(){
		login1.css({"width":"24px","height":"18px","padding":"9px 24px 0 10px","position":"relative","borderLeft":"1px solid #b5b5b5","borderRight":"1px solid #b5b5b5"})
		$(".bigul_li1 .hid,.bigul_li1_smallul").css("display","block")
	})
	login1.on("mouseleave",function(){
		login1.css({"width":"24px","height":"18px","padding":"9px 25px 0 10px","position":"relative","border":"0"})
		$(".bigul_li1 .hid,.bigul_li1_smallul").css("display","none")
	})	
	
	var login3 = $(".bigul_li3")
	login3.on("mouseenter",function(){
		login3.css({"width":"48px","height":"18px","padding":"9px 24px 0 9px","position":"relative","borderLeft":"1px solid #b5b5b5","borderRight":"1px solid #b5b5b5"})
		$(".bigul_li3_smallul").css("display","block")
	})
	login3.on("mouseleave",function(){
		login3.css({"width":"48px","height":"18px","padding":"9px 25px 0 10px","position":"relative","border":"0"})
		$(".bigul_li3_smallul").css("display","none")
	})	
	
	var login5 = $(".bigul_li5")
	login5.on("mouseenter",function(){
		login5.css({"width":"65px","height":"18px","padding":"9px 24px 0 9px","position":"relative","borderLeft":"1px solid #b5b5b5","borderRight":"1px solid #b5b5b5"})
		$(".bigul_li5 .hid,.imgbox").css("display","block")
	})
	login5.on("mouseleave",function(){
		login5.css({"width":"65px","height":"18px","padding":"9px 25px 0 10px","position":"relative","border":"0"})
		$(".bigul_li5 .hid,.imgbox").css("display","none")
	})
	
	var login7 = $(".bigul_li7")
	login7.on("mouseenter",function(){
		$(".bigul_li7 span").css("display","block")
	})
	login7.on("mouseleave",function(){
		$(".bigul_li7 span").css("display","none")
	})
	
	
	
	var inpres = $("#header .box3 .center input").attr("placeholder")
	$("#header .box3 .center input").on("focus",function(){
		$("#header .box3 .center input").attr("placeholder","");
	})
	$("#header .box3 .center input").on("blur",function(){
		$("#header .box3 .center input").attr("placeholder",inpres);
	})
	
//	首页显示购物车件数
	$("#header .box3 .right").html("<a href='html/shoppingcart.html'>购物袋<span class='numcolor'>&nbsp;0&nbsp;</span>件</a>")
	if(getCookie("things") != ""){//ie兼容
		var things = getCookie("things");
		if(things != ""){
			$("#header .box3 .right").html("<a href='shoppingcart.html'>购物袋<span class='numcolor'>&nbsp;" + things + "&nbsp;</span>件</a>")
		}else{
			$("#header .box3 .right").html("<a href='shoppingcart.html'>购物袋<span class='numcolor'>&nbsp;0&nbsp;</span>件</a>")
		}
	}
//	返回顶部
	$(window).on("scroll",function(e){
		if($(this).scrollTop() >= 880){
			$(".jumptop .jump").css("visibility","visible");
		}else{
			$(".jumptop .jump").css("visibility","hidden");
		}
	})
	$(".jumptop .jump").on("click",function(){
		$("html,body").animate({"scrollTop":"0"},300)
	})
	
})
