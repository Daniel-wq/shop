//返回弹出层始终位于浏览器中间的的位置
function top_div_css(className){
	var top = ($(window).height() - $("."+className).height())/2;   
    var left = ($(window).width() - $("."+className).width())/2;   
    var scrollTop = $(document).scrollTop();   
    var scrollLeft = $(document).scrollLeft(); 
	var left_css=left+scrollLeft;
	var top_css=top+scrollTop;
	var css_arr=Array(left_css,top_css);
	return css_arr;
	}
	
//显示页面的背景的遮罩层	
function show_black_bg(className){
	$(className).css({width:$(document).width()+"px",height:$(document).height()+"px"});
	$(className).show();
	}

//哇噻网自定义alert方法	
/*function alert(message,classname){
		show_black_bg("#over");
		$(".logoTip-alert-content").html(message);
		var css_arr=top_div_css("logoTip-alert");
		$(".logoTip-alert").css({left:css_arr[0]+"px",top:css_arr[1]+"px"}).show();
		$(".logoTip-top-close,.makeSure").click(function(){
			$("#over,.logoTip-alert").hide();
			if(classname){
					$(classname).hide();
				}
			})
		}*/