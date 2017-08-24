var locations = location.href;
var ajax_www = "/index.php?app=default&act=ajax_login_new";
if(locations.indexOf("shop")!=-1){
	ajax_www = SSITE_URL+"/index.php?app=store&ajax=ajax_login_new";
}
$.get(ajax_www,{},function(data){
	$("#logins").html(data);
});
function avatar_mouseover(){
	$(".userinfo_tip").show();
}
function avatar_mouseout(){
	$(".userinfo_tip").hide();
}