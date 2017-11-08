(function(win,doc){
  function change(){
    var a=20/1000*doc.documentElement.clientWidth;
    if(a>20){
      a=20;
    }
    doc.documentElement.style.fontSize=a+'px';
  }
  change();
  win.addEventListener('resize',change,false);
})(window,document);
//图片延迟加载
function ImgDelay() {
  function getParentTop(obj) {
    var l = 0;
    var t = 0;
    while (obj) {
      l = l + obj.offsetLeft;
      t = t + obj.offsetTop;
      obj = obj.offsetParent;
    }
    return {left: l, top: t};
  }

  var aImg = document.getElementsByTagName('img');
  var clientH = document.documentElement.clientHeight;
  var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
  for (var i = 0; i < aImg.length; i++) {
    var aImgTop = getParentTop(aImg[i]).top;
    if (clientH + scrollT > aImgTop) {
      aImg[i].src = aImg[i].getAttribute('_src');
    }
  }
}
document.addEventListener('DOMContented',ImgDelay,false);
window.addEventListener('scroll',ImgDelay,false);
//IE兼容性处理
document.addEventListener('DOMContentLoaded',function(){
    var oNav = document.getElementById('nav1');
    var oLogo=document.getElementById('logo');
    var oCenter=document.querySelector('.center .fount');
    var nav=navigator.userAgent;
    if(nav.toLowerCase().indexOf('msie')!=-1){
      oNav.style.background='rgb(20, 9, 10)';
      oLogo.style.background='#b4ff44';
      oCenter.style.zIndex=2;
    }
},false);
/*nav*/
document.addEventListener('DOMContentLoaded',function(){
  var oNav = document.getElementById('nav');
  var aA= oNav.children;
  var H=document.documentElement.clientHeight;
  for(var i = 0;i<aA.length-1;i++){
    aA[i].index=i;
    aA[i].onmouseover = function(){
      Move(aA[aA.length-1],this.offsetLeft);
    };
    aA[i].onmouseout = function(){
      Move(aA[aA.length-1],0);
    };
    aA[i].onclick=function(){
      var start=0;
      var Top=common.getPos(oNav,top).top+oNav.offsetHeight;
      var dis=Top+H*this.index-start;
      var count=Math.floor(1000*this.index/30);
      var n=0;
      var timer=null;
      clearInterval(timer);
      timer=setInterval(function(){
        n++;
        if(n==count){
          clearInterval(timer);
        }
        if(navigator.userAgent.toLowerCase().indexOf('chrome')!=-1){
          document.body.scrollTop=start+n*dis/count;
        }else{
          document.documentElement.scrollTop=start+n*dis/count;
        }
      },30);
    };
  }
},false);
/*时钟*/
document.addEventListener('DOMContentLoaded',function(){
  var oDiv=document.getElementById('infor');
  var aSpan=document.getElementsByTagName('span');
  function clock(){
    var oDate=new Date();
    var h=oDate.getHours();
    var m=oDate.getMinutes();
    var s=oDate.getSeconds();

    aSpan[0].style.transform='rotate('+(h*30+m/60*30)+'deg)';
    aSpan[1].style.transform='rotate('+m*6+'deg)';
    aSpan[2].style.transform='rotate('+s*6+'deg)';
  }
  clock();
  setInterval(clock,1000);
},false);
/*header-canvas*qq音乐*/
document.addEventListener('DOMContentLoaded',function(){
  var oqqAudio=document.getElementById('qqAudio');
  var aLi=oqqAudio.getElementsByTagName('li');
  var oPlayup=document.querySelector('.playup');
  var oPlay=document.querySelector('.play');
  var oPlaydown=document.querySelector('.playdown');
  var oPlayrest=document.querySelector('.playrest');
  var oCurr=document.querySelector('.currentTime');
  var oTime=document.querySelector('.totalTime');
  var oCurrvolum=document.querySelector('.currvolum');
  var oDrag1=document.querySelector('.drag1');
  var oDrag=document.querySelector('.drag');
  var oVolume=document.querySelector('.volume');
  var oCD=document.getElementById('CD');
  var oPlayPause=document.querySelector('.paly-pause');
  var oA=oqqAudio.getElementsByTagName('audio')[0];
  var arr=[];
  for(var i=0; i<aLi.length; i++){
    arr.push(aLi[i].innerHTML);
  }
  var iNow=0;
  var rotate=0;
  oA.src='mp3/'+arr[0]+'.mp3';
  function play(){
    for(var i=0; i<aLi.length; i++) {
      aLi[i].className='';
    }
    aLi[iNow].className='on';
    oA.src='mp3/'+arr[iNow]+'.mp3';
    oA.volume=0.5;
    oDrag1.style.left=70+'px';
    oCurrvolum.style.width=40+'px';
    oqqAudio.style.background='rgba('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+',0.6)';
    //oCD.classList.add('on');
    oCD.style.transform='rotate('+rotate+'deg)';
    oA.play();
    oPlay.style.backgroundPosition='-28px 0';
  }
  for(var i=0; i<aLi.length; i++) {
    aLi[i].index=i;
    aLi[i].ondblclick=function(){
      iNow=this.index;
      play();
    };
  }
  oPlayPause.onclick=oPlay.onclick=function(){
    if(oA.paused){
      this.style.backgroundPosition='-28px 0';
      oPlayPause.style.backgroundPosition='-79px -508px';
      oA.play();
    }else{
      this.style.backgroundPosition='0 0';
      oPlayPause.style.backgroundPosition='-79px -376px';
      //oCD.classList.remove('on');
      oA.pause();
    }
  };
  oPlayup.onclick=function(){
    iNow--;
    if(iNow<0){
      iNow=arr.length-1;
    }
    play();
  };
  oPlaydown.onclick=function(){
    iNow++;
    if(iNow>arr.length-1){
      iNow=0;
    }
    play();
  };
  function toDub(n){
    return n<10?'0'+n:''+n;
  }
  //时间
  oA.ontimeupdate=function(){
    var t1=oA.currentTime;
    var t2=oA.duration;
    oCD.style.transform='rotate('+t1%360*20+'deg)';
    oCurr.style.width=t1/t2*100+'%';
    oDrag.style.left=oCurr.offsetWidth+'px';
    var m1=parseInt(t1/60);
    var s1=parseInt(t1%60);
    var m2=parseInt(t2/60);
    var s2=parseInt(t2%60);
    oTime.innerHTML=toDub(m1)+':'+toDub(s1)+'/'+toDub(m2)+':'+toDub(s2);
  };
  var a=0;
  oA.playState=0;
  oPlayrest.onclick=function(){
    a++;
    oPlayrest.style.backgroundImage='url("img1/'+(a%4)+'.gif")';
    oA.playState=a%4;
  };
  function rnd(m,n){
    return parseInt(m+Math.random()*(n-m));
  }
  //播放模式
  oA.onended=function(){
    //oCD.classList.remove('on');
    switch(oA.playState){
      case 0:
        iNow++;
        if(iNow>arr.length-1){
          iNow=0;
        }
        play();
        break;
      case 1:
        iNow++;
        play();
        break;
        break;
      case 2:
        iNow=rnd(0,arr.length);
        play();
        break;
      case 3:
        play();
        break;
    }
  };
  //音量
  var tab=false;
  oVolume.onclick=function(){
    if(tab){
      oA.muted=!oA.muted;
      oVolume.style.backgroundPosition='0 -144px';
    }else{
      oA.muted=!oA.muted;
      oVolume.style.backgroundPosition='0 -183px';
    }
    tab=!tab;
  };
  //滚动条快进
  oDrag.onmousedown=function(ev){
    var t2=oDrag.offsetLeft;
    var x1=ev.clientX-t2;
    document.onmousemove=function(ev){
      var left=ev.clientX-x1;
      if(oDrag.offsetLeft+left<0){
        left=-oDrag.offsetLeft;
      }
      if(left>600){
        left=600;
      }
      oDrag.style.left=left+'px';
      oCurr.style.width=left+'px';
      if(!oA.paused){
        oA.currentTime=left/600*oA.duration;
      }
      document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
      };
      return false;
    };
  };
  //音量加
  oDrag1.onmousedown=function(ev){
    var t2=oDrag1.offsetLeft;
    var x1=ev.clientX-t2;
    document.onmousemove=function(ev){
      var left=ev.clientX-x1;
      if(left<30){
        left=30;
      }
      if(left>110){
        left=110;
      }
      oDrag1.style.left=left+'px';
      oCurrvolum.style.width=left-30+'px';
      oA.volume=(left-30)/80;
      document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
      };
      return false;
    };
  };
},false);
$(function(){
  var a=0;
  $('.index-page1 .left').bind('click',function(){
    a++;
    $('.index-page1 .center').css({transform:'rotateX('+180*a+'deg)',msTransform:'rotateX('+180*a+'deg)'});
  });
  $('.index-page1 .right').bind('click',function(){
    a--;
    $('.index-page1 .center').css({transform:'rotateX('+180*a+'deg)',msTransform:'rotateX('+180*a+'deg)'});
  });
});
/*page2*/
document.addEventListener('DOMContentLoaded',function(){
  var oLeft=document.getElementById('page2-left');
  var oRight=document.getElementById('page2-right');
  var oWorks=document.getElementById('personal-works');
  var aDiv=oWorks.children;
  var aClass=[];
  for(var i=0; i<aDiv.length; i++){
    aClass.push(aDiv[i].className);
  }
  oLeft.onclick=function(){
    aClass.push(aClass.shift());
    for(var i=0; i<aDiv.length; i++){
      aDiv[i].className=aClass[i];
    }
  };
  oRight.onclick=function(){
    aClass.unshift(aClass.pop());
    for(var i=0; i<aDiv.length; i++){
      aDiv[i].className=aClass[i];
    }
  };
},false);
/*page5*/
function pageMove(){
  function getRandom(n,m){
    return parseInt(Math.random()*(m-n)+n);
  }
  var oPage5=document.getElementById('index-page5');
  var aSpan=oPage5.getElementsByTagName('span');
  var aLi=oPage5.getElementsByTagName('li');
  var arr=[];
  for(var i=0; i<aLi.length; i++){
    arr[i]={'top':aLi[aLi.length-1-i].offsetTop,'left':aLi[aLi.length-1-i].offsetLeft,'height':aLi[aLi.length-1-i].offsetHeight,'width':aLi[aLi.length-1-i].offsetWidth}
  }
  var arr2=[];
  for(var i=0; i<aSpan.length; i++){
    arr2[i]={'top':common.getPos(aSpan[i]).top,'left':common.getPos(aSpan[i]).left,'width':aSpan[i].offsetWidth,'height':aSpan[i].offsetHeight}
  }
  for(var i=0; i<aLi.length; i++){
    aLi[i].style.position='absolute';
    aLi[i].style.left=arr[i].left+'px';
    aLi[i].style.top=arr[i].top+'px';
    aLi[i].style.margin=0;
    aLi[i].style.background='rgb('+getRandom(0,256)+','+getRandom(0,256)+','+getRandom(0,256)+')';
  }

  for(var i=0; i<aSpan.length; i++){
    (function(m){
      aSpan[i].onclick=function(){
        var iNow=0;
        var  timer=setInterval(function(){
          (function(index){
            common.move(aLi[iNow],{'left':arr2[m].left,'top':arr2[m].top,'width':arr2[m].width,'height':arr2[m].height},{'duration':200,'complete':function(){
              if(index==aLi.length-1){
                back();
              }
            }});
          })(iNow);
          iNow++;
          if(iNow==aLi.length){
            clearInterval(timer);
          }
        },200);
        function back(){
          var timer=setInterval(function(){
            iNow--;
            common.move(aLi[iNow],{'left':arr[iNow].left,'top':arr[iNow].top,'width':arr[iNow].width,'height':arr[iNow].height},{'duration':200,'complete':function(){
              if(iNow==0){
                clearInterval(timer);
              }
            }});
          },200)
        }
      };
    })(i);
  }
}
document.addEventListener('DOMContentLoaded',pageMove,false);

//返回顶部
document.addEventListener('DOMContentLoaded',function(){
    var oFeedBack=document.getElementById('feedback');
    var aA=oFeedBack.getElementsByTagName('a');
    aA[0].onclick=function(){
        oFeedBack.style.display='none';
        var oS=document.documentElement.scrollTop||document.body.scrollTop;
        var oH=document.documentElement.clientHeight;
        var start=oS;
        var dis=0-start;
        var count=Math.floor(1000*oS/oH/30);
        var n=0;
        var timer=null;
        clearInterval(timer);
        timer=setInterval(function(){
          n++;
          if(n==count){
            clearInterval(timer);
          }
          if(navigator.userAgent.toLowerCase().indexOf('chrome')!=-1){
            document.body.scrollTop=start+n*dis/count;
          }else{
            document.documentElement.scrollTop=start+n*dis/count;
          }
        },30);
        document.addEventListener('scroll',function() {
          var oS2=document.documentElement.scrollTop||document.body.scrollTop;
          if (oS2 > oS||oS2==0) {
            oFeedBack.style.display = 'block';
          }
        },false);
    };
},false);
//index-page5放大
document.addEventListener('DOMContentLoaded',function(){
    var oPage5=document.getElementById('index-page5');
    var oUl=oPage5.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var w=aLi[0].offsetWidth;
    var h=aLi[0].offsetHeight;
    var timer=null;
    function tab(_this){
        _this.style.transform='scale(1.3,1.3)';
        _this.style.transition='0.8s all ease';
        _this.style.zIndex='2';
    }
    for(var i=0; i<aLi.length; i++){
      aLi[i].onmouseover=function(){
          var _this=this;
          timer=setTimeout(function(){
            tab(_this)
          },300);
      };
      aLi[i].onmouseout=function(){
        clearTimeout(timer);
        this.style.transform='scale(1,1)';
        this.style.transition='0.8s all ease';
        this.style.zIndex='';
      };
    }
},false);
//3d-立方体
document.addEventListener('DOMContentLoaded',function(){
    var oIndexPage3=document.getElementById('index-page3');
    var aDiv=document.querySelectorAll('.div-wrap');
    var oRect=document.querySelectorAll('.dRect')[0];
    var aHuan=document.querySelectorAll('.huan');
    var arr=[];
    var H=common.getPos(oIndexPage3).top;
    var h1=oIndexPage3.offsetHeight;
    var aDivH=aDiv[0].offsetHeight;
    var aDivW=aDiv[0].offsetWidth;
    var W=document.documentElement.clientWidth||document.body.clientWidth;
    if(W<1000){
        W=1000;
    }
    for(var i=0; i<aDiv.length; i++){
      arr[i]={'top':aDiv[aDiv.length-1-i].offsetTop,'left':aDiv[aDiv.length-1-i].offsetLeft,'height':aDiv[aDiv.length-1-i].offsetHeight,'width':aDiv[aDiv.length-1-i].offsetWidth}
    }
    for(var i=0; i<aDiv.length; i++){
      aDiv[i].style.position='absolute';
      aDiv[i].style.left=arr[i].left+'px';
      aDiv[i].style.top=arr[i].top+'px';
    }
    var arr2=['front','back','up','down','left','right'];
    var arr3=['front2','back2','up2','down2','left2','right2'];
  function dRectAnimation(){
    var oS=document.documentElement.scrollTop||document.body.scrollTop;
    if(oS>H-h1/4&&oS<H+h1/4){
      aDiv[0].style.zIndex=2;
      oRect.style.width=360+'px';
      oRect.style.height=360+'px';
      oRect.style.margin='150px auto';
      for(var i=0; i<aDiv.length; i++){
        aDiv[i].classList.remove(arr3[i]);
        aDiv[i].style.left='50%';
        aDiv[i].style.top='50%';
        aDiv[i].style.height=360+'px';
        aDiv[i].style.width=360+'px';
        aDiv[i].style.marginTop=-180+'px';
        aDiv[i].style.marginLeft=-180+'px';
        aDiv[i].style.borderRadius='80px';
      }
      aDiv[0].addEventListener('transitionend',animation,false);
      oRect.style.animation='5s move linear infinite';
      oRect.style.transition='1s all ease';
      function animation(){
        for(var i=0; i<aDiv.length; i++){
          //aDiv[i].style.transition='none';
          aDiv[i].classList.add(arr2[i]);
        }
      }
      for(var i=0; i<aHuan.length; i++){
        aHuan[i].style.height=360+'px';
        aHuan[i].style.width=360+'px';
        aHuan[i].classList.add('roll_'+(i+1));
      }
    }
    if(oS<H-h1/4||oS>H+h1/4){
      oRect.style.animation='none';
      aDiv[0].removeEventListener('transitionend',animation,false);
      oRect.style.width=W+'px';
      oRect.style.height='630px';
      oRect.style.margin='0 auto';
      for(var i=0; i<aDiv.length; i++){
        aDiv[i].classList.remove(arr2[i]);
        aDiv[i].classList.add(arr3[i]);
        aDiv[i].style.transition='1s all ease';
        aDiv[i].style.left=arr[i].left+'px';
        aDiv[i].style.top=arr[i].top+'px';
        aDiv[i].style.height=aDivH+'px';
        aDiv[i].style.width='33%';
        aDiv[i].style.marginTop=0;
        aDiv[i].style.marginLeft=0;
      }
      for(var i=0; i<aHuan.length; i++){
        aHuan[i].style.height=0;
        aHuan[i].style.width=0;
        aHuan[i].classList.remove('roll_'+(i+1));
      }
    }
  }
    window.addEventListener('scroll',dRectAnimation,false);
    oIndexPage3.onclick=function(){
        oRect.style.animation='1s all ease';
        oRect.style.width=W+'px';
        oRect.style.height='630px';
        oRect.style.margin='0 auto';
        for(var i=0; i<aDiv.length; i++){
          aDiv[i].classList.remove(arr2[i]);
          aDiv[i].classList.add(arr3[i]);
          aDiv[i].style.transition='1s all ease';
          aDiv[i].style.left=arr[i].left+'px';
          aDiv[i].style.top=arr[i].top+'px';
          aDiv[i].style.height=aDivH+'px';
          aDiv[i].style.width='33%';
          aDiv[i].style.marginTop=0;
          aDiv[i].style.marginLeft=0;
        }
        for(var i=0; i<aHuan.length; i++){
          aHuan[i].style.height=0;
          aHuan[i].style.width=0;
          aHuan[i].classList.remove('roll_'+(i+1));
        }
    }
},false);
//lastpage
document.addEventListener('DOMContentLoaded',function(){
  var oFooter=document.getElementById('footer');
  var aLi=oFooter.querySelectorAll('li');
  var Top=oFooter.offsetTop;
  var arr=['slideInLeft','slideInUp','bounceInRight','rotateIn','fadeInUpBig','zoomInLeft'];
  var arr1=['zoomOutUp','hinge','slideOutRight','rotateOut','fadeOutUpBig','zoomOutLeft'];
  window.addEventListener('scroll',function(){
    var oS=document.documentElement.scrollTop||document.body.scrollTop;
    if(oS>Top-300){
        for(var i=0; i<aLi.length; i++){
          aLi[i].classList.add(arr[i]);
          aLi[i].style.display='block';
          aLi[i].classList.remove(arr1[i]);
        }
    }else{
      for(var i=0; i<aLi.length; i++) {
        aLi[i].classList.remove(arr[i]);
        aLi[i].classList.add(arr1[i]);
      }
    }
  },false)
},false);











