$(function(){
	/*----------------放大镜事件------------------------*/
	var sBox = $(".content_top .small_img");//小图盒子
	var gls = $(".glass");//放大镜
	sBox.on("mouseenter",function(){//移入小图盒子时
		gls.css("display","block");//放大镜显示
		$(".big_img").css("display","block");//大图盒子显示
		sBox.on("mousemove",function(e){//鼠标移动事件
			var gL = e.pageX-sBox.offset().left-gls.width()/2;//获取鼠标页面距离减去小图盒子的偏移然后再减去一半的放大镜的值让放大镜处于盒子中心距离
			var gT = e.pageY-sBox.offset().top-gls.height()/2;
			//判断边界值
			if(e.pageX-sBox.offset().left >= sBox.width()-gls.width()/2){//当鼠标在盒子里的相对坐标超过了盒子的值减去放大镜的值得时候，将坐标定住
				gL = sBox.width()-gls.width();
			}
			if(e.pageX-sBox.offset().left <= gls.width()/2){//小于放大镜的时候将值定位0
				gL = 0;
			}
			if(e.pageY-sBox.offset().top >= sBox.height()-gls.height()/2){
				gT = sBox.height()-gls.height();
			}
			if(e.pageY-sBox.offset().top <= gls.height()/2){
				gT = 0;
			}
			gls.css({"left":gL,"top":gT})//将值赋给放大镜
			//因为是等比例缩放，所以将放大镜的偏移值成比例给大图盒子的图片的定位值，因为是图片移动不是盒子，所以是负值
			$(".bImg").css({"left":-gls.position().left*2,"top":-gls.position().top*2})	
		})
	})
	
	sBox.on("mouseleave",function(){//鼠标移出的时候消失
		gls.css("display","none");
		$(".big_img").css("display","none");
	})
	//放大镜下列表点击切换放大镜图片以及增添列表样式
	$(".content_top_l li").on("click",function(){//当li被点击时
		if($(this).attr("class") != "add"){//判断这个li是否有add这个class属性
			//没有就添加这个class，然后兄弟节点移除class属性，并将样式还原
			$(this).addClass("add").siblings().removeClass("add").css("border","1px solid #c7c7c7");
		}else{
			$(this).removeClass("add");//如果有则删除
		}//小图点击添加边框事件
//		点击小图换大图
		var inx = $(this).index()+1;//获取每次点击要切换的图的路径不同的那个数字值
		//获取路径时候如果有中文则会加密，无法用正常的路径加变量直接改变，所以直接截取到要改变的地方去替换掉,中文路径会有加密
		var sm_img_now = $(".small_img").css("background-image");//获取背景图的路径
		/*for(var i = 0;i<sm_img_now.length;i++){
			console.log(sm_img_now.charAt(i)+":"+i)
		}//遍历出需要替换的下标*/
//		无论是什么,替换成想要替换的图片值
		var sm_img_chg = sm_img_now.replace("img"+sm_img_now.charAt(54),"img"+inx);
//		图片的直接修改即可
//		然后将大图盒子和小图盒子的图片全部换成替换的图片路径即可
		$(".big_img .bImg").attr("src","../img/big_img"+inx+".jpg");
		$(".small_img").css("background-image",sm_img_chg);
	})
	/*-----------------------列表移入移出事件-----------------*/
	$(".content_top_l li").on("mouseenter",function(){
		if($(this).attr("class") != "add"){
			$(this).css("border","1px solid #f8584f");
		}
	})//移入移出时判断如果该li有add的样式，就不变，如果没有就添加一个移入样式
	$(".content_top_l li").on("mouseleave",function(){
		if($(this).attr("class") != "add"){
			$(this).css("border","1px solid #c7c7c7");
		}
	})
	//放大镜结束,top左侧结束

	//会员规则移入移出
	$("#content .content_top_r_ul_li3 .rule dt a").on("mouseenter",function(){
		$("#content .content_top_r_ul_li3 .rule dd").css("display","block");
	})
	$("#content .content_top_r_ul_li3 .rule dt a").on("mouseleave",function(){
		$("#content .content_top_r_ul_li3 .rule dd").css("display","none");
	})
	
	/*-------------------商品款式选择文字提示--------------------*/
	var styl = ["颜 色：请选择颜色","颜 色：收藏家"];//定义数组存入商品的款式，颜色
	$(".content_top_r_ul_li6 a").on("click",function(){//点击切换样式
		if(!$(".content_top_r_ul_li6 a").eq($(this).index()).hasClass("sty")){
			$(".content_top_r_ul_li6 a").eq($(this).index()).addClass("sty").siblings().removeClass("sty");
		}else{
			$(".content_top_r_ul_li6 a").eq($(this).index()).removeClass("sty");
		}
		//遍历所有的款式，如果有sty这个属性就表示被选中，提示该款式在数组里面存储的文字，没选中的统一提示第一个
		for(var i = 0;i<$(".content_top_r_ul_li6 a").size();i++){//当有多个样式的时候，遍历
			
			$(".content_top_r_ul_li5").text(styl[0]);//默认文本框显示值为未选择
			if($(".content_top_r_ul_li6 a").eq(i).hasClass("sty")){//当存在带有sty样式的标签时
				$(".content_top_r_ul_li5").text(styl[i+1]);//更改文本框值
				return;
			}		
		}
	})
	$(".content_top_r_ul_li6 a").on("mouseenter",function(){//鼠标移入移出时候的样式
			$(this).addClass("st");
	})
	$(".content_top_r_ul_li6 a").on("mouseleave",function(){
			$(this).removeClass("st");
	})
	var size = ["尺 码：请选择尺码","尺 码：2ml*9"]
	$(".content_top_r_ul_li8 a").on("click",function(){//点击切换样式
		if(!$(".content_top_r_ul_li8 a").eq($(this).index()).hasClass("sty")){
			$(".content_top_r_ul_li8 a").eq($(this).index()).addClass("sty").siblings().removeClass("sty");
		}else{
			$(".content_top_r_ul_li8 a").eq($(this).index()).removeClass("sty");
		}
		//遍历所有的款式，如果有sty这个属性就表示被选中，提示该款式在数组里面存储的文字，没选中的统一提示第一个
		for(var i = 0;i<$(".content_top_r_ul_li8 a").size();i++){
			
			$(".content_top_r_ul_li7").text(size[0])
			if($(".content_top_r_ul_li8 a").eq(i).hasClass("sty")){
				$(".content_top_r_ul_li7").text(size[i+1]);
				return;
			}//写css样式的时候需要注意书写顺序，将默认样式写为最低优先级，点击添加的写为最大优先级，并且注意更改数值防止变形		
		}
	})
	$(".content_top_r_ul_li8 a").on("mouseenter",function(){//鼠标移入移出时候的样式
			$(this).addClass("st");
	})
	$(".content_top_r_ul_li8 a").on("mouseleave",function(){
			$(this).removeClass("st");
	})
	
/*-------------------------------------购物车添加------------------------*/
	$(".content_top_r_ul_li9 input").eq(0).val("1");//每次刷新时重置文本框输入值
	var fT = null;//设置变量装定时器进行多次点击时清除
	$(".content_top_r_ul_li9 .reduce").on("click",function(){//减号点击判断
		if($(".content_top_r_ul_li9 input").eq(0).val() <= 1){//当点击的时候文本框值小于等于1时
			$(".content_top_r_ul_li10").text("对不起，数量至少为1件。");//因为下面修改了内容值，所以还原
			$(".content_top_r_ul_li10").fadeIn(1000,function(){//然后让tips显示，并在显示完成后执行回调函数
				clearTimeout(fT);//防止多次点击重复执行
				fT = setTimeout(function(){//显示后1.5秒后执行1秒淡出
					$(".content_top_r_ul_li10").stop().fadeOut(1000);
				},1500)	
			});
		}else{//不小于1就减1即可
			$(".content_top_r_ul_li9 input").eq(0).val($(".content_top_r_ul_li9 input").eq(0).val()-1);
		}
	})	

//接口   库存提示范围,
	var inventory = 10;
	if(inventory > 50){
		$(".content_top_r_ul_li9 .tips").text("库存充足");
	}else{
		$(".content_top_r_ul_li9 .tips").text("库存紧张");
	}
	$(".content_top_r_ul_li9 .remain").text("(库存剩余数量"+inventory+")");

	$(".content_top_r_ul_li9 .increase").on("click",function(){
		if($(".content_top_r_ul_li9 input").eq(0).val() >= inventory){//加号事件判断
				$(".content_top_r_ul_li10").html("对不起，数量最多为"+inventory+"件。").fadeIn(1000,function(){
				clearTimeout(fT);
				fT = setTimeout(function(){
					$(".content_top_r_ul_li10").stop().fadeOut(1000);
				},1500)
			});	
		}else{
			$(".content_top_r_ul_li9 input").eq(0).val(Number($(".content_top_r_ul_li9 input").eq(0).val())+1);
		}
	})//因为返回的是字符串，所以用加号的时候需要进行转换
	

	
//接口		留接口给列表页传递过来的产品cookieID
	var dataid = getCookie("dataid");//获取点击商品跳转到详情页产生的cookie值
	$.ajax({//购物车json数据传递
		type:"get",
		url:"../json/gouwuche.json",
		dataType:"json",
		success:function(mag){
			var detali = mag.data;
			for(var i in detali){//遍历购物车json数据
				if(dataid == detali[i].id){//在Json数据中遍历获取是什么产品,重做json后改这个地方的，
				//将所有列表页的东西加上jsonID 点击生成cookie 到详情页后更换所有的图片，价格以及内容
					$(".content_top_r_ul_li11 input.put").attr("dataid",dataid);
				}//设置按钮的ID让等于产品的ID 这样点击加入购物车后就能知道是什么
			}
			
			if(document.cookie != ""){//过一遍是否有历史记录cookie，有就创建历史记录
				var histArr = document.cookie.split(";");//将所有cookie以；分割放入新数组中
				var histArr1 = [];
				for(var i = 0;i<histArr.length;i++){
					var histArr2 = histArr[i].split("=")//将该数组里面的每个值重新以等号分割
					if(histArr2[0].indexOf("hisid") != -1){//查找里面是否存在历史记录的cookie
						histArr1.push(histArr2[1])//如果有将值放入新数组中
					}
				}
				
				var str = "";
				if(histArr1.length > 0){//当创建过历史记录的
					for(var i = 0;i<histArr1.length;i++){//添加历史记录
						if($("div.history dl").length>0){//当添加过历史记录
							for(var j =0;j<$("div.history dl").length;j++){//将数组里面的所有值与添加的历史记录里面的标注值相比
								if(histArr1[i] != $("div.history dl").eq(j).attr("hisid")){//当数组的那个值不等于添加记录里面的标注值
									if(j == $("div.history dl").length-1){//且不等于到最后一个dl的id，则创建该历史记录
										str += "<dl hisid='"+histArr1[i]+"'>";
										str += "<dt class='hisimg'><a href='"+detali[histArr1[i]-1].html+"'><img src='"+detali[histArr1[i]-1].img+"' alt='未加载' /></a></dt>";
										str += "<dd class='hisname'><a href='"+detali[histArr1[i]-1].html+"'>"+detali[histArr1[i]-1].name+"</a></dd>";
										str += "<dd class='hisprice'>"+detali[histArr1[i]-1].price+"</dd>";
										str += "</dl>";	
										$("#content .content_bottom div.btmleft div.history").html(str);//因为每次刷新都会循环第一次的时候dl是没添加的所以为0，就自动执行else，所以改用html覆盖
									}
								}
							}
							
						}else{
							str += "<dl hisid='"+histArr1[i]+"'>";
							str += "<dt class='hisimg'><a href='"+detali[histArr1[i]-1].html+"'><img src='"+detali[histArr1[i]-1].img+"' alt='未加载' /></a></dt>";
							str += "<dd class='hisname'><a href='"+detali[histArr1[i]-1].html+"'>"+detali[histArr1[i]-1].name+"</a></dd>";
							str += "<dd class='hisprice'>"+detali[histArr1[i]-1].price+"</dd>";
							str += "</dl>";
							$("#content .content_bottom div.btmleft div.history").append(str);
						}
						/*for(var j = 0;j<$("div.history dl").length;j++){
							if($("div.history dl").eq(j).attr("hisid") != histArr1[i])*/	
						}
					}

				
			}
			
			/*------------------------购物车点击事件-------------------------------*/
			$(".content_top_r_ul_li11 input.put").on("click",function(){//点击加入购物车时事件
				var dataid = $(this).attr("dataid");//获取这个页面的产品id值
				document.cookie = encodeURIComponent(""+dataid)+"="+encodeURIComponent(dataid)+";path=/;";//让每次存储的都不一样，就不会被覆盖了，进入购物车用的
				//上面创建的是产品不重复的cookie分别存储
				//然后创建添加到购物车的该产品的数量
				var shopnumber = $(".content_top_r_ul_li9 input").eq(0).val();
				if(getCookie("shopNum"+dataid)){//判断是否已经选过该商品并创建数量值cookie，以删除cookie的方式判断，如果不是删除cookie的方式判断是否等于修改的值
					var oldn = Number(getCookie('shopNum'+dataid));//获取已经存在的商品数量值
					var newn = oldn + Number(shopnumber);//创建新的数量值
					document.cookie = encodeURIComponent("shopNum"+dataid)+"="+ encodeURIComponent(newn)+";path=/;";//覆盖原cookie
				}else{
					document.cookie = encodeURIComponent("shopNum"+dataid)+"="+encodeURIComponent(shopnumber)+";path=/;";//如果没有则直接创建数量cookie
				}//当cookie存储的值为中文时候会导致服务器崩溃，为避免需要转码
				
				
				if(inventory < shopnumber){//如果库存小于加入购物车数量
					alert("该商品库存不足！")
				}else{//弹框选择是否继续购物或者跳转购物车
					$("#content .content_top .alt").css("display","block");//让选择框显示
					for(var i = 0;i<$(".content_top_r_ul_li6 a").size();i++){//判断是否选择款式了
						if($(".content_top_r_ul_li6 a").eq(i).hasClass("sty")){//如果有该样式则选择了
							document.cookie = "color"+dataid+"="+i+";path=/;";//创建选择的款式的cookie
						}
					}
					for(var i = 0;i<$(".content_top_r_ul_li8 a").size();i++){
						if($(".content_top_r_ul_li8 a").eq(i).hasClass("sty")){
							document.cookie = "size"+dataid+"="+i+";path=/;";
						}
					}
					document.cookie = "inventory"+dataid+"="+encodeURIComponent($(".content_top_r_ul_li9 .tips").text())+";path=/;"
					document.cookie = "inventoryNum"+dataid+"="+inventory+";path=/;";
					//创建库存值cookie以及库存值范围提示
					//创建该商品id结尾的颜色,库存以及款式cookie在购物车页面获取
				}
				//每次点击购物车添加时创建一个历史记录放入左侧提示,更改时换成页面加载时候就添加
				document.cookie = "hisid"+dataid+"="+dataid+";path=/;";//创建历史id，用于历史记录
				
				/*var jArr = document.cookie.split(";");
				var jArr1 = [];
				var str1 = "";
				for(var i = 0;i<jArr.length;i++){
					var jArr2 = jArr[i].split("=");
					if(jArr2[0].indexOf("dataid") != -1){
						jArr1.push(jArr[1]);
					}
				}
				for(var i = 0;i<$("#content .content_bottom div.btmleft div.history dl").length;i++){
					for(var j = 0;j<jArr1.length;j++){
						if($("#content .content_bottom div.btmleft div.history dl").eq(i).attr("hisid") != jArr1[j]){//当已经创建的历史里面没有等于该页面的id时候
							if(i == $("#content .content_bottom div.btmleft div.history dl").length-1){//并且遍历到最后都不等于的时候
								str1 += "<dl hisid='"+dataid+"'>";
								str1 += "<dt class='hisimg'><a href='"+detali[dataid-1].html+"'><img src='"+detali[dataid-1].img+"' alt='未加载' /></a></dt>";
								str1 += "<dd class='hisname'><a href='"+detali[dataid-1].html+"'>"+detali[dataid-1].name+"</a></dd>";
								str1 += "<dd class='hisprice'>"+detali[dataid-1].price+"</dd>";
								str1 += "</dl>";
								$("#content .content_bottom div.btmleft div.history").html(str1);
							}
						}
					}
				}*/
			})
		
			$("#content .content_top .alt div.gotake input.left").on("click",function(){
				window.location.href = "shoppingcart.html";
			})//点击去结算跳到购物车
			
		}
		
	})//ajax结束
	
	
	//分享的2级菜单
	$(".content_center_top_sec").on("mouseenter",function(){
		$(".content_center_top_sec ul").css("display","block");
	})
	$(".content_center_top_sec").on("mouseleave",function(){
		$(".content_center_top_sec ul").css("display","none");
	})
	
	$("#content .content_top .alt div.gotake input.right").on("mouseenter",function(){
		$("#content .content_top .alt div.gotake input.right").css({"border":"1px solid #F8584F","color":"#f8584f"});
	})//加入购物车弹框继续购物的移入移出样式
	$("#content .content_top .alt div.gotake input.right").on("mouseleave",function(){
		$("#content .content_top .alt div.gotake input.right").css({"border":"1px solid #ccc","color":"#000"});		
	})
	$("#content .content_top .alt .closer").on("click",function(){
		$("#content .content_top .alt").css("display","none")
	})//点击关闭弹框
	/*-------------------------------------------商品详情的锚链接----------------------------*/
	$(window).on("scroll",function(){//到达一定高度显示定位栏,兼容问题，google只认body
		/*if($("body").scrollTop() >= 0){
			if($("body").scrollTop() >= $(".btmright_first").offset().top){
				$("ul.btmright_second").css("display","block");
			}else{
				$("ul.btmright_second").css("display","none");
			}
		}
		if($("html,body").scrollTop() >= 0){
			if($("html,body").scrollTop() >= $(".btmright_first").offset().top){
				$(".btmright_second").css("display","block");
			}else{
				$(".btmright_second").css("display","none");
			}
		}*/
		if($(window).scrollTop() >= $(".btmright_first").offset().top){
			$("ul.btmright_second").css("display","block");
		}else{
			$("ul.btmright_second").css("display","none");
		}//不用兼容判断的写法
		
	})
	$(".goodsdetail").on("click",function(){//给每个定位栏加事件
		$("html,body").scrollTop($(".btmright_point").offset().top-$(".btmright_first").height());
	})
	$(".goodsproduct").on("click",function(){
		$("html,body").scrollTop($(".talkabout").offset().top-$(".btmright_first").height());
	})
	$(".goodspoint").on("click",function(){
		$("html,body").scrollTop($(".allrules").offset().top-$(".btmright_first").height());
	})
	$(".returntop").on("click",function(){
		$("html,body").scrollTop(0);
	})
})
						