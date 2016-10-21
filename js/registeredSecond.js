$(function(){
	$("input[type='text']").val("");
	//获取上页信息写入
	var userName = getCookie("userName");
	var mobileNumber = getCookie("mobileNumber");
	$("input").eq(0).val(userName);
	$("input").eq(1).val(mobileNumber);
	
	//验证该页表单
	
	
	
	$("input").eq(2).on("blur",function(){
		var pass = $("input").eq(2).val();
		if(pass == ""){
			$(".tips").eq(0)
			.css("display","block")
			.text("密码不能为空");
		}else if(pass.length < 6){
			$(".tips").eq(0)
			.css("display","block")
			.text("密码长度只能为6~16");
		}else{
			$(".tips").eq(0)
			.css("display","none")
		}
	})//密码判断结束
	
	$("input").eq(3).on("blur",function(){
		var passAg = $("input").eq(3).val();
		if(passAg != $("input").eq(2).val()){
			$(".tips").eq(1)
			.css("display","block")
			.text("两次密码不相同");
		}else{
			$(".tips").eq(1)
			.css("display","none")
		}
	})//密码验证结束
	
	$("input").eq(4).on("blur",function(){
		if($(this).val() == ""){
			$(".tips").eq(2)
			.css("display","block")
			.text("请输入验证码");
		}else{
			$(".tips").eq(2)
			.css("display","none")
		}
	})
	
	$("input").eq(5).on("mouseenter",function(){
		$("input").eq(5).css("background","url(../../img/buttons.png) no-repeat 0 -126px")
	})
	
	$("input").eq(5).on("mouseleave",function(){
		$("input").eq(5).css("background","url(../../img/buttons.png) no-repeat 0 -84px")
	})
	
	

	$("input").eq(5).on("click",function(){
		for(var i = 0;i<$("input").size()-1;i++){//-1不算提交按钮
			if($("input").eq(i).val() == ""){
				alert("请正确填写表单！")
				return false;
			}
		}
		document.cookie = "password="+encodeURIComponent($("input").eq(2).val())+";path=/;";
		window.location.href = "registered3.html";
	})
})
