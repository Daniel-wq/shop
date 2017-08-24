$(document).ready(function() {
	$.getJSON('/index.php?app=shopping&act=check_login', function(data) {
		USER_ID = data['retval'];
	});
	if(USER_ID > 0){
		setInterval("getMessageToTitle()", 30000);
	}
});
var defaultMsg = window.document.title;
var has_news = '【你有新消息】';  
var hidden_news = '【请注意查收】';
var bMsg = false;
function getMessageToTitle(){
	if(USER_ID > 0){
		$.getJSON('/index.php?app=store&ajax=ajax_login&ajaxmsg=1', function(data) {
				if (data.msg_all > 0) {
					if (!bMsg) {
						$("#msg_comment").html(data.msg_comment);
						$("#msg_me").html(data.msg_me);
						$("#msg_sixin").html(data.msg_sixin);
						$("#msg_fensi").html(data.msg_fensi);
						$("#msg_system").html(data.msg_system);
						window.document.title = has_news + " - " + defaultMsg;
						bMsg = true;
					} else {
						$("#msg_comment").html(data.msg_comment);
						$("#msg_me").html(data.msg_me);
						$("#msg_sixin").html(data.msg_sixin);
						$("#msg_fensi").html(data.msg_fensi);
						$("#msg_system").html(data.msg_system);
						window.document.title = hidden_news + " - " + defaultMsg;
						bMsg = false;
					}
					$("#msgall_num").html('('+data.msg_all+')');//站内信的数量
				} else {
					window.document.title = defaultMsg;
					bMsg = false;
				}
			});
	}
	
}
