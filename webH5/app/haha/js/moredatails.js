$(function(){
	var ID=GetQueryString("goodsID");
	//alert(ID);
	//var $more_deta = $(".more_deta");
	
	$.ajax({
		url:"https://datainfo.duapp.com/shopdata/getGoods.php",
		dataType:"jsonp",
		data:{
			goodsID:ID,
		},
		beforeSend:function(){
			$lode = $(".loding");
			$lode.show();
		},
		success:function(data){
			
			//var data = JSON.parse(data);
			$lode = $(".loding");
			$lode.hide();
			var imgsurl = JSON.parse(data[0].imgsUrl);
			console.log(data[0]);
			console.log(imgsurl[0])
			//console.log(data[0]);
			$conte = $('.conte');
			var $img = $('<img src="'+data[0].goodsListImg+'"><p class="deta_name">品牌名称：'+data[0].goodsName+'</p><p >商品名称'+data[0].goodsName+'</p><p>材质：'+data[0].detail+'</p><p>产地：</p><p>产品编号：'+data[0].buynumber+'</p><p>洗涤说明：</p><p>所属分类：</p><p>备注：</p><p>其他：</p>');
			$conte.append($img);
//			for(var i=0;i<imgsurl.length; i++){
//				var $img = $('<img src="'+imgsurl[i]+'">');
//			    $conte.append($img);
//			}
//			$more_deta.bind("click",function(){
//				//alert();
//				window.location="moredatails.html?goodsID="+ID;
//			})

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