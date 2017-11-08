$(function(){
	var $pa = $("#l_pass");
	$("#check").bind("click",function(){
		if($("#check").is(":checked")){
			$pa.attr("type","text");
		}else{
			$pa.attr("type","password");
		}
	})
	$("#login").click(function(){
		var $l_name = $("#l_name").val();
		var $l_pass = $("#l_pass").val();
		$.ajax({
			type:"get",
			url:"https://datainfo.duapp.com/shopdata/userinfo.php",
			data:{
				status:"login",
				userID:$l_name,
				password:$l_pass,
			},
			success:function(date){
				console.log(date);
				localStorage.setItem("userID",$l_name);
				if(date == '0'){
					var $div = $("<div class='error'>用户名不存在</div>");
					var body = document.getElementsByTagName("body")[0];
					$div.appendTo(body);
				}else if(date == '2'){
					var $div = $("<div class='error'>用户名和密码不符</div>");
					var body = document.getElementsByTagName("body")[0];
					$div.appendTo(body);
				}else{
					var $div = $("<div class='error'>登录成功</div>");
					var body = document.getElementsByTagName("body")[0];
					$div.appendTo(body);
					window.location = "index.html";
				}
			}
		});
	})
})
