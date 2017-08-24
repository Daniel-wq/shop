$(function(){
    var navs = $("#nav a");
    var cur_nav = $("#nav a.link").get(0);
    navs.mouseover(function(){
        var _self = this;
        navs.each(function(i){
            $(this).attr('class', this == _self ? 'link' : 'hover');
        });
    });
    navs.mouseout(function(){
        navs.each(function(i){
            $(this).attr('class', this == cur_nav ? 'link' : 'hover');
        });
    });
	/* 销售排行榜@author cheng */
	var s1 = "green_sell.gif";
	var s2 = "white_sell.gif";
	var l1 = "green_love.gif";
	var l2 = "white_love.gif";
	$("#onranksell").click(function(){
		$(".ranksell").show();
		$(".ranklove").hide();
		var src = $(this).attr("src");
		var arr = src.split("images1/");
		if(arr[1]!=s1){
			var pic = change_rankpic($(this).attr("src"));
			$(this).attr("src",pic);
			var pic = change_rankpic($("#onranklove").attr("src"));
			$("#onranklove").attr("src",pic);
		}
	});
	$("#onranklove").click(function(){
		$(".ranklove").show();
		$(".ranksell").hide();
		var src = $(this).attr("src");
		var arr = src.split("images1/");
		if(arr[1]!=l1){
			var pic = change_rankpic($(this).attr("src"));
			$(this).attr("src",pic);
			var pic = change_rankpic($("#onranksell").attr("src"));
			$("#onranksell").attr("src",pic);
		}
	});
	function change_rankpic(src){
		var arr = src.split("images1/");
		var str = "";
		switch(arr[1]){
			case s2:
				str = s1;
			break;
			case s1:
				str = s2;
			break;
			case l2:
				str = l1;
			break;
			case l1:
				str = l2;
			break;
		}
		return arr[0]+"images1/"+str;
	}
})