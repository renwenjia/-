$(function(){
	var cookies = document.cookie;//当跳转到购物车页面的时候，获取所有的创建的cookie
	var cookie = cookies.split("; ");//将所有的cookie以一个等式形式存储在数组中,发现每次分割的时候多了个空格所以这里用逗号加空格分割
	
	var arr = [];//用来装有哪些加入购物车的东西
	var arr1 = [];//用来装购买数量的产品的id，中转做判断
	var arr2 = [];//用来装购买的数量
	var arr3 = [];//装最后对应正确id值得结果的数量
	/*------------------------------数值存储判断----------------------------------*/
	if(cookie[0] != ""){//判断进入该页面的时候cookie是否为空，进行删除cookie的测试时候没cookie会报错，并且再次进入的时候arr数组里面会有第一次遗留下来的一个空元素占了第一个位置
		for(var i = 0;i<cookie.length;i++){
			var checkcookie = cookie[i].split("=")//以等号为分界将存储的每个数值对分开判断,以长度2的形式装入新的数组
			
			if(!isNaN(checkcookie[0]*1)){//每次分割判断的第一个都是原本cookie名，判断是不是数字 ，如果是
				arr.push(checkcookie[0])//是数字的就是给按钮添加的dataid值存储的，即产品id信息
			}else if(checkcookie[0].indexOf("shopNum") != -1){
				arr1.push(checkcookie[0].replace("shopNum",""));//将设置的cookie的预留的识别字替换成空，只留下id值
				arr2.push(checkcookie[1]);//将数量值装在不同数组的相同下标值位置对应
			}
		}
	}
	for(var i = 0;i<arr.length;i++){//用正确的购物车的id
		for(var j = 0;j<arr1.length;j++){//在取出shopNum的数组中判断
			if(arr[i] == arr1[j]){//如果id对上
				arr3[i] = arr2[j];//将数量值放入购物车id对应下标
				break;//找到就终止
			}else{
				arr3[i] = "0";//如果都没对上的扔个0进去占位置
			}
		}
	}
	var allNum = 0;
	for(var i = 0;i<arr3.length;i++){//算出购物车里面所有物品的总加入数量
		allNum += Number(arr3[i]);
	}
	$(".box13 .listnum").text("("+ allNum +")")//替换购物袋数量值
	$(".box5 span.box551").text(allNum);//总计数量值页在页面刷新时显示
	document.cookie = "things="+allNum+";path=/;";//并且创建things的cookie
	
	$.ajax({//创建加入购物车的东西显示在页面
		type:"get",
		url:"../json/gouwuche.json",
		success:function(mag){
			var shop = mag.data;
			var str = "";
			var str1 = "";
			var allMoney = 0;
			for(var i = 0;i<arr.length;i++){//遍历加入购物车物品的长度
				str += "<ul class='w'>";//创建ul
				str += "<li class='li1'><i class='yes'>√</i><i class='no'></i></li>";//对勾创建
				str += "<li class='li2'><dl><dt class='l'><a href='"+shop[arr[i]-1].html+"'><img src='"+shop[arr[i]-1].img+"' alt='未加载'/></a></dt>"//img创建
				//都是根据arr【i】里面的那个id值来找json里面对应的id值，但是json是要获取下标的，所以按顺序找到该id值需减一
				str += "<dd class='l'><p class='p1'><a href='"+shop[arr[i]-1].html+"'>"+shop[arr[i]-1].name+"</a></p><p class='p2'>"+shop[arr[i]-1].bianhao+"</p></dd></dl>"
				str += "<li class='li3'><p class='p3'>"+shop[arr[i]-1].color[getCookie("color"+arr[i])]+"</p><p class='p4'>"+shop[arr[i]-1].size[getCookie("size"+arr[i])]+"</p></li>"
				str += "<li class='li4'><p class='p5'>￥"+shop[arr[i]-1].rate+"</p><p class='p6'>￥"+shop[arr[i]-1].price+"</p>";
				str += "<div class='changesale'>修改优惠<p class='p7'><input class='l' type='checkbox' /><span class='l'>不使用活动优惠</span></p></div></li>";
				str += "<li class='li5'><div class='changenum'><span class='l numdown'>-</span><input class='l' type='text' value='"+arr3[i]+"' /><span class='l numup'>+</span>";
				str += "<p class='l p8'>"+getCookie("inventory"+arr[i])+"</p></li>";
				str += "<li class='li6'>￥"+(shop[arr[i]-1].price*arr3[i])+"</li>";
				str += "<li class='li7'><a class='good' href='javascript:;'>移入我的点赞</a><a class='bad' href='javascript:;'>删除</a></li>"
				str += "</ul>";
				
				str1 += "<li><dl><dt><a href='"+shop[arr[i]-1].html+"'><img src='"+shop[arr[i]-1].img+"' alt='未加载'/></a></dt>";
				str1 += "<dd><p class='ptop'>"+shop[arr[i]-1].name+"</p><p class='pbtm'><span class='l spleft'>￥"+shop[arr[i]-1].price+"</span><span class='l sprit'>￥"+shop[arr[i]-1].rate+"</span><a dataid='"+arr[i]+"' class='r' href='javascript:;'>加入购物袋</a></p>";
				str1 += "</dd></dl></li>";
				$("#content div.box6 ul").html(str1);
				$("#content div.box4").html(str);
				allMoney += shop[arr[i]-1].price*arr3[i];
			}//创建所有加入购物车物品的信息
			$(".box5 span.box552").text(allMoney);
			$(".box5 span.box553").text(allMoney);
			//上面是将所有的页面初始值在页面刷新时修改一次
			//效果添加
			$(".box4 ul .li4 div.changesale").on("mouseenter",function(){
				var inx = $(this).parents(".box4 ul").index();
				$(".box4 ul .li4 div.changesale p.p7").eq(inx).stop().slideDown()
			})
			$(".box4 ul .li4 div.changesale").on("mouseleave",function(){
				var inx = $(this).parents(".box4 ul").index();
				$(".box4 ul .li4 div.changesale p.p7").eq(inx).stop().slideUp()
			})//是否使用优惠
			//左右加减判断，每次点击都创建数值覆盖原产品数量值
			$(".box4 ul .li5 div.changenum span").on("click",function(){
				var inx = $(this).parents(".box4 ul").index();
				if($(this).index() == 0){	
					if($(".box4 ul .li5 div.changenum input").eq(inx).val() > 1){
						$(".box4 ul .li5 div.changenum input").eq(inx).val($(".box4 ul .li5 div.changenum input").eq(inx).val()-1)
						document.cookie = "shopNum"+arr[inx]+"="+$(".box4 ul .li5 div.changenum input").eq(inx).val()+";path=/";
					}
				}
				if($(this).index() == 2){	
					if($(".box4 ul .li5 div.changenum input").eq(inx).val() < Number(getCookie("inventoryNum"+arr[inx]))){//如果小于库存存储数据值
						$(".box4 ul .li5 div.changenum input").eq(inx).val(Number($(".box4 ul .li5 div.changenum input").eq(inx).val())+1)
						document.cookie = "shopNum"+arr[inx]+"="+$(".box4 ul .li5 div.changenum input").eq(inx).val()+";path=/";
					}
				}//重新赋值给页面
				$(".box4 ul .li6").eq(inx).html("￥"+$(".box4 ul .li5 div.changenum input").eq(inx).val()*shop[arr[inx]-1].price);//点击后价格变更
				
				var nowAllNum = 0;
				var nowAllMoney = 0;
				
				for(var i = 0;i<$(".box4 ul").length;i++){
					nowAllNum += Number($(".box4 ul .li5 input").eq(i).val())
					nowAllMoney += Number($(".box4 ul .li5 div.changenum input").eq(i).val()*shop[arr[i]-1].price)
				}//增减后改变统一值
				$(".box13 .listnum").text("("+ nowAllNum +")")
				$(".box5 span.box551").text(nowAllNum);
				$(".box5 span.box552").text(nowAllMoney);
				$(".box5 span.box553").text(nowAllMoney);
			})
			//当直接使用文本框改选值得时候，失焦事件判断
			$(".box4 .li5 .changenum input").on("blur",function(){
				var inx = $(this).parents(".box4 ul").index();
				if(Number($(this).val())>Number(getCookie("inventoryNum"+arr[$(this).parent().index()]))){
					$(this).val(getCookie("inventoryNum"+arr[$(this).parent().index()]));
					
				}
				if(Number($(this).val())<1){
					$(this).val(1);
				}
				document.cookie = "shopNum"+arr[inx]+"="+$(this).val()+";path=/;";
				//在进行一次所有数据判断
				arr3[$(this).parent().index()] = $(this).val();
				var allNum = 0;
				for(var i = 0;i<arr3.length;i++){//算出购物车里面所有物品的总加入数量
					allNum += Number(arr3[i]);
				}
				$(".box4 ul .li6").eq(inx).html("￥"+$(".box4 ul .li5 div.changenum input").eq(inx).val()*shop[arr[inx]-1].price);//点击后价格变更
				
				var nowAllNum = 0;
				var nowAllMoney = 0;
				for(var i = 0;i<$(".box4 ul").size();i++){
					nowAllNum += Number($(".box4 ul .li5 input").eq(i).val())
					nowAllMoney += Number($(".box4 ul .li5 div.changenum input").eq(i).val()*shop[arr[i]-1].price)
				}//增减后改变统一值
				console.log(nowAllNum,nowAllMoney)
				$(".box13 .listnum").text("("+ nowAllNum +")")
				$(".box5 span.box551").text(nowAllNum);
				$(".box5 span.box552").text(nowAllMoney);
				$(".box5 span.box553").text(nowAllMoney);
			})
			
			
			//删除购物车
			$(".box4 ul .li7 a.bad").on("click",function(){//单独删除点击时
				var inx = $(this).parents(".box4 ul").index();//找到他的父盒子的下标
				if(confirm("是否删除")){//弹出询问是否删除
					removeCookie(""+arr[inx]);//清除cookie
					removeCookie("shopNum"+arr[inx]);
					removeCookie("things"+arr[inx]);
					$(".box4 ul").eq(inx).remove();//清除页面元素
					arr.splice(inx,1);//将该物品的id值从数组中清除，以免重复
					arr2.splice(inx,1);
					arr3.splice(inx,1);
					var nowAllNum = 0;
					var nowAllMoney = 0;
					for(var i = 0;i<$(".box4 ul").length;i++){
						nowAllNum += Number($(".box4 ul .li5 input").eq(i).val())
						nowAllMoney += Number($(".box4 ul .li5 div.changenum input").eq(i).val()*shop[arr[i]-1].price)
					}//增减后改变统一值
					$(".box13 .listnum").text("("+ nowAllNum +")")
					$(".box5 span.box551").text(nowAllNum);
					$(".box5 span.box552").text(nowAllMoney);
					$(".box5 span.box553").text(nowAllMoney);
				}
			})
			
			$(".box5 li.box53").on("click",function(){//统一删除点击
				for(var i = 0;i<$(".box4 ul").length;i++){
					if($(".box4 .yes").eq(i).css("display") == "block"){
						removeCookie(""+arr[i])//清除cookie
						removeCookie("shopNum"+arr[i])
						removeCookie("things"+arr[i])
						$(".box4 ul").eq(i).remove();//清除页面元素
						arr.splice(i,1);//将该物品的id值从数组中清除，以免重复
						arr2.splice(i,1)
						arr3.splice(i,1);
						var nowAllNum = 0;
						var nowAllMoney = 0;
						for(var i = 0;i<$(".box4 ul").size();i++){
							nowAllNum += Number($(".box4 ul .li5 input").eq(i).val())
							nowAllMoney += Number($(".box4 ul .li5 div.changenum input").eq(i).val()*shop[arr[i]-1].price)
						}//增减后改变统一值
						$(".box13 .listnum").text("("+ nowAllNum +")")
						$(".box5 span.box551").text(nowAllNum);
						$(".box5 span.box552").text(nowAllMoney);
						$(".box5 span.box553").text(nowAllMoney);
					}
				}
			})
			
			//结算
			
			$(".box5 .box56").on("click",function(){
				var onOff = false;
				for(var i = 0;i<$("div.box4 ul i.yes").length;i++){
					if($("div.box4 ul i.yes").eq(i).css("display") == "block"){
						onOff = true;
					}//判断是否有勾选存在
				}
				if(onOff){//如果有则将该物品创建cookie给支付页面
					if($("#header .box2 .bigul_li1").css("display") == "none"){
						for(var i = 0;i<$(".box4 ul").length;i++){//结算的时候遍历添加进页面的ul的长度
							if($(".box4 ul .yes").eq(i).css("display") == "block"){//如果打钩了就选中它
								document.cookie = "payFor"+arr[i]+"="+arr[i]+";path=/;";
								document.cookie = "shopNum"+arr[i]+"="+$(".box4 .li5 .changenum input").eq(0).val()+";path=/;";
							}//结算的时候更改购物数量为用户最终选择输入结果
						}
						window.location.href = "payfor.html";//如果登陆的那个标签不在就表示已经登陆了
					}else{
						window.location.href = "login/login.html";
					}
				}else{
					alert("您未选择任何物品");
				}
			})
			
			
			//全选框
			$(".yes").on("click",function(){
				$(this).css("display","none");
				$(".no").eq($(this).index(".yes")).css("display","block");
				
				if($(".yes:first").css("display") == "none"){
					$(".yes").css("display","none");
					$(".no").css("display","block");
				}
				if($(".yes:eq(1)").css("display") == "none"){
					$(".yes").css("display","none");
					$(".no").css("display","block");
				}
				if($(".yes:last").css("display") == "none"){
					$(".yes").css("display","none");
					$(".no").css("display","block");
				}
			})
			$(".no").on("click",function(){
				$(this).css("display","none");
				$(".yes").eq($(this).index(".no")).css("display","block");
				if($(".yes:first").css("display") == "none"){
					$(".yes").css("display","block");
					$(".no").css("display","none");
				}
				if($(".yes:eq(1)").css("display") == "none"){
					$(".yes").css("display","block");
					$(".no").css("display","none");
				}
				if($(".yes:last").css("display") == "none"){
					$(".yes").css("display","block");
					$(".no").css("display","none");
				}
			})
			
			$(".box6 b").on("click",function(){//轮播图
				if($(".box6 li").size() > 0){
					if($(this).index("b") == 0){
						if($(".box6 ul li:last").offset().left > $(".box6").offset().left+$(".box6").width()-$(".box6 ul li:eq(0)").width()){
							$(".box6 ul li:first").stop().animate({"marginLeft":"-=228"},100)
						}
					}
					if($(this).index("b") == 1){
						console.log($(".box6 ul li:first").css("marginLeft"))
						if(parseInt($(".box6 ul li:first").css("marginLeft")) < 0){
							$(".box6 ul li:first").stop().animate({"marginLeft":"+=228"},100)
						}
					}
				}
			})
			//最近浏览的商品的加入购物车创建
			$(".box6 p.pbtm a").on("click",function(){
					document.cookie = $(this).attr("dataid")+"="+$(this).attr("dataid")+";path=/;";
					document.cookie = "shopNum"+$(this).attr("dataid")+"=1;path=/;";
			})
		}
		
	
			
	})
	
})
