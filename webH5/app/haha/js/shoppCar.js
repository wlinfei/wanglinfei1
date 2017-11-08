$(function(){
	$.ajax({
		dataType:"jsonp",
		url:"https://datainfo.duapp.com/shopdata/getCar.php",
		data:{"userID":localStorage.getItem("userID")},
		beforeSend:function(){
			$lode = $(".loding");
			$lode.show();
		},
		success:function(data){
			$lode = $(".loding");
			$lode.hide();
			//console.log(data);
			var $num = $(".num");
			$num.text(data.length)	
			var $money = $(".money");
			var allmoney = 0;
			for(var j=0;j<data.length;j++){
				 allmoney = allmoney + parseFloat(data[j].price)*data[j].number;
				//console.log(allmoney);
			}
			$money.text("￥"+allmoney.toFixed(2));
			var $goods = $(".goods");
			for(var i=0;i<data.length;i++){
				$box = '<div class="s_box"><img class="imgs" src="'+data[i].goodsListImg+'"><div class="s_p"><p>'+data[i].goodsName+'<span class="de glyphicon glyphicon-trash"></span></p><p>'+data[i].className+'</p><p>单价：<span class="text_red price">￥'+ data[i].price +'</span></p><p>数量：<button class="jian" goodsID="'+data[i].goodsID+'">-</button><span class="goods_num">'+data[i].number+'</span><button class="add" goodsID="'+data[i].goodsID+'">+</button></p></div></div>';
				$goods.append($box);
			}
		
			var $jian = $(".jian");
			var $add = $(".add");
		//减少商品	
			$jian.bind("click",function(){
				var $goods_id = $(this).attr("goodsID");
				//alert( $goods_id);
				var $goods_num = $(".goods_num");
				var text= $(this).next().text();
				$(this).next().text(text-1);
				var now_num = $(this).next().text(); 
				if(now_num==0){
					//$(this).next().text(0); 
					//移除
					$(this).parent().parent().parent().remove();
					//更改数量
					$num.text(parseInt($num.text())-1);	
					//alert($num.text());
				}
				
			//更改头上总价
				var price = $(this).parent().siblings().children(".price");
				//alert(price.text().substr(1));
				allmoney = allmoney - price.text().substr(1)
				$money.text("￥"+allmoney.toFixed(2));
			//更新数据库	
				$.ajax({
					type:"get",
					url:"https://datainfo.duapp.com/shopdata/updatecar.php",
					data:{"userID":localStorage.getItem("userID"),
						"goodsID":$goods_id,
						"number":now_num
					},
					success:function(data){
						console.log(data);
						// window.location.reload();
						
					}
				});
				

			})
			//增加商品
			$add.bind("click",function(){
				var $goods_id = $(this).attr("goodsID");
				//alert( $goods_id);
				var $goods_num = $(".goods_num");
				var texts= $(this).prev().text();
				var now_num = parseInt(texts) + 1; 
				$(this).prev().text(now_num);
				
				//alert($(this).next().text())
				
				var price = $(this).parent().siblings().children(".price");
				//alert(price.text().substr(1));
				allmoney = allmoney + parseFloat(price.text().substr(1))
				//alert(allmoney);
				$money.text("￥"+allmoney.toFixed(2));
				
				$.ajax({
					type:"get",
					url:"https://datainfo.duapp.com/shopdata/updatecar.php",
					data:{"userID":localStorage.getItem("userID"),
						"goodsID":$goods_id,
						"number":now_num
					},
					success:function(data){
						console.log(data);
						// window.location.reload();
					}
				});
			
			})
			
			
			//点击删除按钮 
			var $de = $(".de");
			$de.bind("click",function(){
				var $goods_id = $de.parent().siblings().children(".add").attr("goodsID");
				$(this).parent().parent().parent().remove();
				//变总数量
				$num.text(parseInt($num.text())-1);
				//总价
				var price = $(this).parent().siblings().children(".price");
				//alert(price.text().substr(1));
				allmoney = allmoney - price.text().substr(1)
				$money.text("￥"+allmoney.toFixed(2));
				//alert($goods_id)
				$.ajax({
					type:"get",
					url:"https://datainfo.duapp.com/shopdata/updatecar.php",
					data:{"userID":localStorage.getItem("userID"),
						"goodsID":$goods_id,
						"number":0
					},
					success:function(data){
						console.log(data);
					 	//window.location.reload();
					 	
					}
				});
			})
		}
	});
	
})

