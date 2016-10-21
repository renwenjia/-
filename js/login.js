$(function(){
	$("input[type!='button']").val("");//刷新页面文本框值为空
//	选项卡切换变更
//	获取所有页面元素
	var $change = $(".content_right_top p");
	var $text = $(".content_right_bottom .box1");
	var $inp = $(".content_right_bottom input");
	var $tips = $(".content_right_bottom .changeTips");
	
//	默认将第一个改为被选择状态样式添加
	$change.eq(0).css({"height":"38px","borderTop":"2px solid #c00","borderBottom":"0"})
	
	$change.on("click",function(){
		$("input[type!='button']").val("");//所有选项卡点击的时候，将所有不是提交的文本框清空
		$(this).css({"height":"39px","borderTop":"2px solid #c00","borderBottom":"0"})
		.siblings().css({"height":"34px","border":"1px solid #ccc"});//让被点击的样式改变，其余的样式变回
		$inp.eq(0).focus();//点击的时候让第一个文本框呈现被选择状态
	//改变文本信息提示值
		if($(this).index() == 0){
			$text.eq(0).text("用户名：");
			$text.eq(1).text("登录密码：");
			$tips.eq(0).text("请输入账户或邮箱地址");
		}
		if($(this).index() == 1){
			$text.eq(0).text("手机号：");
			$text.eq(1).text("登录密码：");
			$tips.eq(0).text("请输入手机号");
		}
		if($(this).index() == 2){
			$text.eq(0).html("卡&nbsp号：");
			$text.eq(1).text("卡密码：");
			$tips.eq(0).text("请输入卡号");
		}
	})
	
	//填写框获取焦点事件
	$inp.eq(0).focus();	//默认进入页面就获取一次焦点
	$inp.on("focus",function(){//获取焦点时提示
		$inp.css("borderColor","#ccc");
		$tips.eq($(this).index("input")).css("color","#999")
		$inp.eq($(this)).css("borderColor","#ccc");
		$tips.eq($(this).index("input")).css("display","block");
		if($text.eq(0).text() == "用户名："){
			$tips.eq(0).text("请输入账户或邮箱地址");			
		}else if($text.eq(0).text() == "手机号："){
			$tips.eq(0).text("请输入手机号");
		}else{
			$tips.eq(0).text("请输入卡号");
		}
	})
	
	
	$inp.on("blur",function(){//失去焦点
		$tips.eq($(this).index("input")).css("display","none")
	})
	
	//登录按钮移入移出
	$inp.eq(5).on("mouseenter",function(){
		$inp.eq(5).css({"background":"url(../../img/buttons.png) no-repeat 0 -42px"})
	})
	
	$inp.eq(5).on("mouseleave",function(){
		$inp.eq(5).css({"background":"url(../../img/buttons.png) no-repeat"})
	})
	//点击登录时验证表单是否完整
	$inp.eq(5).on("click",function(){
		for(var i = 0;i<3;i++){
			var $this = i;
			if($inp.eq(i).val() == ""){
				$inp.eq($this).css("borderColor","#c00")
				$tips.eq($this).css({"display":"block","color":"#c00"})
				return;
			}
		}	
		//获取登录名
	if(getCookie("userName") != ""){
		if(getCookie("userName") != $inp.eq(0).val()){
			$tips.eq(0).text("请输入正确的账户名").css("display","block");
			$tips.eq(1).text().css("display","none");
			return;
		}
		if(getCookie("password") != $inp.eq(1).val()){
			$tips.eq(1).text("请输入正确的账户名").css("display","block");
			$tips.eq(0).text().css("display","none");
			return;
		}
		
		window.location.href = "../../index.html";
	}else{
		alert("用户未注册，将跳转注册页面")
		window.location.href = "../registered/registered.html";
	}
	})
})
