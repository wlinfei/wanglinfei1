/**
 * Created by Administrator on 2016/9/9 0009.
 */
var common={};

//��ȡ���м���ʽ
common.getStyle=function(obj,sName){
    return (obj.currentStyle || getComputedStyle(obj,false))[sName];
};

//�������
common.findInArr=function(n,arr){
    for(var i=0; i<arr.length; i++){
        if(n==arr[i]){
            return true;
        }
    }
    return false;
};

//ͨ��className��ȡԪ��
common.getByClass=function(parent,name){
    var aAllTag=parent.getElementsByTagName('*');
    var sEl=[];

    for(var i=0; i<aAllTag.length; i++){
        var arr=aAllTag[i].splice(' ');
        if(common.findInArr(name,arr)){
            sEl.push(aAllTag[i]);
        }
    }
    return sEl;
};

//��ȡ��λ��
common.toDub=function(n){
    return n<10?'0'+n:''+n;
};

//��ȡ�����
common.rnd=function(n,m){
    return parseInt(Math.random()*(m-n)+n);
};

//��ȡ��λ����
common.getPos=function(obj){
    var l=0;
    var t=0;
    while(obj){
        l=l+obj.offsetLeft;
        t=t+obj.offsetTop;
        obj=obj.offsetParent;
    }
    return {'left':l,'top':t};
};

//�¼��󶨵ķ�װ
common.addEvent=function(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }
};
//����¼���
common.removeEvent=function(obj,sEv,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(sEv,fn,false);
    }else{
        obj.detachEvent('on'+sEv,fn);
    }
};

//�������¼�
common.addWheel=function(obj,fn){
    if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        obj.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        obj.onmousewheel=wheel;
    }

    function wheel(ev){
        var Event=ev || event;
        var bDown=true;

        if(Event.wheelDelta){
            if(Event.wheelDelta>0){
                bDown=false;
            }else{
                bDown=true;
            }
        }else{
            if(Event.detail>0){
                bDown=true;
            }else{
                bDown=false;
            }
        }
        fn(bDown);
    }
};

//move�˶�������
common.move=function(obj,json,options){
    var options=options || {};
    var dis={};
    var start={};
    var easing=options.easing || 'linear';
    var duration=options.duration || 1000;

    for(name in json){
        start[name]=parseFloat(common.getStyle(obj,name));
        dis[name]=json[name]-start[name];
    }
    var count=Math.floor(duration/30);
    var n=0;

    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        n++;
        for(name in json){
            switch(easing){
                case 'linear':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a;
                    break;
                case 'ease-in':
                    var a=n/count;
                    var cur=start[name]+dis[name]*a*a*a;
                    break;
                case 'ease-out':
                    var a=1-n/count;
                    var cur=start[name]+dis[name]*(1-a*a*a);
                    break;
            }
            if(name=='opacity'){
                obj.style.opacity=cur;
            }else{
                obj.style[name]=cur+'px';
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30)

};

function d2a(n){
    return n*Math.PI/180;
}
var mLeft = 0;
function Move(obj,target){
    var iSpeed = 0;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        iSpeed+=(target-obj.offsetLeft)/5;
        iSpeed*=0.7;
        mLeft += iSpeed;
        obj.style.left = Math.round(mLeft) +'px';
        if(Math.round(mLeft)==target&&Math.round(iSpeed)==0){
            clearInterval(obj.timer);
        }
    },16);
}












