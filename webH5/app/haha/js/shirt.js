 $(function(){
	var ID=GetQueryString("classID");
	//alert(ID);
	var $tex = $(".s_te");
	$.ajax({
		url:"https://datainfo.duapp.com/shopdata/getGoods.php",
		dataType:"jsonp",
		data:{
			classID:ID,
		},
		beforeSend:function(){
			$lode = $(".loding");
			$lode.show();
		},
		success:function(data){
			$lode = $(".loding");
			$lode.hide();
			var className = data[0].className;
			//console.log(className);
			$tex.html(className);
			for(var i=0;i<data.length;i++){
				console.log(data[i])
				var $div = $('<div class="con"><a href="javascript:;" class="s_text" goodsID='+data[i].goodsID+'><img src="'+data[i].goodsListImg+'"/></a><a href="javascript:;" class="s_text" goodsID='+data[i].goodsID+'>'+data[i].goodsName+'</a><p class="s_price">￥'+data[i].price+'</p></div>');
				$(".shirt_content").append($div);
				$div.children("a.s_text").bind("click",function(){
					//alert(encodeURI($(this).attr("goodsID")))
					window.location="details.html?goodsID="+encodeURI($(this).attr("goodsID"));
				})
			}
		}
	});
})
function GetQueryString(name){
	/*定义正则，用于获取相应参数*/
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 /*字符串截取，获取匹配参数值*/
     var r = window.location.search.substr(1).match(reg);
	 /*但会参数值*/
     if(r!=null)return  decodeURI(r[2]); return null;
}