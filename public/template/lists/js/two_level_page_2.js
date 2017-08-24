//二级页面分类的导航条效果
$(".two-level-page-category li").hover(function(){$(this).addClass("li_hover");
		},function(){
			$(this).removeClass("li_hover");
			});	
//二级页面分类图标的效果
function scroll_line(num){
		$(".scroll_line").stop().animate({left:num*89+"px"},'fast');
	};
	function scroll_line_default(){
		var index=getLineLeft();
		$(".scroll_line").stop().animate({left:index*89+"px"},'fast');
	}
	$(document).ready(function() {
		var index=getLineLeft();
		$(".scroll_line").css({"left":index*89+"px"});
	});
	function getLineLeft(){
		var index=$(".two-level-page-nav ul li").index($(".current"));
		return index;
		}
//当鼠标移动到某个商品上时，相关内容变颜色
$(".newgoods_one,.shijiGoodsItem").live("mouseover",function(){
		$(this).find(".aaaa").css("color","#229ca0");
		$(this).find(".favourite-message").show();
		});
		
$(".newgoods_one,.shijiGoodsItem").live("mouseout",function(){
		$(this).find(".aaaa").css("color","#5c5c5c");
		$(this).find(".favourite-message").hide();
		});
//点击显示评论框
$(".favourite-message-mes").live('click',function(){
if(USER_ID=='0') {
		alertlogin(1);
		return false;
	}
		$(this).parent().parent().find(".add-message").show(this);
		$(this).parent().parent().find(".user_avatar").attr('src','/bridge/avatar.php?uid='+USER_ID+'&size=small');
		});
//点击评论的数字
$(".newgoods_one_mes").live('click',function(){
if(USER_ID=='0') {
		alertlogin(1);
		return false;
	}
		$(this).parent().parent().find(".add-message").show();
		$(this).parent().parent().find(".user_avatar").attr('src','/bridge/avatar.php?uid='+USER_ID+'&size=small');
		});
//点击喜欢的数字
$(".newgoods_one_fav").live('click',function(){
if(USER_ID=='0') {
		alertlogin(1);
		return false;
	}
	var id = $(this).parent().parent().find(".goodsid").eq(0).val();
	var url_ajax;
	var app;
	if(SSITE_URL != ""){
			url_ajax = SSITE_URL;
			var url_add = url_ajax + '/index.php?app=store&ajax=add';
			var url_drop= url_ajax + '/index.php?app=store&ajax=drop';
			var flag=$(this).attr("flag");
			var self=$(this);
			if(flag == 0){
				$.post(url_add, {'item_id':id,'type':'goods'}, function(data){
				self.html(parseInt(self.html())+1);
				self.addClass("newgoods_one_fav_checked").attr("flag",1);
				});
			}else{
				$.post(url_drop, {'item_id':id}, function(data){
				self.html(parseInt(self.html())-1);
				self.removeClass("newgoods_one_fav_checked").attr("flag",0);
				});
			}
		}else{
				url_ajax = SITE_URL;
				var url_add = url_ajax + '/index.php?app=my_favorite&act=add&type=goods&ajax=1';
				var url_drop= url_ajax + '/index.php?app=my_favorite&act=drop&type=goods&ajax=1';
				var flag=$(this).attr("flag");
				var self=$(this);
				if(flag == 0){
					$.getJSON(url_add, {'item_id':id}, function(data){
					self.html(parseInt(self.html())+1);
					self.addClass("newgoods_one_fav_checked").attr("flag",1);
					});
				}else{
					$.getJSON(url_drop, {'item_id':id}, function(data){
					self.html(parseInt(self.html())-1);
					self.removeClass("newgoods_one_fav_checked").attr("flag",0);
					});
				}
			}
	
});
//点击关闭评论框
$(".close-message").live('click',function(){
	$(this).parent().parent().parent().find(".add-message").hide(this);
});
//二级页面橱窗的鼠标滑动效果
$(".two-level-page-chuchuang-one").hover(function(){
		$(".two-level-page-chuchuang-one").css("border-color","#e5e5e5");
		$(".two-level-page-chuchuang-one-nei").css("border-color","white");
		$(this).css("border-color","#1db9be");
		$(this).find(".two-level-page-chuchuang-one-nei").css("border-color","#1db9be");
		},function(){
			$(".two-level-page-chuchuang-one").css("border-color","#e5e5e5");
		$(".two-level-page-chuchuang-one-nei").css("border-color","white");
			})		
//点击回复
$(".huifu").live('click',function(){
	if(USER_ID=='0') {
		alertlogin(1);
		return false;
	}
	$(this).parent().parent().parent().find(".add-message").show();
	$(this).parent().parent().parent().find(".user_avatar").attr('src','/bridge/avatar.php?uid='+USER_ID+'&size=small');
});
//点击提交
$(".uppinmessage").live('click',function() {
	//添加评论
	var goods_id = $(this).parent().parent().parent().parent().parent().find(".goodsid").eq(0).val();
	var comment = $(this).parent().parent().parent().parent().parent().find('#t'+goods_id).val();
	if(SSITE_URL==""){
		var app_url = "/index.php?app=search&act=addcomment";
	}else{
		var app_url = SSITE_URL+"/index.php?app=store&ajax=addcomment";
	}
	$.get(app_url,{'goods_id':goods_id,'comment':comment},function(data) {
		var str = '<dt><a href="/index.php?app=myhome&user_id='+data.uid+'" target="_blank"><img src="/bridge/avatar.php?uid='+data.uid+'&size=small" width="32px" height="32px"/></a></dt><dd><a href="/index.php?app=myhome&user_id='+data.uid+'" target="_blank" class="aaaa">'+data.user_name+'</a><br />'+comment+'<a href="javascript:void(0)" class="aaaa huifu">回复</a><input type="hidden" id="goodscomment_'+goods_id+'" value="'+comment+'"></dd><div class="clear"></div>';
		$("#pl"+goods_id).hide();
		$("#plxs"+goods_id).append(str);
	},'json')
});

//二级页面添加喜欢时选择分类的鼠标滑动效果
$(".select-cate-list li").live('mouseover',function(){
	$(".select-cate-list li").css("background-color","white");
	$(this).css("background-color","#e6f8f8");
	},function(){$(".select-cate-list li").css("background-color","white");});
	
//二级页面的添加喜欢模拟select
$(".select-add-catebox span").click(function(){
	if(SSITE_URL==""){
		var app_url = "/index.php?app=search&act=GetChuchuanglist";
	}else{
		var app_url = SSITE_URL+"/index.php?app=store&ajax=GetChuchuanglist";
	}
	$.get(app_url,{},function(data) {
		var listhtml='';
		if(data[0]!="null") {
			for(v in data) {
				//listhtml +='<li class="ms_yahei">'+data[v].name+'</li><input type="hidden" id="'+encodeURI(data[v].name)+'" value="'+data[v].wid+'">';
				listhtml +='<li class="ms_yahei" value="'+data[v].wid+'">'+data[v].name+'</li>';
				$('#chuchuanglist').html(listhtml);
				$(".select-cate-list-add").show();
			}
		} else {
			listhtml ='<li class="ms_yahei"></li>';
			$('#chuchuanglist').html(listhtml);
			$(".select-cate-list-add").show();
		}
	},'json')
	})
//二级页面添加喜欢，点击类别名称，改变文本框的值-------------add text to input
$(".select-cate-list li").live('click',function(){
	var catename=$(this).html();
	$(".select-add-catebox input").eq(0).val(catename);
	$('#wid_val').val($(this).attr("value"));
	$(".select-cate-list-add").hide();
	})

//二级页面添加喜欢，添加新橱窗的按钮动作效果
$(".select-cate-add a").click(function(){
	var new_cate_name=$(".new_cate_name").val();
	if(new_cate_name != ""){
		if(new_cate_name.length>15){
			alert("橱窗名称字数不能大于15个字！");
		}else{
			if(SSITE_URL==""){
				var app_url = "/index.php?app=search&act=addwin";
			}else{
				var app_url = SSITE_URL+"/index.php?app=store&ajax=addwin";
			}
			//$(this).after().html('<img src = "http://www.wowsai.com/index.php?app=captcha">');
			$.get(app_url,{name:new_cate_name,'checkcode':$('#codecheck').val()},function(data) {
				if(data==1) {
					alert('该橱窗已存在，请选择');
				} else if(data==-2) {
					alert('很抱歉！创建失败了！');
				}else if(data==-5){
					alert('验证码必须！');
				} else if(data==-6){
					alert('验证码错误！');
				} else {
					$(".select-add-catebox input[type=text]").val(new_cate_name);
					$('#wid_val').val(data)
					$(".select-cate-list-add").hide();
				} 
			})
		}
	}else{
		alert("请您填写新的橱窗名称");
	}
})
//二级页面 点击喜欢按钮 弹出”添加喜欢“层------------list
$(".favourite-message-fav").live('click',function(){
	if(USER_ID=='0') {
		alertlogin(1);
		return false;
	}
	show_black_bg("#over");
	var css_arr=top_div_css("add-favourite");
	//处理数据
	$('#lovegoodspic').attr('src',$(this).parent().parent().find("img").eq(0).attr('src').replace('ps','small'));
	$('#goodsid_w').val($(this).parent().parent().find(".goodsid").eq(0).val());

	if(SSITE_URL==""){
		var app_url = "/index.php?app=search&act=GetChuchuanglist";
	}else{
		var app_url = SSITE_URL+"/index.php?app=store&ajax=GetChuchuanglist";
	}
	$.get(app_url,{},function(data) {
	if(data[0]!="null") {
		var listhtml='';
		if($.cookie("ed_wid")){
			var ed_wid=$.cookie("ed_wid");
			for(var i=0; i<data.length; i++){
				if(data[i].wid == ed_wid){
					var ed_wname=data[i].name;
					}
				}
			$("#wname").val(ed_wname);
			$("#wid_val").val(ed_wid);
			}else{
				$('#wname').val(data[0].name);
				$('#wid_val').val(data[0].wid);
			}
		for(v in data) {
			//listhtml +='<li class="ms_yahei">'+data[v].name+'</li><input type="hidden" id="'+encodeURI(data[v].name)+'" value="'+data[v].wid+'">';
			listhtml +='<li class="ms_yahei" value="'+data[v].wid+'">'+data[v].name+'</li>';
			$('#chuchuanglist').html(listhtml);
			$(".add-favourite").css({left:css_arr[0]+"px",top:css_arr[1]+"px"}).show();
		}
	} else {
	$(".add-favourite").css({left:css_arr[0]+"px",top:css_arr[1]+"px"}).show();
	}
	},'json')
})
//二级页面 关闭弹出层
$(".add-favourite-top a").click(function(){
	$(".add-favourite,#over").hide();
	})
//二级页面 点击添加按钮 动作效果
$(".add-favourite-button a").click(function(){
	$(".add-favourite,#over").hide();
	var wid = $('#wid_val').val();//wid
	var goods_id = $('#goodsid_w').val();
	var pingluncontent = $('#pingluncontent').val();
	if(SSITE_URL==""){
		var app_url = "/index.php?app=search&act=addwingood";
	}else{
		var app_url = SSITE_URL+"/index.php?app=store&ajax=addwingood";
	}
	if(wid=='') {
		alert('还没有选择橱窗');
		return false;
	}
	$.get(app_url,{'wid':wid,'goods_id':goods_id,'content':pingluncontent},function(data){
		$.cookie("ed_wid",wid,{expires: 365, path: '/'});
		if(data==2) {
			var css_arr=top_div_css("add-favourite-success");
			$(".add-favourite-success").css({left:css_arr[0]+"px",top:css_arr[1]+"px"}).show();
			setTimeout(addFavouriteHide,1000);
		} else if(data==1) {
			alert('已添加过该商品');
		}
	},'json')
	
	});
	
//二级页面 添加喜欢成功 弹出层
function addlogoTipHide(){
	$(".logoTip").hide("slow");
	}
//个人动态 私信 弹出层
function addFavouriteHide(){
	$(".add-favourite-success").hide("slow");
	}	
/*
	当输入留言内容时，提交按钮变化效果
	inputName	需要统计文字数量的文本框对象
	showName	时刻改变数量的对象
	buttonName	可选，当存在时，按钮也会发生改变
*/
function calc_num(inputName,showName,buttonName){
	
	var text_num=$(inputName).val().length;
	if(text_num >0 && arguments.length == 3){
		$(buttonName).css({"background-position":"-1430px -27px","color":"white"});
		}else{
			$(buttonName).css({"background-position":"-1430px 0px","color":"#999898"});
			}
	$(showName).html(text_num); 
	}
/*
 * 	path 个人动态页专用
	当输入留言内容时，提交按钮变化效果
	inputName	需要统计文字数量的文本框对象
	showName	时刻改变数量的对象
	buttonName	可选，当存在时，按钮也会发生改变
*/
function myhome_calc_num(inputName,showName,buttonName){
	var text_num=$('#'+inputName).val().length;
	if(text_num >0 && arguments.length == 3){
		$('#'+buttonName).css({"background-position":"-1430px -27px","color":"white"});
		}else{
			$('#'+buttonName).css({"background-position":"-1430px 0px","color":"#999898"});
			}
	$('#'+showName).html(text_num); 
	}
//发私信检查字符数量
function myhome_calc_num1(inputName,showName,buttonName){
	
	var text_num=$('#'+inputName).val().length;
	if(text_num >0 && arguments.length == 3){
		$('#'+buttonName).css({"background-position":"0px 0px","color":"white"});
		}else{
			$('#'+buttonName).css();
			}
	$('#'+showName).html(text_num); 
	}

//店铺首页 产品分类 当鼠标滑过的效果
$(".store_goods_cate_list li").hover(function(){
	$(this).css({"border-bottom":"1px solid #229ca0","cursor":"pointer"});
	},function(){
		$(this).css({"border-bottom":"1px solid #c5c5c5","cursor":"normal"});
		})


//获得form表单的焦点事件
$(".chuchuang-name-input").focus(function(){
	focus_blur(".chuchuang-name-input","请输入橱窗名称，最好在15个汉字之内",1);
	})
$(".chuchuang-name input").blur(function(){
	focus_blur(".chuchuang-name-input","请输入橱窗名称，最好在15个汉字之内",2);
	})
$(".chuchuang-con textarea").focus(function(){
	focus_blur(".chuchuang-con textarea","请输入标签，用空格分隔标签",1);
	})
$(".chuchuang-con textarea").blur(function(){
	focus_blur(".chuchuang-con textarea","请输入标签，用空格分隔标签",2);
	})

//获得常用的标签
function get_often_tags(){
	var tag_len=$(".add-chuchuang-tags li").length;
	var often_tags_arr=new Array();
	for(var i=0;i<tag_len;i++){
		often_tags_arr[i]=$(".add-chuchuang-tags li").eq(i).text();
		}
	return often_tags_arr;
	}
	
//添加橱窗标签时，鼠标事件
var tag_str="";	//记录用户输入的标签内容
function chuchuang_tag_end(){
	var chuchuang_tag=chuchuang_name_end();
	var tag_arr=chuchuang_tag.split(" ");
	var tag_str2="";
	for(var j=0; j<tag_arr.length; j++){
		tag_str2+=tag_arr[j];
		}
	//键盘操作后，标签内容发生改变时，进行标签内容比对
	if(tag_str2 != tag_str){
		var often_tags_arr=get_often_tags();
		for(var i=0; i<often_tags_arr.length; i++){
			var num=$.inArray(often_tags_arr[i],tag_arr);
			if(num>=0){
				$(".add-chuchuang-tags li").eq(i).find("a").css({"color":"#e1e1e1"});
				$(".add-chuchuang-tags li").eq(i).addClass("have_click");
				}else{
					$(".add-chuchuang-tags li").eq(i).find("a").css({"color":"#5c5c5c"});
					$(".add-chuchuang-tags li").eq(i).removeClass("have_click");
					}
			}
		tag_str=tag_str2;
		}
	}
//添加橱窗名称时，键盘事件
function chuchuang_name_end(){
	var chuchuang_name=get_input_val(".chuchuang-name-input");
	var chuchuang_tag=get_input_val(".chuchuang-con-left textarea");
	var check_num=get_radio_info();
		check_input_value(chuchuang_name,chuchuang_tag);
	return chuchuang_tag;
	}

//此方法用于获取表单的值
function get_input_val(className){
	return $(className).val();
	}


//获取橱窗的分类有没有选择
//0	还没有选择
//1 已经选择
function get_radio_info(){
	var check_num=$("input[name=chuchuang_cate]:checked").length;
	return check_num;
	}
//点击选择分类，判断信息是否填写以用填写是否正确
$(".chuchuang-cate ul li input").click(function(){
	
	var chuchuang_name=get_input_val(".chuchuang-name-input");
	var chuchuang_tag=get_input_val(".chuchuang-con-left textarea");
		check_input_value(chuchuang_name,chuchuang_tag);
	})

//检测用户输入的值
function check_input_value(value1,value2){
	if(value1 != "请输入橱窗名称，最好在15个汉字之内" && value2 != "请输入标签，用空格分隔标签" && value1.length !=0 && value2.length !=0){
		var flag=containSpecial(value1);
		var flag1=containSpecial(value2);
		if(!flag && !flag1){
			$(".chuchuang-footer a").css({"background-position":"0 -41px","color":"white"});
			}else{
				$(".chuchuang-footer a").css({"background-position":"0 0","color":"#5c5c5c"});
				}
		}else{
			$(".chuchuang-footer a").css({"background-position":"0 0","color":"#5c5c5c"});
			}
	}

//下面方法用来判断是否包含特殊字符
function containSpecial( s )      
{      
    var containSpecial = RegExp(/[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);     
    return ( containSpecial.test(s) );      
}   


//新建橱窗弹出层，点击右侧的“常用标签”，标签内容添加到左侧的区域中
$(".add-chuchuang-tags li").click(function(){
	if(($(this).attr("class")) == "ms_yahei"){
	var text_val=$(".chuchuang-con textarea").val();
	if(text_val == "请输入标签，用空格分隔标签"){
		var tag="";
		tag+=$(this).text();
		}else{
			var tag=text_val;
			tag+=" "+$(this).text();
			}
	$(".chuchuang-con textarea").val(tag);
	$(this).find("a").css({"color":"#e1e1e1"});
	$(this).addClass("have_click");
	}else{
		alert("您已经添加过该标签");
		}
	return false;
	})
	


//元素获取鼠标焦点事件的方法
//className		元素
//message	默认的提示
//type	1,获取焦点	2.失去焦点
function focus_blur(className,message,type){
	if(type == 1){
		if($(className).val() == message){
			$(className).val("");
			$(".chuchuang-footer a").css({"background-position":"0 0","color":"#5c5c5c"});
			}
		}else if(type == 2){
			if($(className).val() == ""){
				$(className).val(message);
			}else{
				var chuchuang_name=get_input_val(".chuchuang-name-input");
				var chuchuang_tag=get_input_val(".chuchuang-con-left textarea");
				}
	}
	}
	
//显示页面的背景的遮罩层	
function show_black_bg(className){
	$(className).css({width:$(document).width()+"px",height:$(document).height()+"px"});
	$(className).show();
	}
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

