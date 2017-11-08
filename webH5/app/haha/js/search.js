$(function(){
	var $search_input= $("#search_input");
	var $div3 = $("#footer_div3");
	$div3.css({"background":"#FCCD00"});
	var $left_p = $(".left").children("p");
	orderB($left_p,$(".left"));
	
	$left_p.eq(0).css({"webkitAnimation":"change_color 3s linear infinite","paddingLeft":"10%"});
	$left_p.eq(1).css({"webkitAnimation":"change_color 3s linear 1s infinite","paddingLeft":"20%"});
	$left_p.eq(2).css({"webkitAnimation":"change_color 3s linear 0.5s infinite","paddingLeft":"15%"});
	$left_p.eq(3).css({"webkitAnimation":"change_color 3s linear 1.5s infinite","paddingLeft":"20%"});
	var $right_p = $(".right").children("p");
	orderB($right_p,$(".right"));
	$right_p.eq(0).css({"webkitAnimation":"change_color 3s linear 2s infinite","paddingLeft":"5%"});
	$right_p.eq(1).css({"webkitAnimation":"change_color 3s linear  infinite","paddingLeft":"20%"});
	$right_p.eq(2).css({"webkitAnimation":"change_color 3s linear 1.5s infinite","paddingLeft":"15%"});
	$right_p.eq(3).css({"webkitAnimation":"change_color 3s linear  infinite","paddingLeft":"20%"});
	
	$left_p.bind("click",function(){
		var text = $(this).html();
		//alert(text);
		$search_input.val(text);
	});
	$right_p.bind("click",function(){
		var text = $(this).html();
		//alert(text);
		$search_input.val(text);
	});
	var $ser_click = $(".ser_click");
	$ser_click.bind("click",function(){
		//alert($search_input.val());
		$.ajax({
			dataType:"jsonp",
			url:"https://datainfo.duapp.com/shopdata/selectGoodes.php",
			data:{
				selectText:encodeURI($search_input.val()),
			},
			success:function(data){
			//	console.log(data[0].classID);
				window.location="shirt.html?classID="+data[0].classID;
			}
		});
	})
})
//随机排序函数
function orderB($left_p,m){
		$left_p.sort(function(){return Math.random() - 0.3});
		$(m).append($left_p);
		//console.log($left_p);
	}