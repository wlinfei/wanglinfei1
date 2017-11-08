$(function(){
	var $text_name = $('#name');
	var $text_pass = $('#pass');
	var $text_repass = $('#repass');
	$text_name.blur(function(){
		var len = $text_name.val().length;
		if(len>10){
			alert("用户名不能多于十位数");
		}
	})
	$text_repass.blur(function(){
		if($text_pass.val() == $text_repass.val()){
			
		}else{
			alert("您两次输入密码不一致");
		}
	})
	/*ajax 验证*/
	$("#reg").click(function(){
		var $name = $("#name").val();
		var $pass = $("#pass").val();
		$.ajax({
			url:"https://datainfo.duapp.com/shopdata/userinfo.php",
			type:"get",
			data:{
				status:"register",
				userID:$name,
				password:$pass,
			},
			success:function(date){//date 代表 ajax接口里的返回值
				console.log(date);
				if(date == '0'){
					var $div = $("<div class='error'>该用户名已经被注册</div>");
					var body = document.getElementsByTagName("body")[0];
					$div.appendTo(body);
				}if(date == '1'){
 					var body = document.getElementsByTagName("body")[0];
 					var $div = $("<div class='error'>您已经注册成功<a href='index.html'>去购物</a></div>");
					$div.appendTo(body);
					
				}
			},
		});
		
	})
})
