$(function(){
	$("input[type='text']").val("");
//	用户名正则判断
	var userNameReg = /^[\S]$/;//非空白符正则
	var userNameReg1 = /^[\u4e00-\u9fa5]$/;//中文正则
//	遍历用户名输入值,根据得到的是否是中文来计算判断长度
	$("input").eq(0).on("blur",function(){
		
		var str = 0;//用一个变量来装判断的长度
		var nameVal = $("input").eq(0).val();
		for(var i = 0;i < nameVal.length;i++){//循环遍历文本值
			if(userNameReg.test(nameVal[i])){//是否符合正则1
				if(userNameReg1.test(nameVal[i])){//是否符合正则2
					str += 2;
				}else{
					str += 1;
				}
			}
		}
		
//		根据长度来改变tips.text()
		if(str <= 0){
			$(".tips").eq(0)
			.css("display","block")
			.text("用户名不能为空");
		}else if(str < 4){
			$(".tips").eq(0)
			.css("display","block")
			.text("用户名只能为4~20个字符,一个汉字为两个字符");
		}else if(str >= 4){
			if(/^\d/.test(nameVal)){//判断是否是数字开头
				$(".tips").eq(0)
				.css("display","block")
				.text("以中、英文开头，与数字、下划线组成");
			}else{
				$(".tips").eq(0)
				.css("display","none")
			}
		}
		
	})//用户名判断结束
	//手机号正则判断
	var mobileNumberReg = /^(1[3458])\d{9}$/;
	$("input").eq(1).on("blur",function(){
		if($(this).val().length <= 0){
			$(".tips").eq(1)
			.css("display","block")
			.text("手机号不能为空");
		}else if(!mobileNumberReg.test($(this).val())){
			$(".tips").eq(1)
			.css("display","block")
			.text("手机号码不合法");
		}else{
			$(".tips").eq(1)
			.css("display","none")
		}
	})//手机号正则判断结束
	
	
	$("input").eq(2).on("blur",function(){
		if($("input").eq(2).val() == ""){
			$(".tips").eq(2)
			.css("display","block")
			.text("验证码不能为空");
		}else{
			$(".tips").eq(2)
			.css("display","none")
		}
	})//验证码判断结束
	
	$("input").eq(3).on("mouseenter",function(){
		$("input").eq(3).css("background","url(../../img/buttons.png) no-repeat -226px -210px")
	})
	
	$("input").eq(3).on("mouseleave",function(){
		$("input").eq(3).css("background","url(../../img/buttons.png) no-repeat -226px -168px")
	})
	$("input").eq(3).on("click",function(){
		for(var i = 0;i<$("input").size()-1;i++){//提交时遍历所有文本框，值为空时提示
			if($("input").eq(i).val() == ""){
				alert("请正确填写表单！")
				return;
			}
		}
		//创建用户名，手机号的cookie并跳转
		document.cookie = "userName="+encodeURIComponent($("input").eq(0).val())+";path=/;"
		document.cookie = "mobileNumber="+encodeURIComponent($("input").eq(1).val())+";path=/;"
		window.location.href = "registered2.html";
			
	})//提交第一页表单更改页面样式到第二项注册并存储上页数据
	
})
