$(function(){
	$footer_div1 = $("#footer_div1");
	$footer_div1.css({"background":"#FCCD00"});
	$.ajax({
		dataType:"jsonp",
		url:"https://datainfo.duapp.com/shopdata/getBanner.php",
		success:function(data){
			for(var i=0; i<data.length;i++){
				var $div = $(".swiper-wrapper");
				var $img =$('<div class="swiper-slide" classID="'+JSON.parse(data[i].classID)+'"><img src="'+JSON.parse(data[i].goodsBenUrl)[0]+'"></div>') ;
				$div.append($img);
			}
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 1000,
				//height:300,
				pagination:".swiper-pagination",
				paginationClickable :true,
			})
			$(".swiper-slide").bind("click",function(){
				window.location="shirt.html?classID="+$(this).attr("classID");	
			})
		}
	});
	var $P_close = $(".P_close");
	$P_close.bind("click",function(){
		$(".swiper-container").slideUp();
	})
	$.ajax({
		dataType:"jsonp",
		url:"https://datainfo.duapp.com/shopdata/getGoods.php",
		success:function(data){
//			console.log(JSON.parse(data[0]));
			var $c_shouye = $(".c_shouye");
			for(var j=0;j<data.length;j++){
				var $img = $('<div class="shouye" goodsId="'+data[j].goodsID+'" ><div class="shou_left">'+data[j].goodsName+'</div><img src="'+JSON.parse(data[j].imgsUrl)[2]+'"></div>');
				$c_shouye.append($img);
			}
			var $shouye = $(".shouye");
			$shouye.bind("click",function(){
				window.location="details.html?goodsID="+$(this).attr("goodsId");	
			})
		}
	});
})
