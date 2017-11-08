/**
 * Created by Administrator on 2016/9/27 0027.
 */
function $(arg){
    return new ZQuery(arg);
}
function ZQuery(arg){
    this.elements=[];
    switch(typeof arg){
        case 'function':
            domReady(arg);
            break;
        case 'string':
            if(arg.indexOf('>')!=-1){
                this.domString=arg;
            }else{
                this.elements=getEle(arg);
            }
            break;
        case 'object'://this  []
            if(arg instanceof Array){
                this.elements=this.elements.concat(arg);
            }else{
                this.elements.push(arg);
            }
            break;
    }
}
//DOM Ready onload
function domReady(fn){
    //FF chrome
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded',fn,false);
    }else{
        //IE
        document.attachEvent('onreadystatechange',function(){
            if(document.readyState=='complete'){
                fn();
            }
        });
    }
}

//选择器
function getByClass(oParent,sName){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sName);
    }else{
        var allTag=oParent.getElementsByTagName('*');
        var res=[];
        for(var i=0; i<allTag.length;i++){
            var reg=new RegExp('\\b'+sName+'\\b','g');
            if(reg.test(oParent[i])){
                res.push(allTag[i]);
            }
        }
        return res;
    }
}
function getByStr(aParent,str){
    var aChild=[];
    for(var i=0; i<aParent.length; i++){
        switch(str.charAt(0)){
            case '#':
                var obj=document.getElementById(str.substring(1));
                aChild.push(obj);
                break;
            case '.':
                var aRes=getByClass(aParent[i],str.substring(1));
                for(var j=0; j<aRes.length; j++){
                    aChild.push(aRes[j]);
                }
                break;
            default:
                if(/\w+\.\w+/g.test(str)){
                    var aStr=str.split('.');
                    var aRes=aParent[i].getElementsByTagName(aStr[0]);
                    var reg=new RegExp('\\b'+aStr[1]+'\\b','g');
                    for(var j=0; j<aRes.length; j++){
                        if(reg.test(aRes[j].className)){
                            console.log(reg.test(aRes[j].className));
                            aChild.push(aRes[j]);
                        }
                    }
                    // li:eq(2)	li:first
                }else if(/\w+\:\w+(\(\d+\))?/g.test(str)){
                    var aStr=str.split(/\:|\(|\)/g);
                    var n=aStr[2];
                    var aRes=aParent[i].getElementsByTagName(aStr[0]);
                    switch(aStr[1]){
                        case 'eq':
                            aChild.push(aRes[n]);
                            break;
                        case 'lt':
                            for(var j=0; j<n; j++){
                                aChild.push(aRes[j]);
                            }
                            break;
                        case 'gt':
                            for(var j=n; j<aRes.length; j++){
                                aChild.push(aRes[j]);
                            }
                            break;
                        case 'even':
                            for(var j=0; j<aRes.length; j+=2){
                                aChild.push(aRes[j]);
                            }
                            break;
                        case 'odd':
                            for(var j=1; j<aRes.length; j+=2){
                                aChild.push(aRes[j]);
                            }
                            break;
                        case 'first':
                            aChild.push(aRes[0]);
                            break;
                        case 'last':
                            aChild.push(aRes[aRes.length-1]);
                            break;
                    }
                }else if(/\w+\[\w+\=\w+\]/g.test(str)){
                    var aStr=str.split(/\[|\=|\]/g);
                    var aRes=aParent[i].getElementsByTagName(aStr[0]);
                    for(var j=0; j<aRes.length; j++){
                        if(aRes[j].getAttribute(aStr[1])==aStr[2]){
                            aChild.push(aRes[j]);
                        }
                    }
                }else{
                    var aRes=aParent[i].getElementsByTagName(str);
                    for(var j=0; j<aRes.length; j++){
                        aChild.push(aRes[j]);
                    }
                }
                break;
        }
    }
    return aChild;
}
function getEle(str,aParent){
    var arr=str.replace(/^\s+|\s+$/,'').split(/\s+/g);
    var aChild=[];
    var aParent=aParent||[document];
    for(var i=0; i<arr.length; i++){
        aChild=getByStr(aParent,arr[i]);
        aParent=aChild;
    }
    return aChild;
}
//获取非行间样式
function getStyle(obj,sName){
    return (obj.currentStyle || getComputedStyle(obj,false))[sName];
}
//css设置样式
ZQuery.prototype.css=function(name,value){
    if(arguments.length==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].style[name]=value;
        }
    }else{
        switch(typeof name){
            case 'string':
                return getStyle(this.elements[0],name);
            break;
            case 'object':
                var json=name;
                for(var i=0; i<this.elements.length; i++){
                    for(var name in json){
                        this.elements[i].style[name]=json[name];
                    }
                }
            break;
        }
    }
    return this;
};
//设置获取属性
ZQuery.prototype.attr=function(name,value){
    if(arguments.length==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].setAttribute(name,value);
        }
    }else{
        switch(typeof name){
            case 'string':
                this.elements[0].getAttribute(name);
                break;
            case 'object':
                var json=name;
                for(var i=0; i<this.elements.length; i++){
                    for(var name in json){
                        this.elements[i].setAttribute(name,json[name]);
                    }
                }
                break;
        }
    }
    return this;
};
//批量加事件
'mouseover mouseout click keydown keyup mousemove mousedown mouseup focus blur readystatechange contextmenu load scroll resize input propertychange change mousewheel'.replace(/\w+/g,function(sEv){
    ZQuery.prototype[sEv]=function(fn){
        for(var i=0; i<this.elements.length; i++){
            addEvent(this.elements[i],sEv,fn);
        }
    };
});
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,function(ev){
            var ev=ev||event;
            if(fn.apply(obj,arguments)==false){
                ev.cancelbubble=true;
                ev.preventDefault();
            };
        },false);
    }else{
        obj.attachEvent('on'+sEv,function(ev){
            var ev=ev||event;
            if(fn.apply(obj,arguments)==false){
                ev.cancelbubble=true;
                return false;
            };
        });
    }
};
//鼠标移入
ZQuery.prototype.mouseenter=function(fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i],'mouseover',function(ev){
            var ev=ev||event;
            var oFrom=ev.fromElement||ev.relatedTarget;
            if(this.contains(oFrom)){
                return;
            }
            fn&&fn.apply(this,arguments);
        });
    }
};
//鼠标移出
ZQuery.prototype.mouseleave=function(fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i],'mouseout',function(ev){
            var ev=ev||event;
            var oTo=ev.toElement||ev.relatedTarget;
            if(this.contains(oTo)){
                return;
            }
            fn&&fn.apply(this,arguments);
        });
    }
};
//事件委托
ZQuery.prototype.on=function(sEv,str,fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i],sEv,function(ev){
            var ev=ev||event;
            var oSrc=ev.target ||ev.srcElement;
            if(oSrc.tagName==str.toUpperCase()){
                fn&&fn.apply(oSrc,arguments);
            }
        });
    }
};
//事件绑定
ZQuery.prototype.bind=function(sEv,fn){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i],sEv,fn);
    }
};
//事件解除
ZQuery.prototype.unbind=function(sEv,fn){
    for(var i=0; i<this.elements.length; i++){
        removeEvent(this.elements[i],sEv,fn);
    }
};
ZQuery.prototype.off=function(sEv,fn){
    for(var i=0; i<this.elements.length; i++){
        removeEvent(this.elements[i],sEv,fn);
    }
};
function removeEvent(obj,sEv,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(sEv,fn,false);
    }else{
        obj.detachEvent('on'+sEv,fn);
    }
};

//toggle
ZQuery.prototype.toggle=function(){
    var args=arguments;
    var _this=this;
    for(var i=0; i<this.elements.length; i++){
        (function(count){
            addEvent(_this.elements[i],'click',function(){
                var fn=args[count%args.length];
                fn&&fn.apply(this,arguments);
                count++;
            });
        })(0);
    }
};
//DOM
ZQuery.prototype.appendTo=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('beforeEnd',this.domString);
    }
    return this;
};
ZQuery.prototype.insertBefore=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('beforeBegin',this.domString);
    }
    return this;
};
ZQuery.prototype.insertAfter=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('afertEnd',this.domString);
    }
    return this;
};
ZQuery.prototype.prependTo=function(str){
    var aParent=getEle(str);
    for(var i=0; i<aParent.length; i++){
        aParent[i].insertAdjacentHTML('afertBegin',this.domString);
    }
    return this;
};
ZQuery.prototype.remove=function(str){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].parentNode.removeChild(this.elements[i]);
    }
    return this;
};
//val
ZQuery.prototype.val=function(str){
    if(str||str==''){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].value=str;
        }
    }else{
        return this.elements[0].value;
    }
    return this;
};
//html
ZQuery.prototype.html=function(str){
    if(str||str==''){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].innerHTML=str;
        }
    }else{
        return this.elements[0].innerHTML;
    }
    return this;
};
//addClass
ZQuery.prototype.addClass=function(str){
    var reg=new RegExp('\\b'+str+'\\b','g');
    for(var i=0; i<this.elements.length; i++){
        if(this.elements[i].className){
            if(!reg.test(this.elements[i].className)){
                this.elements[i].className+=' '+str;
            }
        }else{
            this.elements[i].className=str;
        }
    }
    return this;
};
//removeClass
ZQuery.prototype.removeClass=function(str){
    var reg=new RegExp('\\b'+str+'\\b','g');
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].className=this.elements[i].className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ')
    }
    return this;
};
/*----------------------move----------------------------*/
ZQuery.prototype.animate=function(json,options){
    for(var i=0; i<this.elements.length; i++){
        move(this.elements[i],json,options);
    }
    return this;
};
//运动
//t  当前时间
//b  初始值
//c  现在位置
//d  总时间
//var cur=fx(t,b,c,d)
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};
function getStyle(obj,name){
    return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function move(obj,json,options){
    options = options||{};
    options.easing = options.easing||Tween.Elastic.easeOut;
    options.duration = options.duration||700;

    var start = {};
    var dis = {};

    //初始化
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        if(isNaN(start[name])){

            switch(name){
                case 'width':
                    start[name] = obj.offsetWidth;
                    break;
                case 'height':
                    start[name] = obj.offsetHeight;
                    break;
                case 'left':
                    start[name] = obj.offsetLeft;
                    break;
                case 'top':
                    start[name] = obj.offsetTop;
                    break;
                case 'opacity':
                    start[name] = 1;
                    break;
                case 'borderWidth':
                    start[name] = 0;
                    break;
            }
        }
        dis[name] = json[name] - start[name];
    }
    var count = Math.round(options.duration/16);
    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        n++;
        for(var name in json){
//t  当前时间
//b  初始值
//c  现在位置
//d  总时间
            var cur = options.easing(n*options.duration/count,start[name],dis[name],options.duration);
            if(name == 'opacity'){
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name] = cur+'px';
            }
        }
        if(n==count){
            clearInterval(obj.timer);
            options.complete&&options.complete();
        }
    },16);
}
/*------------------------ajax----------------------*/
ZQuery.ajax= $.ajax=function(json){
    ajax(json);
};
function json2url(json){
    json.t=Math.random();
    var arr=[];
    for(var name in json){
        arr.push(name+'='+encodeURIComponent(json[name]));
    }
    return arr.join('&');
}
//{url,deta{},type,success,error}
function ajax(json){
    if(!json.url){
        return;
    }
    json=json||{};
    json.data=json.data||{};
    json.type=json.type||'get';
    json.timeout=json.timeout||6000;
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHttp');
    }
    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET',json.url+'?'+json2url(json.data),true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST',json.url,true);
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }
    json.loading&&json.loading();
    var timer=setTimeout(function(){
        json.error&&json.error(oAjax.status);
        json.complete&&json.complete();
        oAjax.onreadystatechange=null;
    },json.timeout);

    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
                clearTimeout(timer);
                json.success&&json.success(oAjax.responseText);
                json.complete&&json.complete();
            }else{
                clearTimeout(timer);
                json.error&&json.error(oAjax.status);
                json.complete&&json.complete();
            }
        }
    };
}
/*------------------------jsonp----------------------*/
ZQuery.getScript= $.getScript=function(json){
    jsonp(json);
};
//url,data,cbName,success
function jsonp(options){
    options=options||{};
    if(!options.url){
        return;
    }
    options.data=options.data||{};
    options.cbName=options.cbName||'cb';
    options.timeout=options.timeout||8000;
    var timer=null;
    var fnName='jsonp_'+Math.random();
    fnName=fnName.replace('.','');
    window[fnName]=function(json){
        clearTimeout(timer);
        options.success&&options.success(json);
        document.head.removeChild(oS);
    }
    options.data[options.cbName]=fnName;
    var arr=[];
    for(var name in options.data){
        arr.push(name+'='+options.data[name]);
    }
    clearTimeout(timer);
    timer=setTimeout(function(){
        options.error&&options.error();
        window[fnName]=null;
        document.head.removeChild(oS);
    },options.timeout);
    var oS=document.createElement('script');
    oS.src=options.url+'?'+arr.join('&');
    document.head.appendChild(oS);
}
//get
ZQuery.prototype.get=function(n){
    return this.elements[n];
};
//eq
ZQuery.prototype.eq=function(n){
    return $(this.elements[n]);
};
//index
ZQuery.prototype.index=function(){
    var aChild=this.elements[0].parentNode.children;
    for(var j=0; j<aChild.length; j++){
        if(aChild[j]==this.elements[0]){
            return j;
        }
    }
    return -1;
};
//each
ZQuery.prototype.each=function(fn){
    for(var i=0; i<this.elements.length; i++){
        fn&&fn.call(this.elements[i],i,this.elements[i]);
    }
};
//插件
$.fn=$.prototype=ZQuery.prototype;
$.fn.extend=$.prototype.extend=ZQuery.prototype.extend=function(json){
    for(var name in json){
        ZQuery.prototype[name]=json[name];
    }
};
//find
ZQuery.prototype.find=function(str){
    var aParent=this.elements;
    var aChild=getEle(str,aParent);
    return $(aChild);
};
ZQuery.prototype.hide=function(){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style.display='none';
    }
};
ZQuery.prototype.show=function(){
    for(var i=0; i<this.elements.length; i++){
        this.elements[i].style.display='block';
    }
};
//获取两位数
$.fn.toDub=function(n){
    return n<10?'0'+n:''+n;
};
//获取随机数
$.fn.rand=function(n,m){
    return parseInt(Math.random()*(m-n)+n);
};
//鼠标滚轮事件
ZQuery.prototype.wheel=function(){
    var args=arguments;
    for(var i=0; i<this.elements.length; i++){
        addWheel(this.elements[i],fn);
    }
};

function addWheel(obj,fn){
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