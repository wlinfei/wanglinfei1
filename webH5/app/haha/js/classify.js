$(function(){
	var $conte = $(".conte");
	var $footer_div2 = $("#footer_div2");
	$footer_div2.css({"background":"#FCCD00"})
	$.ajax({
		type:"get",
		url:"https://datainfo.duapp.com/shopdata/getclass.php",
		beforeSend:function(){
			$lode = $(".loding");
			$lode.show();
		},
		success:function(data){
			$lode = $(".loding");
			$lode.hide();
			var josn_data = JSON.parse(data);
				for(var i=0;i<josn_data.length;i++){
					var $p = $('<p class="cont_p" >'+josn_data[i].className+'<span class="rig glyphicon glyphicon-menu-right"></span></p>');
					$p[0].classID=josn_data[i].classID;//添加属性
					$conte.append($p);
					$p.bind("click",function(){
						window.location="shirt.html?classID="+encodeURI(this.classID);
					})
					
				}
		}
	});
})
