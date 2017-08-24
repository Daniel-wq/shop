/* baifendian @cheng */
jQuery(document).ready(function() {
	/* judge var exist */							
	if(typeof(get_dian_page)!='undefined'){
		/* whether show baifendian */
		var baifen_hide_show = get_dian_date;
		var goods_null = 0;
		var baifendianUrl = '<a href="http://www.baifendian.com" target="_blank"><img src="http://www.baifendian.com/api/banner/template-1.1.2/images/logo.gif"></a>';
		switch(get_dian_page){
			case "goods":
				getgoodsinfo('0',4);
				window.brs.onGetGoodsInfo1 = function(datas,req_id){
					if(goods_null==0){
						getgoodsdata(4,datas,req_id);
					}
				};
				window.brs.onGetGoodsInfo2 = function(datas,req_id){
					if(goods_null==0){
						getgoodsdata(4,datas,req_id);
					}
				};
			break;
			case "shopping_index":
				getgoodsinfo('0',4);
			break;
			case "gcate":
				getgoodsinfo('0',5);
			break;
			case "index":
				getgoodsinfo('0',4);
			break;
			case "cart":
				getgoodsinfo('0',5);
			break;
			case "shopping_wabao":
				getgoodsinfo('0',4);
			break;
			case "shopping_time":
				getgoodsinfo('0',4);
			break;
			case "xianzixun":
				getgoodsinfo('0',5);
			break;
			case "laba":
				getgoodsinfo('0',5);
			break;
		}
	}
	/* get baifendian data */
	function getgoodsinfo(type,page){
		if(typeof(window.brs) == 'undefined'){
			return;
		}
		switch(type){
			case "0":
				window.brs.onGetGoodsInfo = function(datas,req_id){
					goods_null = 1;
					getgoodsdata(page,datas,req_id);
				};
			break;
			case "1":
				window.brs.onGetGoodsInfo1 = function(datas,req_id){
					getgoodsdata(page,datas,req_id);
				};
			break;
			case "2":
				window.brs.onGetGoodsInfo2 = function(datas,req_id){
					getgoodsdata(page,datas,req_id);
				};
			break;
		}
	}
	/* get mysql data */
	function getgoodsdata(page,datas,req_id){
		if(baifen_hide_show==1){
			datas = String(datas);
			var dian_arr = get_splits(datas);
			var url = "";
			/* home catalog */
			if(get_dian_page=="xianzixun" || get_dian_page=="laba"){
				url = "../";
			}
			jQuery.get(
				url+'index.php?app=goods&act=verify_goods',
				{"goods_id":coalition_id(dian_arr),"page":page},
				function(data){
					data = get_id_splits(String(data));
					if(data!=""){
						switch(get_dian_page){
							case "goods":
								dian_goods(data,page,dian_arr,req_id);
							break;
							case "shopping_index":
								dian_shopping_index(data,page,dian_arr,req_id);
							break;
							case "gcate":
								dian_gcate(data,page,dian_arr,req_id);
							break;
							case "index":
								dian_index(data,page,dian_arr,req_id);
							break;
							case "cart":
								dian_cart(data,page,dian_arr,req_id);
							break;
							case "shopping_wabao":
								dian_wabao(data,page,dian_arr,req_id);
							break;
							case "shopping_time":
								dian_time(data,page,dian_arr,req_id);
							break;
							case "xianzixun":
								dian_xianzixun(data,page,dian_arr,req_id);
							break;
							case "laba":
								dian_laba(data,page,dian_arr,req_id);
							break;
						}
					}
				}
			);
		}
	}
	/* unite get id */
	function coalition_id(arr){
		var strid = "";
		var goodsarr = Array();
		for(var i=0;i<arr.length;i++){
			if(i%6==0 && goodsarr[arr[i]]!=1){
				if(strid==""){
					strid = arr[i];
				}else{
					strid = strid+','+arr[i];
				}
				goodsarr[arr[i]] = 1;
			}
		}
		return strid;
	}
	/* split */
	function get_splits(strs){
		return strs.split(",");
	}
	/* get one split */
	function get_id_splits(data){
		var data_arr = data.split("|");
		var goods = Array();
		var storearr = Array();
		for(var o=0;o<data_arr.length;o++){
			var str = data_arr[o];
			var val = str.split(",");
			goods[o] = val[0];
			storearr[val[0]] = Array();
			storearr[val[0]]['store_id'] = val[1];
			storearr[val[0]]['store_name'] = val[2];
		}
		var r = Array();
		r[0] = goods;
		r[1] = storearr;
		return r;
	}
	/* bi array */
	function validate_id(goods_id,arr){
		var r = false;
		for(var i=0;i<arr.length;i++){
			if(arr[i]==goods_id){
				r = true;
			}
		}
		return r;
	}
	/* images */
	function images_replace(strs){
		return strs.replace('big','small');
	}
	/* str substr */
	function str_substr(str,number){
		if(str.length>number){
			return str.substr(0,number)+"...";
		}else{
			return str;
		}
	}
	/* baifendian page */
	function dian_shopping_index(rarr,page,arr,req_id){
		if(rarr[0].length>0){
			var string = "<div class='ldiv3_top'><div style='float:left; padding : 27px 0 18px 8px;'><img src='themes/mall/wowsai/styles/default/images1/shoppingdiv_cnxh.gif'></div><div style='float:left; padding-top : 34px; padding-left : 17px;'><span>根据您浏览的产品特征，我们猜你喜欢这些</span></div></div><div class='ldiv3_bottom'><div class='clear'></div><ul style='margin-top:5px;'>";
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
						var store_id = rarr[1][arr[i]]['store_id'];
						var store_name = str_substr(rarr[1][arr[i]]['store_name'],8);
						string += '<li style="float:left"><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank"><img width="170px" height="134px" src="'+images_replace(arr[i+3])+'"  alt=""/></a><h6><a href="'+arr[i+2]+'?req_id='+req_id+'">'+str_substr(arr[i+1],13)+'</a></h6><p><strong><a href="http://www.wowsai.com/index.php?app=store&id='+store_id+'" target="_blank">['+store_name+']</a></strong>￥'+arr[i+4]+'</p></li>';
					}
					number++;
				}
			}
			string += '</ul><div class="clear"></div><div style="text-align:left;margin-left:2px">'+baifendianUrl+'</div><div class="clear"></div></div>';
			jQuery(".left_cnxh").show();
			jQuery(".left_cnxh").html(string);
		}
	}
	/* gcate page */
	function dian_gcate(rarr,page,arr,req_id){
		if(rarr[0].length>0){
			var string = "";
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
						var title = arr[i+1];
						string += '<div class="paigoods"><div class="paihang_l"><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank"><img src="'+images_replace(arr[i+3])+'"/></a></div><div class="paihang_r"><span class="cgray"><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank">'+title.substr(0,20)+'</a></span><h4>￥'+arr[i+4]+'</h4></div></div>';
					}
					number++;
				}
			}
			if(string!=""){
				string += '<div style="padding:5px 0px 5px 0px;">'+baifendianUrl+'</div>';
				jQuery("#baifen_gcate").show();
				jQuery("#baifen_gcate_bottom").show();
				jQuery("#baifen_gcate").html(string);
			}
		}
	}
	/* shouye page */
	function dian_index(rarr,page,arr,req_id){
		if(rarr[0].length==page){
			var string = '<div class="goodBaifendian"><div class="clear"></div><div class="title"><div class="titleLeft pad"><img src="themes/mall/wowsai/styles/default/images1/index_cnxh.gif"  align="absbottom"/></div></div><div class="clear"></div><ul>';
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
						var store_id = rarr[1][arr[i]]['store_id'];
						var store_name = str_substr(rarr[1][arr[i]]['store_name'],8);
						string += '<li><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank"><img width="170px" height="134px" src="'+images_replace(arr[i+3])+'"  alt=""/></a><h6><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank">'+str_substr(arr[i+1],13)+'</a></h6><p><strong><a href="http://www.wowsai.com/index.php?app=store&id='+store_id+'" target="_blank">['+store_name+']</a></strong>￥'+arr[i+4]+'</p></li>';
					}
					number++;
				}
			}
			string += '</ul><div class="clear"></div><div style="text-align:right;margin-right:4px;">'+baifendianUrl+'</div></div>';
			jQuery("#baifen_index").show();
			jQuery("#baifen_index").html(string);
		}
	}
	/* cart page */
	function dian_cart(rarr,page,arr,req_id){
		if(rarr[0].length>0){
			var string = '';
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
						var title = arr[i+1];
						var store_id = rarr[1][arr[i]]['store_id'];
						var store_name = str_substr(rarr[1][arr[i]]['store_name'],7);
						string += '<dl><dt><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank"><img src="'+images_replace(arr[i+3])+'" width="170" height="134"/></a></dt><dd><p><a href="'+arr[i+2]+'?req_id='+req_id+'" class="guess_a0" target="_blank">'+str_substr(title,13)+'</a></p><p><span class="guess_goods_store_name"><a href="http://shop'+store_id+'.wowsai.com" class="guess_a1" target="_blank">['+store_name+']</a></span><span class="guess_goods_price">￥'+arr[i+4]+'</span></p></dd></dl>';
					}
					number++;
				}
			}
			string += '<div class="clear"></div><div style="padding:5px 0px 0px 1px;">'+baifendianUrl+'</div>';
			jQuery("#baifen_cart").show();
			jQuery("#baifen_cart").html(string);
		}
	}
	/* wabao page */
	function dian_wabao(rarr,page,arr,req_id){
		if(rarr[0].length>0){
			var string = '<div class="title"><img src="themes/mall/wowsai/styles/default/images1/wabao_baifendian.gif" /></div><ul>';
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
						var title = arr[i+1];
						var store_id = rarr[1][arr[i]]['store_id'];
						var store_name = str_substr(rarr[1][arr[i]]['store_name'],7);
						string += '<li><a href="'+arr[i+2]+'?req_id='+req_id+'"><img width="170px" height="134px" src="'+images_replace(arr[i+3])+'"  alt=""/></a><h6><a href="'+arr[i+2]+'?req_id='+req_id+'">'+str_substr(arr[i+1],13)+'</a></h6><p><strong><a href="http://www.wowsai.com/index.php?app=store&id='+store_id+'" target="_blank">['+store_name+']</a></strong>￥'+arr[i+4]+'</p></li>';
					}
					number++;
				}
			}
			string += '</ul><div class="clear"></div><div><div class="clear"></div><div style="padding:1px 0px 0px 2px;">'+baifendianUrl+'</div></div>';
			jQuery("#wabao_baifendian").html(string);
		}
	}
	/* timemachine page */
	function dian_time(rarr,page,arr,req_id){
		if(rarr[0].length>0){
			var string = '<div class="title"><img src="themes/mall/wowsai/styles/default/images1/wabao_baifendian.gif" /></div><ul>';
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
					var store_id = rarr[1][arr[i]]['store_id'];
					var store_name = str_substr(rarr[1][arr[i]]['store_name'],7);
					string += '<li><a href="'+arr[i+2]+'?req_id='+req_id+'"><img width="170px" height="134px" src="'+images_replace(arr[i+3])+'"  alt=""/></a><h6><a href="'+arr[i+2]+'?req_id='+req_id+'">'+str_substr(arr[i+1],13)+'</a></h6><p><strong><a href="http://www.wowsai.com/index.php?app=store&id='+store_id+'" target="_blank">['+store_name+']</a></strong>￥'+arr[i+4]+'</p></li>';
					}
					number++;
				}
			}
			string += '</ul><div class="clear"></div><div><div class="clear"></div><div style="padding:1px 0px 0px 2px;">'+baifendianUrl+'</div></div>';
			jQuery("#time_baifendian").html(string);
		}
	}
	/* xianzixun page */
	function dian_xianzixun(rarr,page,arr,req_id){
		if(rarr[0].length>0){
			var string = '<h6><img src="/home/template/wowsai/images1/cnxh.gif"/></h6><div class="leftdian"><div style="goods">';
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
						string += '<div class="paihang_l"><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank"><img src="'+images_replace(arr[i+3])+'"/></a></div><div class="paihang_r"><span class="cgray"><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank">'+str_substr(arr[i+1],14)+'</a></span><h4>￥'+arr[i+4]+'</h4></div><div class="clear"></div>';
					}
					number++;
				}
			}
			string += '<div class="clear"></div><div style="text-align:left;">'+baifendianUrl+'</div>';
			jQuery(".zixunBaifendian").show();
			jQuery(".zixunBaifendian").html(string);
		}
	}
	/* laba page */
	function dian_laba(rarr,page,arr,req_id){
		if(rarr[0].length>0){
			var string = '<h2 class="gzTit"><img src="template/wowsai/images1/cnxh.gif"/></h2><div class="leftdian">';
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
						var store_id = rarr[1][arr[i]]['store_id'];
						var store_name = str_substr(rarr[1][arr[i]]['store_name'],7);
						string += '<a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank"><img src="'+images_replace(arr[i+3])+'"/></a><h4><a href="'+arr[i+2]+'?req_id='+req_id+'">'+str_substr(arr[i+1],12)+'</a></h4><p><a href="http://www.wowsai.com/index.php?app=store&id='+store_id+'" target="_blank">['+store_name+']</a><span>￥'+arr[i+4]+'</span></p>';
					}
					number++;
				}
			}
			string += '</div><div class="clear"></div><div style="text-align:right;width:173px;">'+baifendianUrl+'</div>';
			jQuery("#labaBaifendian").show();
			jQuery("#labaBaifendian").html(string);
		}
	}
	/* goods page */
	function dian_goods(rarr,page,arr,req_id){
		if(rarr[0].length>0){
			var string = jQuery("#baifen_goods").html()+'<ul>';
			var number = 1;
			for(var i=0;i<arr.length;i++){
				if(i%6==0 && validate_id(arr[i],rarr[0])){
					if(number<=page){
						var store_id = rarr[1][arr[i]]['store_id'];
						var store_name = str_substr(rarr[1][arr[i]]['store_name'],7);
						string += '<li><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_black"><img width="141" height="141" src="'+images_replace(arr[i+3])+'" data-pinit="registered"></a><h6><a href="'+arr[i+2]+'?req_id='+req_id+'" target="_blank">'+str_substr(arr[i+1],8)+'</a></h6><p><strong><a target="_blank" href="http://www.wowsai.com/index.php?app=store&id='+store_id+'">['+store_name+']</a></strong>￥'+arr[i+4]+'</p></li>';
					}
					number++;
				}
			}
			string += '</ul><div class="clear"></div><div style="padding:8px 0px 5px 10px;text-align:left;width:173px;">'+baifendianUrl+'</div>';
			jQuery("#baifen_goods").show();
			jQuery("#baifen_goods").html(string);
		}
	}
});