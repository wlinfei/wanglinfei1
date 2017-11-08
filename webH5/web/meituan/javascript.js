// JavaScript Document

window.onload=function(){
	window.onscroll=function(){
		 (function(){
			function Fixed(){
				var oDB=document.getElementById('feedback');
				var clientH=document.documentElement.clientHeight;
				var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
				
				oDB.style.top=clientH+scrollT-oDB.offsetHeight-10+'px';
					
			}
			Fixed();
		})();
		(function(){	
			function getparentTop(obj){
				var l=0;
				var t=0;
				//alert(obj)
				while(obj){
					l=l+obj.offsetLeft;
					t=t+obj.offsetTop;
					
					obj=obj.offsetParent;
				}
				return {left:l,top:t};
			}
			var oMainnav=document.getElementById('Mainnav');
			var oMnTop=getparentTop(oMainnav.parentNode).top;
			var oMnLeft=getparentTop(oMainnav.parentNode).left;	
				//alert(oMnTop);
			var scrollT=document.documentElement.scrollTop||document.body.scrollTop;		
				if(scrollT>=oMnTop){
					oMainnav.style.position='fixed';
					oMainnav.style.top=0+'px';
					oMainnav.style.left=oMnLeft-70+'px';
				}else{
					oMainnav.style.position='absolute';
					oMainnav.style.top='60px';
					oMainnav.style.left='-70px';
				}
		})();
		(function(){
			function getParentTop(obj){
			var l=0;
			var t=0;
			while(obj){
				l=l+obj.offsetLeft;
				t=t+obj.offsetTop;
				obj=obj.offsetParent;
			}
			return {left:l,top:t};
			}
			var  aImg=document.getElementsByTagName('img');
			var clientH=document.documentElement.clientHeight;
			var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
			for(var i=0; i<aImg.length; i++){
				var aImgTop=getParentTop(aImg[i]).top;
				if(clientH+scrollT>aImgTop){
					aImg[i].src=aImg[i].getAttribute('_src');
				}
			}  	
		})();
	};
	/*图片延迟加载*/
	(function(){
		function getParentTop(obj){
		var l=0;
		var t=0;
		while(obj){
			l=l+obj.offsetLeft;
			t=t+obj.offsetTop;
			obj=obj.offsetParent;
		}
		return {left:l,top:t};
		}
		var  aImg=document.getElementsByTagName('img');
		var clientH=document.documentElement.clientHeight;
		var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
		for(var i=0; i<aImg.length; i++){
			var aImgTop=getParentTop(aImg[i]).top;
			if(clientH+scrollT>aImgTop){
				aImg[i].src=aImg[i].getAttribute('_src');
			}
		}  	
	})();
	/*fixed*/
	(function(){
		function Fixed(){
			var oDB=document.getElementById('feedback');
			var clientH=document.documentElement.clientHeight;
			var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
			
			oDB.style.top=clientH+scrollT-oDB.offsetHeight-10+'px';
				
		}
		Fixed();
	})();
	/*top*/
	(function(){
		var oFF=document.getElementById('off');
		var oAd1=document.getElementById('ad1');
		
		oFF.onclick=function(){
			oAd1.style.display='none';
		};
		
		var oApp1=document.getElementById('app1');
		
		oApp1.parentNode.onmouseover=function(){
			oApp1.style.display='block';
			oddColor=oApp1.parentNode.style.background;	
			oApp1.parentNode.style.background='#fff';	
		};
		oApp1.parentNode.onmouseout=function(){
			oApp1.style.display='none';	
			oApp1.parentNode.style.background=oddColor;
		};
	})();
	(function(){
		var oTop=document.getElementById('top-r');
		var aH3=oTop.getElementsByTagName('h3');
		
		for(var i=0; i<aH3.length; i++){
			aH3[i].onmouseover=function(){
				for(var i=0; i<aH3.length; i++){
					aH3[i].children[1].style.display='none';
					aH3[i].style.background='';
				}
				this.children[1].style.display='block';
				this.style.background='#fff';
				
			};
			aH3[i].onmouseout=function(){
				this.children[1].style.display='none';
			};
		}
	})();
	/*logo*/
	(function(){
		var osoul=document.getElementById('soul');
		var osLi=osoul.getElementsByTagName('li');
			osoul.onmouseover=function(){
				osLi[0].style.display='block';
				osLi[1].style.display='block';
			};
			osLi[0].onclick=function(){
				this.style.display='block';
				osLi[1].style.display='none';	
			};
			osLi[1].onclick=function(){
				this.style.display='block';
				osLi[0].style.display='none';	
			};
			
		var oHotp=document.getElementById('hotp');
		var ahotA=oHotp.getElementsByTagName('a');
		
		for(var i=0; i<ahotA.length; i++){
			ahotA[i].onmouseover=function(){
				for(var i=0; i<ahotA.length; i++){
					ahotA[i].style.color='';
					ahotA[i].style.textDecoration='';
				}
				this.style.color='#2db8ad';
				this.style.textDecoration='underline';
			};
			ahotA[i].onmouseout=function(){
				this.style.color='';
				this.style.textDecoration='';	
			};
		}
	})();
	/*nav*/
	(function(){
		var onavDown=document.getElementById('nav-l-down');
		var aDiv1=onavDown.children;
		
		for(var i=0; i<aDiv1.length; i++){
			aDiv1[i].onmouseover=function(){
				for(var i=0; i<aDiv1.length; i++){
					aDiv1[i].children[2].style.display='';
					aDiv1[i].style.background='';
				}
				this.children[2].style.display='block';
				this.style.background='#fff';
				this.style.width='247px';
			};
			aDiv1[i].onmouseout=function(){
				this.children[2].style.display='';
				this.style.background='';
				this.style.width='';
			};
		}
		var oMore=document.getElementById('More');
		var omore=document.getElementById('more');
		var aAmore=omore.getElementsByTagName('a');
		oMore.onmouseover=function(){
			for(var i=0; i<aAmore.length; i++){
				aAmore[i].className='';	
			}
			this.parentNode.parentNode.style.borderBottomColor='#fff';
		};
		oMore.onmouseout=function(){
			for(var i=0; i<aAmore.length; i++){
				aAmore[i].className='a1';	
			}
			this.parentNode.parentNode.style.borderBottomColor='#ccc';
		};
		
	})();
	/*名店抢购*/
	(function(){
		function toDub(n){
			return n<10?'0'+n:''+n;	
		}
		
		var oClock=document.getElementById('clock1');
		var obNum=oClock.getElementsByTagName('b');	
		var time=null;
		function clock(){
			var oDate=new Date();
			oDate.setFullYear(2016,oDate.getMonth(),oDate.getDate()+1);
			oDate.setHours(0,0,0,0);
			var t1=oDate.getTime();
			var str='';
			var oDate1=new Date();
			var t2=oDate1.getTime();
			
			var totle=parseInt((t1-t2)/1000);
				totle=totle%86400;
			var h=parseInt(totle/3600);
				totle=totle%3600;
			var m=parseInt(totle/60);
			var s=totle%60;
			
			str=str+toDub(h)+toDub(m)+toDub(s);
			
			for(var i=0; i<obNum.length; i++){
				obNum[i].innerHTML=str.charAt(i);
			}
			if(totle<0){
				clearInterval(time);
				for(var i=0; i<obNum.length; i++){
					obNum[i].innerHTML=0;
				}
			}
		}
		clock();
		
		time=setInterval(clock,1000);
	})();
	(function(){
		var opanicDown=document.getElementById('panic-down');
		var toRight=document.getElementById('toRight');
		var toLeft=document.getElementById('toLeft');
		var oDivI=opanicDown.children[0];
		oDivI.innerHTML+=oDivI.innerHTML;
		oDivI.style.width=oDivI.children[1].offsetHeight*oDivI.children.length-280+'px';
		var oDW=oDivI.offsetWidth;
		var space=2;
		var time=null;
		function tomove(){
			var DivILeft=oDivI.offsetLeft;
			if(DivILeft>=0){
				DivILeft=-oDW/2
			}else if(DivILeft<=-oDW/2){
				DivILeft=0
			}
			oDivI.style.left=DivILeft+space+'px';	
		}
		time=setInterval(tomove,30);
		oDivI.onmouseover=function(){
			clearInterval(time);
		};
		oDivI.onmouseout=function(){
			time=setInterval(tomove,30);
		};
		toRight.onclick=function(){
			space=2;	
		};	
		toLeft.onclick=function(){
			space=-2;	
		};
	})();
		
};

/*

 */

















