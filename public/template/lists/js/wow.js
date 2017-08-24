function wow_setcookie(Name, value, expiretime){   
	var ExpireDate = new Date ();
	ExpireDate.setTime(ExpireDate.getTime() + (expiretime * 1000));   
	document.cookie = Name + "=" + escape(value) + ((expiretime == null) ? "" : "; expires=" + ExpireDate.toGMTString());   
}  
function wow_getcookie(Name){
	if(document.cookie.length > 0){
		begin = document.cookie.indexOf(Name+"=");   
		if (begin != -1){ 
			begin += Name.length+1;   
			end = document.cookie.indexOf(";", begin);    
			if (end == -1) end = document.cookie.length;   
			return unescape(document.cookie.substring(begin, end)); 
		}   
	}   
	return null;   
}
function wow_delCookie(Name){
	if(wow_getcookie(Name)) document.cookie = Name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";   
}
var webid = '1';
var wow_now='1502939597450';
var wow_ref=document.referrer;
var wow_href=document.location.href;
var sense = escape(screen.width+'x'+screen.height);
var ctime = wow_now;
var stat_acc = wow_getcookie("wow_stat_acc");
var isold = 0;
if(!stat_acc){
	stat_acc = '15029395972078211179';
	wow_setcookie("wow_stat_acc",stat_acc,86400*365);
	wow_setcookie("wow_stat_acc_time",'1502939597',86400*365);
}else{
	var stat_acc_time = wow_getcookie("wow_stat_acc_time");
	if(stat_acc_time){
		var nowtime = '1502939597';
		var timecha = Number(nowtime)-Number(stat_acc_time);
		if(timecha>86400){
			isold = 1;
		}
	}
}
var up_time = wow_getcookie("wow_up_time");
var visit_time = 0;
if(up_time){
	visit_time = (wow_now-up_time)/1000;
	if((visit_time/3600)>1)
		visit_time = 0;
}
wow_setcookie("wow_up_time",wow_now,3600*24);
var wow_up_call = wow_getcookie("wow_up_call_time");
if(!wow_up_call){
	wow_up_call = 0;
}
wow_setcookie("wow_up_call_time",wow_now,3600);
var wow_data = 'id='+webid+'&ref='+escape(wow_ref)+'&sense='+escape(sense)+'&acc='+stat_acc+'&href='+escape(wow_href)+'&ctime='+ctime+'&uptime='+wow_up_call+'&visit='+visit_time+'&isold='+isold;
document.write('<iframe src="http://count.wowsai.com/wowyun.php?'+wow_data+'" width="0" height="0" frameborder="0"></iframe>');
