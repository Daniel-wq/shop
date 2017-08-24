	//显示个人主页信息列表 
	function header_ajax(){
	$(".js_header_avatar,.ws_tip_gerenzhuye").hover(function(){
		
			$(".js_header_avatar").css({"background":"url(/themes/mall/wowsai/styles/default/image_newwowsai/111.gif)"});
			$(".js_header_avatar").find("span").css({"-o-transform":"rotate(180deg)","-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-o-transition":"-o-transform 0.4s ease-in-out 0s","-webkit-transition":"-webkit-transform 0.4s ease-in-out 0s","-moz-transition":"-moz-transform 0.4s ease-in-out 0s",});
			$(".ws_tip_gerenzhuye").show();
		},function(){
			$(".js_header_avatar").find("span").css({"-o-transform":"rotate(0deg)","-webkit-transform":"rotate(0deg)","-moz-transform":"rotate(0deg)",});
			$(".js_header_avatar").css({"background":"none"});
			$(".ws_tip_gerenzhuye").hide();
			
			})
	//显示站内信信息列表
	$(".js_header_message,.tip_message").hover(function(){
			//首次滑过此条获取用户站内信 10秒内不重复获取
			$.get('/index.php?app=default&act=ajax_login&type=headerinfo',{},function(data){
				//获取到用户信息包括 uid 
			})
			$(".js_header_message").css({"border-color":"#e0dede"});	
			$(".tip_message").show();
		},function(){
			$(".js_header_message").css({"border-color":"#FCFCFC"});
			$(".tip_message").hide();
			})
	//显示我的订单信息列表
	$(".js_header_order,.tip_order").hover(function(){
			$(".js_header_order").css({"background":"url(/themes/mall/wowsai/styles/default/image_newwowsai/222.gif)"});
			$(".js_header_order").find("span").css({"-o-transform":"rotate(180deg)","-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-o-transition":"-o-transform 0.4s ease-in-out 0s","-webkit-transition":"-webkit-transform 0.4s ease-in-out 0s","-moz-transition":"-moz-transform 0.4s ease-in-out 0s",});
			$(".tip_order").show();
		},function(){
			$(".js_header_order").css({"background":"none"});
			$(".js_header_order").find("span").css({"-o-transform":"rotate(0deg)","-webkit-transform":"rotate(0deg)","-moz-transform":"rotate(0deg)",});
			$(".tip_order").hide();
			})
	//显示卖家中心信息列表
	$(".js_header_seller,.tip_seller").hover(function(){
		$(".js_header_seller").css({"background":"url(/themes/mall/wowsai/styles/default/image_newwowsai/222.gif)"});
		$(".js_header_seller").find("span").css({"-o-transform":"rotate(180deg)","-webkit-transform":"rotate(180deg)","-moz-transform":"rotate(180deg)","-o-transition":"-o-transform 0.4s ease-in-out 0s","-webkit-transition":"-webkit-transform 0.4s ease-in-out 0s","-moz-transition":"-moz-transform 0.4s ease-in-out 0s",});
			$(".tip_seller").show();
		},function(){
			$(".js_header_seller").css({"background":"none"});
			$(".js_header_seller").find("span").css({"-o-transform":"rotate(0deg)","-webkit-transform":"rotate(0deg)","-moz-transform":"rotate(0deg)",});
			$(".tip_seller").hide();
			})
	}