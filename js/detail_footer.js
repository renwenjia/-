$(function(){
	$.ajax({
		type:"get",
		url:"../json/detail_footer.json",
		dateType:"json",
		success:function(mag){
//			遍历中部的所有需要添加内容的元素
			var data1 = mag.data1;
			var allDt = $(".footer_center dt");
			var allDd = $(".footer_center dd a");
			for(var i in data1){
				allDt.eq(i).text(data1[i].dt);
				allDd.eq(i).text(data1[i].dd);
			}
//			遍历头部的所有需要添加内容的元素			
			var data2 = mag.data2;
			var allLi = $(".footer_top li");
			for(var i in data2){
				allLi.eq(i).html(data2[i].li);
			}
//			触发事件父盒子不一致的渐变事件			
			$(".topimg").on("mouseenter",function(){
				$(this).stop().animate({"opacity":"0.7"},300)
			})
			$(".topimg").on("mouseleave",function(){
				$(this).stop().animate({"opacity":"1"},300)
			})
		}
	})
//	触发事件父盒子一致的渐变事件	
	$(".footer_bottom .btmdd").on("mouseenter",function(){
		$(".footer_bottom img").eq($(this).index(".btmdd")).stop().animate({"opacity":"0.7"},300)
	})
	$(".footer_bottom .btmdd").on("mouseleave",function(){
		$(".footer_bottom img").eq($(this).index(".btmdd")).stop().animate({"opacity":"1"},100)
	})
})
