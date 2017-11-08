$(function(){
	var ID=GetQueryString("goodsID");
	//alert(ID);
	var $more_deta = $(".more_deta");
	
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
			console.log(data);
			//var data = JSON.parse(data);
			$lode = $(".loding");
			$lode.hide();
			var imgsurl = JSON.parse(data[0].imgsUrl);
			//console.log(imgsurl)
			//console.log(imgsurl[0])
			//console.log(data[0]);
			$conte = $('.conte');
			var $img = $('<img src="'+imgsurl[0]+'"><p class="deta_name">'+data[0].goodsName+'</p><p class="deta_price"><span class="now_price">￥'+data[0].price+'</span><span class="before_price"></span></p><p>尺码</p><p>数量：1</p>');
			$conte.append($img);
			$more_deta.bind("click",function(){
				//alert("moredatails.html?goodsID="+ID);
				window.location="moredatails.html?goodsID="+ID;
			})

		}
	});
	
	var $go_shopcar = $(".go_shopcar");
	$go_shopcar.bind("click",function(){
		if(localStorage.getItem("userID")){
			$.ajax({
				type:"get",
				url:"https://datainfo.duapp.com/shopdata/updatecar.php",
				data:{"userID":localStorage.getItem("userID"),
						"goodsID":ID,
						"number":1
				},
				success:function(data){
					if(data ==1){
						var $div = $("<div class='suc'>您已成功加入购物车</div>");
						$("body").append($div);
						$div.css({"webkitAnimation":"suc 2s linear 1s forwards"})
					}	
				}
			});
		}else{
			window.location = "login.html";
		}
		
	})
	
})
function GetQueryString(name){
	/*定义正则，用于获取相应参数*/
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 /*字符串截取，获取匹配参数值*/
     var r = window.location.search.substr(1).match(reg);
	 /*但会参数值*/
     if(r!=null)return  decodeURI(r[2]); return null;
}