$(function(){
	$(".box2 .li_btm .chk").on("click",function(){
		$(".box2 li table").toggle();
	})
	
	$.ajax({
		type:"get",
		url:"../json/place.json",
		success:function(mag){
			var str = "";
			var data = mag.data;
			for(var i = 0;i<data.length;i++){//三级联动		
				str += "<option>"+data[i].choice+"</option>"
			}
			$(".box2 li table select.s1").html(str);
			
			$(".box2 li table select.s1").on("click",function(){
				var str1 = "";
				for(var i = 0;i<data.length;i++){
					if($(".box2 li table select.s1").val() == data[i].choice){
						for(var j = 0;j<data[i].next.length;j++){
							str1 += "<option>"+data[i].next[j]+"</option>"
						}
						$(".box2 li table select.s2").html(str1);
					}
				}
			})
			
			$(".box2 li table select.s2").on("click",function(){
				var str2 = "";
				for(var i = 0;i<data.length;i++){
						for(var j = 0;j<data[i].next.length;j++){
							if($(".box2 li table select.s2").val() == data[i].next[j]){
								for(var k = 0;k<data[i].last[j].length;k++){
									str2 += "<option>"+data[i].last[j][k]+"</option>"
								}
								$(".box2 li table select.s3").html(str2);
								return;//不加return的话当选择未选择的时候会遍历添加data长度的s3option
							}
							
						}		
				}	
			})
			
			$(".sure").on("click",function(){
				if($(".consignee").val() == ""){
					alert("请填写收货人名字");
					return false;
				}
				if($(".s1").val() == "--请选择--" && $(".s2").val() == "--请选择--" && $(".s3").val() == "--请选择--"){
					alert("请选择所在地区");
					return false;
				}
				if($(".address").val() == ""){
					alert("请填写详细地址");
					return false;
				}
				var mobileNumberReg = /^(1[3458])\d{9}$/;
				if(!mobileNumberReg.test($(".mobile").val())){
					alert("请填写正确手机号");
					return false;
				}
				var email = /^\w+\@{1,1}\w+\.{1,1}[a-z]{3,3}$/;
				if(!email.test($(".email").val())){
					alert("请正确填写邮箱地址");
				}
			})//地址验证
		}

	})//三级联动ajax结束
	
	$.ajax({
		type:"get",
		url:"../json/gouwuche.json",
		success:function(mag){//创建支付
			var str = "";
			var data = mag.data;
			var cookie = document.cookie.split("; ");
			var arr1 = [];
			var arr2 = [];
			for(var i = 0;i<cookie.length;i++){
				var checkcookie = cookie[i].split("=")//以等号为分界将存储的每个数值对分开判断,以长度2的形式装入新的数组
	
				if(checkcookie[0].indexOf("payFor") != -1){
					arr1.push(checkcookie[0].replace("payFor",""));//将设置的cookie的预留的识别字替换成空，只留下id值
					arr2.push(getCookie("shopNum"+checkcookie[1]));//将数量值装在不同数组的相同下标值位置对应
				}
			}
			var payMoney = 0;//商品总支付金额
			for(var i = 0;i<arr1.length;i++){
				str += "<li class='li_foot'>";
				str += "<dl><dt class='l'><a href='"+data[arr1[i]-1].html+"'><img src='"+data[arr1[i]-1].img+"'alt='未加载' /></a></dt>";
				str += "<dd class='l dd1'><a href='"+data[arr1[i]-1].html+"'>"+data[arr1[i]-1].name+"&nbsp;&nbsp;("+data[arr1[i]-1].bianhao+")</a></dd>";
				str += "<dd class='l dd2'><p class='p1'>"+data[arr1[i]-1].color[getCookie("color"+arr1[i])]+"</p><p class='p2'>"+data[arr1[i]-1].size[getCookie("size"+arr1[i])]+"</p></dd>";
				str += "<dd class='l dd3'><p class='p3'>"+arr2[i]+"</p><p class='p4'>"+getCookie("inventory"+arr1[i])+"</p></dd>";
				str += "<dd class='l dd4'><p class='p5'>￥"+data[arr1[i]-1].rate+"</p><p class='p6'>￥"+data[arr1[i]-1].price+"</p></dd>";
				str += "<dd class='l dd5'>￥"+arr2[i]*data[arr1[i]-1].price+"</dd>";
				str += "</dl></li>";		
				payMoney += Number(arr2[i]*data[arr1[i]-1].price);
			}
			$(".box5 ul li.last").before(str);//因为是追加 所以写在外面防止重复追加
			$("div.last p.last_p1 span.paymoney").html("￥"+payMoney);
			$("div.last p.last_p2 span.allpay").html(payMoney);
			
			$("div.last p.last_p3 a").on("click",function(){
				for(var i = 0;i<arr1.length;i++){
					removeCookie("payFor"+arr1[i]);
				}
			})
			
			
		}
	})//axax结束
	
	$("#content p.invoice label a").on("click",function(){
		$("div.invoicebox").toggle();
	})
	$("#content p.invoice label").on("click",function(){
		$("div.invoicebox").toggle();
	})
	$("div.invoicebox div.invoicebox_top a").on("click",function(){
		$("div.invoicebox").css("display","none")
	})//发票显示结束
	
	
})
