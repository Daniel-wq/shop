jQuery.extend({
  getCookie : function(sName) {
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++){
      var aCrumb = aCookie[i].split("=");
      if (sName == aCrumb[0]) return decodeURIComponent(aCrumb[1]);
    }
    return '';
  },
  setCookie : function(sName, sValue, sExpires) {
    var sCookie = sName + "=" + encodeURIComponent(sValue);
    if (sExpires != null) sCookie += "; expires=" + sExpires;
    document.cookie = sCookie;
  },
  removeCookie : function(sName) {
    document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
  },
  isEmptyObject:function(obj){//重写jquery 的isEmptyObject
		if($.browser.msie && typeof(obj) != 'object'){//ie浏览器下number和string是没有属性的
			if(typeof(obj) == 'number' || typeof(obj) == 'string'){
				return false;
			}
		}
        for ( var name in obj ) {
            return false;
        }
        return true;
   },
   log:function(arr){//火狐浏览器的日志输入
	   if($.browser.mozilla){
		   console.log(arr);
	   }else if($.browser.msie){
		   alert(arr);
	   }else if($.browser.is == 'chrome'){//谷歌浏览器
		   console.log(arr);
	   }else if($.browser.opera){
		   console.log(arr);
	   }
   }
});
function drop_confirm(msg, url){
    if(confirm(msg)){
        window.location = url;
    }
}

/* 显示Ajax表单 */
function ajax_form(id, title, url, width)
{
    if (!width)
    {
        width = 400;
    }
    var d = DialogManager.create(id);
    d.setTitle(title);
    d.setContents('ajax', url);
    d.setWidth(width);
    d.show('center');

    return d;
}
function go(url){
    window.location = url;
}

function change_captcha(jqObj){
    jqObj.attr('src', 'index.php?app=captcha&' + Math.round(Math.random()*10000));
}

/* 格式化金额 */
function price_format(price){
    if(typeof(PRICE_FORMAT) == 'undefined'){
        PRICE_FORMAT = '&yen;%s';
    }
    price = number_format(price, 2);

    return PRICE_FORMAT.replace('%s', price);
}

function number_format(num, ext){
    if(ext < 0){
        return num;
    }
    num = Number(num);
    if(isNaN(num)){
        num = 0;
    }
    var _str = num.toString();
    var _arr = _str.split('.');
    var _int = _arr[0];
    var _flt = _arr[1];
    if(_str.indexOf('.') == -1){
        /* 找不到小数点，则添加 */
        if(ext == 0){
            return _str;
        }
        var _tmp = '';
        for(var i = 0; i < ext; i++){
            _tmp += '0';
        }
        _str = _str + '.' + _tmp;
    }else{
        if(_flt.length == ext){
            return _str;
        }
        /* 找得到小数点，则截取 */
        if(_flt.length > ext){
            _str = _str.substr(0, _str.length - (_flt.length - ext));
            if(ext == 0){
                _str = _int;
            }
        }else{
            for(var i = 0; i < ext - _flt.length; i++){
                _str += '0';
            }
        }
    }

    return _str;
}

/* 收藏商品 */
function collect_goods(id)
{
    var url = SITE_URL + '/index.php?app=my_favorite&act=add&type=goods&ajax=1';
    $.getJSON(url, {'item_id':id}, function(data){
    	if(data.msg == '您需要先登录才可以执行该操作'){
    			alertlogin(1);
    			return false;
    	}else{
    		alert(data.msg);
        }
    });
}

/* 收藏店铺 */
function collect_store(id)
{
    var url = SITE_URL + '/index.php?app=my_favorite&act=add&type=store&jsoncallback=?&ajax=1';
    $.getJSON(url, {'item_id':id}, function(data){
    	if(data.msg == '您需要先登录才可以执行该操作'){
			alertlogin(1);
			return false;
    	}else{
    		alert(data.msg);
        }
    });
}
/* 火狐下取本地全路径 */
function getFullPath(obj)
{
    if(obj)
    {
        //ie
        if (window.navigator.userAgent.indexOf("MSIE")>=1)
        {
            obj.select();
            return document.selection.createRange().text;
        }
        //firefox
        else if(window.navigator.userAgent.indexOf("Firefox")>=1)
        {
            if(obj.files)
            {
            	return readFileFirefox(obj);
//                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }
        return obj.value;
    }
}
//获取firfox下文件输入框的全路径，下面是在fireFox5,6版本下通过测试
function readFileFirefox(fileBrowser) {
	try{
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	}catch(e){
		// alert('Unable to access local files due to browser security settings. To overcome this, follow these steps: (1) Enter "about:config" in the URL field; (2) Right click and select New->Boolean; (3) Enter "signed.applets.codebase_principal_support" (without the quotes) as a new preference name; (4) Click OK and try loading the file again.'); 
	    // return; 
	}
    var fileName = fileBrowser.value;
    var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
    try{
    	file.initWithPath(fileName.replace(/\//g, "\\\\"));
    }catch(e){
    	if (e.result!=Components.results.NS_ERROR_FILE_UNRECOGNIZED_PATH) throw e; 
      //  alert("File '" + fileName + "' cannot be loaded: relative paths are not allowed. Please provide an absolute path to this file."); 
      //  return; 
    }
    if ( file.exists() == false ) { 
     //   alert("File '" + fileName + "' not found."); 
        return; 
    }
    return file.path;
}
/**
 *    启动邮件队列
 *
 *    @author    Garbin
 *    @param     string req_url
 *    @return    void
 */
function sendmail(req_url)
{
    $(function(){
        var _script = document.createElement('script');
        _script.type = 'text/javascript';
        _script.src  = req_url;
        document.getElementsByTagName('head')[0].appendChild(_script);
    });
}
/* 转化JS跳转中的 ＆ */
function transform_char(str)
{
    if(str.indexOf('&'))
    {
        str = str.replace(/&/g, "%26");
    }
    return str;
}
/*进行邮箱的匹配*/
function checkemail(t) {
	 var strEmail=t.value;
	 if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
	   {
			document.getElementById("emailmsg").style.color="green";
			document.getElementById("emailmsg").innerHTML="正确";
			return true;
	   }else{
			document.getElementById("emailmsg").innerHTML="Email格式不正确！";
			document.getElementById("email").focus();
			return false;
	  }
} 
//屏幕的锁屏控制类
function screenClass(){
	//锁屏
	this.lock = function(){
		var screenLock = $("#screenLock");
		if(screenLock.length > 0) return;
		var sWidth = $(document).width();//宽
		var sHeight = $(document).height();//高
		var imgPath = "";//锁屏时的图片路径
		var html = "<table border=\"0\" width=\""+sWidth+"\" height=\""+sHeight+"\"><tr><td valign=\"middle\" align=\"center\"><image src=\""+imgPath+"\"></td></tr></table>";
//		var screenObj = $('#screenLock');
		var screenObj = $('<div></div>');
		screenObj.attr('id','screenLock').css({width: sWidth + "px",height: sHeight + "px",zIndex: "100",position: "absolute", background:"#cccccc",filter: "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75",opacity: "0.6"});
		if($('#wrap').length > 0){
			$('#wrap').before(screenObj);
		}else{
			$("body").eq(0).prepend(screenObj);
		}
//		screenObj.html(html);
	}
	this.unlock = function(){
		if($("#screenLock").length < 0 || $("#screenLock") == null) return;
		var screenLock = $("#screenLock");
         screenLock.remove();
	}
}
//browser check
function checkbrowse(){
	var ua=navigator.userAgent.toLowerCase();
	var is=(ua.match(/\b(chrome|opera|safari|msie|firefox)\b/)||['','mozilla'])[1];
	var r='(?:'+is+'|version)[\\/: ]([\\d.]+)';
	var v=(ua.match(new RegExp(r))||[])[1];
	jQuery.browser.is=is;
	jQuery.browser.ver=v;
	return{'is':jQuery.browser.is,'ver':jQuery.browser.ver}}
// 登录弹出页面 author lixiang
function alertlogin(v){//v 0时关闭 1时打开
	var jH;
    if (navigator.userAgent.indexOf("Chrome") > -1) {
        jH = document.body.scrollTop;
    }else if(navigator.userAgent.indexOf("Safari") > -1){
    	jH = window.pageYOffset;
    }else {
    	jH = document.body.scrollTop;
    	if(jH == '0'){
    		jH = document.documentElement.scrollTop;
    	}
    }
    jH = parseInt(jH) + parseInt(140);
    var ht = document.getElementsByTagName('html')[0];
    var bo = document.getElementsByTagName('body')[0];
    var boheight = document.body.offsetWidth;
    var bowidth = document.body.offsetHeight;
    var htbo = document.getElementById('alertlogin');
    htbo.innerHTML = '';
    $('#over').hide();
    if(v ==1){
 	   var hheight = parseInt($(document).height())+parseInt(200);
 	   var wwidth = $(document).width();var ooff = $('#alertlogin').offset();
 	   var ooffleft = ooff.left+160;var oofftop = ooff.top-160;
 	   var left = '';
 	   htbo.innerHTML = '<div style=\"position:absolute;z-index:1000;background:#000000;width:'+wwidth+'px;height:'+hheight+'px;filter:alpha(opacity=50);-moz-opacity:0.50;-khtml-opacity: 0.50; opacity: 0.50;left:0;top:0;\"></div><div id="loginDiv" class="contentWarp" style=\"z-index:1000;position:absolute; left:450px; top:'+jH+'px;width:535px;height:auto;display:block;text-align:none;\"><div class="logoTip"><div class="logoTip-top"><div class="logoTip-top-close"><a href="javascript:alertlogin(0)">close</a></div><div class="logoTip-top-text ms_yahei">登录哇噻网</div></div><div class="logoTip-input"><form action="index.php?app=member&act=login" method="post" id="login_form1" onsubmit="return checkf();"><p style="width:auto"><label class="ms_yahei">邮箱：</label><input style="line-height:33px" type="text" id="email" name="email" onblur="javascript:isEmail(this.value)" placeholder="请使用注册邮箱登录"/><span style="float:left;line-height:35px;display:block" id="email_msg"></span></p><p style="width:auto"><label class="ms_yahei">密码：</label><input style="line-height:33px" type="password" name="password" id="password" onblur="javascript:isPassword(this.value)"/><span style="float:left;line-height:35px;" id="password_msg"></span></p><span class="rember-user ms_yahei"><input type="checkbox" name="checkbox3" id="checkbox3" value="1"/>记住我一周(在公共场所请慎用此功能)</span><dl class="logoTip-button"><dt><a onclick="newlogin()" style="cursor:pointer" class="ms_yahei">登录</a><span style="display:none"><input type="submit" name="login" value="登录"></span></dt><dd><a href="index.php?app=find_password" title="忘记密码" class="ms_yahei">忘记密码?</a></dd></dl><input type="hidden" value="'+self.location.href+'" name="ret_url"></form><div class="clear"></div></div><div class="logoTip-dash ms_yahei">还没有哇噻网帐号？<a href="index.php?app=member&act=register&ret_url='+self.location.href+'" class="ms_yahei">立即注册</a>或  使用以下帐号登录</div><div class="logoTip-ludeng" style="float:left"><a href="index.php?app=member&act=register&mod=qq&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_qq.gif" alt="QQ登录"/></a><a href="index.php?app=member&act=register&mod=sina&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_sina.gif" /></a><a href="index.php?app=member&act=register&denglu_id=taobao&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_icon1_16.gif" /></a><a href="index.php?app=member&act=register&denglu_id=alipayquick&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_icon1_18.gif" /></a><a href="index.php?app=member&act=register&denglu_id=baidu&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_baidu.gif" /></a><a href="index.php?app=member&act=register&denglu_id=douban&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_douban.gif" /></a><a href="index.php?app=member&act=register&denglu_id=kaixin001&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_kaixin.gif" /></a><a href="/index.php?app=member&act=register&mod=shengda&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_shengda.png" /></a><a href="index.php?app=member&act=register&denglu_id=renren&ret_url='+self.location.href+'"><img src="/themes/mall/wowsai/styles/default/images1/denglu_renren.gif" /></a><a href="/index.php?app=member&act=register&mod=10086&ret_url='+self.location.href+'" style="display:none;"><img src="/themes/mall/wowsai/styles/default/images1/denglu_10086.png" /></a></div></div></div>';
 	   this.target = '_blank';
 	   //矫正弹出层位置
 	   setsite();
    }
}
function checkf(){
	var emailval = $('#email').val();
	var passwordval = $('#password').val();
	if(emailval == ''){
		alert('邮箱地址不能为空!');
		return false;
	}
	if(passwordval == ''){
		alert('密码不能为空!');
		return false;
	}
	return true;
}
function isEmail(s)   
{   
	if(!s){
	   	document.getElementById("email_msg").style.color="red";
	    document.getElementById("email_msg").innerHTML="&nbsp;注册邮箱不存在"; 
	   	return false; 
	}
    var url = SITE_URL + '/index.php?app=captcha&act=check_member';
    $.getJSON(url, {'email':s}, function(data){
    	if(data==1){
    	   	document.getElementById("email_msg").style.color="green";
    	   	document.getElementById("email_msg").innerHTML="<em>&nbsp;&nbsp;&nbsp;OK</em>";
    	    return false;
    	}else{
    	   	document.getElementById("email_msg").style.color="red";
    	    document.getElementById("email_msg").innerHTML="&nbsp;注册邮箱不存在"; 
    	   	return false;  
    	}
    });
}
function isPassword(s)   
{   
	var patrn=/^\w{6,16}$/;   
	if (!patrn.exec(s)){
	   	document.getElementById("password_msg").style.color="red";
	    document.getElementById("password_msg").innerHTML="&nbsp;密码6-20个字符"; 
	   	return false;   
	}else{
	   	document.getElementById("password_msg").style.color="green";
	   	document.getElementById("password_msg").innerHTML="<em>&nbsp;&nbsp;&nbsp;OK</em>";
	    return true;
	}
}
function newlogin(){
	var emailval = $('#email').val();
	var passwordval = $('#password').val();
	if(emailval == ''){
		alert('邮箱地址不能为空!');
		return false;
	}
	if(passwordval == ''){
		alert('密码不能为空!');
		return false;
	}
	$("#login_form1").submit();
	}
/*
*  网站弹出层效果如登录弹出层，直接调用即可
*  str:弹出层的class或者id  参数需要带符号如.class  #id
*/
function dialog(str){
	show_black_bg("#over");	
	var left = ($(window).width()-$(str).width())/2+"px";
	var top = ($(window).height()-$(str).height())/2+"px";
	$(str).css({"left":left,"top":top}).show();
}

/*
*  网站弹出层的关闭按钮
*  str:弹出层的class或者id  参数需要带符号如.class  #id
*/
function dialogClose(str){
	$("#over,"+str).hide();	
}
