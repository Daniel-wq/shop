$(function()
{
    $(".select_js ul li").hover(
        function()
        {
            $(this).addClass('search_nonce');
        },
        function()
        {
            $(this).removeClass();
        }
    );

    $(".select_js").click(block_fn);

    $(".select_js ul li").click(function(){
        var text = $(this).text();
        $(".select_js p").text(text);

        var act  = $(this).attr("ectype");
        $(".select_js input").val(act);
    });

    $('body').click(mouseLocation);
    
	/* œ˙ €≈≈––∞Ò@author cheng */
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
});
function block_fn()
{
    $(".select_js ul").toggle();
}

function mouseLocation(e)
{
    if (e.pageX < $('.select_js').position().left ||
        e.pageX > $('.select_js').position().left + $('.select_js').outerWidth() ||
        e.pageY < $('.select_js').position().top ||
        e.pageY > $('.select_js').position().top + $('.select_js').outerHeight())
    {
        $('.select_js ul').hide();
    }
}