$(function(){
			$(".header_avatar").hover(function(){
					$(this).find(".userinfo_tip").show();
				},function(){
					$(this).find(".userinfo_tip").hide();
				})
			$(".userinfo_tip").hover(function(){
					$(this).show();
				},function(){
					$(this).hide();
					})
			$(".designerList li").hover(function(){
					$(this).find("div").show();
				},function(){
					$(this).find("div").hide();
					})
					
			$('.notice_close').click(function(){
					$(".notice_con").hide();
				})
				
			$(".nav2").hover(function(){
					$(this).children("ul").stop(true,true).show();
				},function(){
					$(this).children("ul").stop(true,true).hide();
			})
			
			$(".site_nav li").hover(function(){
					var index = $(this).index();
					var width = 
					$(".mark").animate({left:(index*82)+"px"},100);
				})
			
			$(".shangouList").hover(function(){
					$(this).find("dl").show();
				},function(){
					$(this).find("dl").hide();
					})
			
			$(".diyLTitle-short").click(function(){
					$(this).hide();
					$(this).next().slideDown();
					$(this).parent().parent().css({"background":'none','height':'auto'});
				})
			$(".diyLTitle-long .diyLTitle").click(function(){
					$(this).parent().hide();
					$(this).parent().prev().show();
					var par = $(this).parent().parent();
					par.parent().css({"background":'url(/themes/mall/wowsai/styles/default/newwowsai/diagonalMaskWhiteBg.gif) repeat center center #E5E5E5','height':33+'px'});
				})
			$(".conditionNavR a").click(function(){
					$(".conditionNavR a").removeClass('on');
					$(this).addClass('on');
				})
			
			//页面底部二维码	
			$(".ewm").hover(function(){
					$(this).find("img").show();
				},function(){
					$(this).find("img").hide();
					})
		})