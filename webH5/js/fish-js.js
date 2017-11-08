/**
 * Created by Administrator on 2016/11/2.
 */
function FishLoad(){
    var oC=document.getElementById('fish');
    var gd=oC.getContext('2d');
    var oImg=new Image();
    var W=document.documentElement.clientWidth;
    if(W<1000){
        W=1000;
    }
    var H=600;
    oC.width=W;
    oC.height=H;
    var out=50;
    var direction=[out,-out];
    var rule=0.05;
    var cnType=5;
    loadImage(resource,function(){
        var arrBullet=[];
        var arrFish=[];
        var arrCoin=[];
        var arrDieFish=[];
        var arrWeb=[];
        var cn=new Cannon(cnType);
        cn.x=W/2-765/2+431;
        cn.y=570;
        cn.rotate=0;
        setInterval(function(){
            gd.clearRect(0,0,oC.width,oC.height);
            gd.drawImage(json['bottom'],
                0,0,765,70,
                W/2-765/2,532,765,70
            );
            for(var i=0; i<arrBullet.length; i++){
                arrBullet[i].draw(gd);
            }
            cn.draw(gd);

            for(var i=0; i<arrBullet.length; i++){
                if(arrBullet[i].x<-out||arrBullet[i].x>oC.width+out||arrBullet[i].y<out||arrBullet[i].y>oC.height+out){
                    arrBullet.splice(i,1);
                    i--;
                }
            }
            if(Math.random()<rule){
                direction.sort(function(){
                    return Math.random()-0.5;
                });
                if(direction[0]<0){
                    var fis=new Fish(rnd(1,6));
                    fis.x=-out;
                    fis.y=rnd(0,oC.height-out);
                    fis.rotate=rnd(-45,45);
                    arrFish.push(fis);
                }else{
                    var fis=new Fish(rnd(1,6));
                    fis.x=oC.width+out;
                    fis.y=rnd(0,oC.height-out);
                    fis.rotate=rnd(135,225);
                    arrFish.push(fis);
                }
            }
            for(var i=0; i<arrFish.length; i++){
                arrFish[i].draw(gd);
            }
            for(var i=0; i<arrFish.length; i++){
                if(arrFish[i].x<-out||arrFish[i].x>oC.width+out||arrFish[i].y<out||arrFish[i].y>oC.height+out){
                    arrFish.splice(i,1);
                    i--;
                }
            }
            //判断鱼与爆弹 鱼死炮弹毁
            for(var i=0; i<arrFish.length; i++){
                for(var j=0; j<arrBullet.length; j++){
                    if(!arrFish[i]){
                        return;
                    }
                    if(arrFish[i].isIn(arrBullet[j].x,arrBullet[j].y)){
                        var x=arrFish[i].x;
                        var y=arrFish[i].y;
                        var type=arrFish[i].type;
                        var rotate=this.rotate;
                        arrFish.splice(i,1);
                        i--;
                        arrBullet.splice(j,1);
                        j--;
                        //生成金币
                        var coin=new Coin(type);
                        coin.x=x;
                        coin.y=y;
                        coin.playSong();
                        arrCoin.push(coin);
                        //生成网
                        var web=new Web(cn.type);
                        web.x=x;
                        web.y=y;
                        arrWeb.push(web);
                        //生成死鱼
                        var dieFis=new DieFish(type);
                        dieFis.x=x;
                        dieFis.y=y;
                        dieFis.rotate=rotate;
                        arrDieFish.push(dieFis);
                        setTimeout(function(){
                            arrDieFish.shift();
                        },500);
                    };
                }
            }
            //画死鱼
            for(var i=0; i<arrDieFish.length; i++){
                arrDieFish[i].draw(gd);
            }
            //画网
            for(var i=0; i<arrWeb.length; i++){
                arrWeb[i].draw(gd);
                arrWeb[i].scale+=0.01;
                if(arrWeb[i].scale>1.2){
                    arrWeb.splice(i,1);
                }
            }
            //画金币
            for(var i=0; i<arrCoin.length; i++){
                arrCoin[i].draw(gd);
            }
            //画数
            var str=arrCoin.length+'';
            for(var i=0; i<str.length; i++){
                gd.drawImage(json['coinText'],
                    36*str[str.length-1-i],0,36,49,
                    W/2-765/2+290-40*i,532,36,49
                );
            }
        },30);
        oC.addEventListener('click',function(ev){
            var x=ev.clientX-oC.offsetLeft;
            var y=ev.clientY-oC.offsetTop;
            if(x>W/2-765/2+350&&x<W/2-765/2+385&&y>570&&y<600){
                cn.type++;
                if(cn.type==8){
                    cn.type=7;
                }
            }
            if(x>W/2-765/2+490&&x<W/2-765/2+525&&y>570&&y<600){
                cn.type--;
                if(cn.type==0){
                    cn.type=1;
                }
            }
            var oA=new Audio();
            oA.src='img/snd/cannon.mp3';
            oA.play();
            var a=ev.clientX-oC.offsetLeft-cn.x;
            var b=cn.y-(ev.clientY-oC.offsetTop);
            var d=90-a2d(Math.atan2(b,a));
            cn.emitChange();
            cn.rotate=d;
            var bu=new Bullet(cn.type);
            bu.x= W/2-765/2+431;
            bu.y=570;
            bu.rotate=cn.rotate;
            arrBullet.push(bu);
        },false);
    });
}
document.addEventListener('DOMContentLoaded',FishLoad,false);
window.addEventListener('resize',function(){
    var oC=document.getElementById('fish');
    var W=document.documentElement.clientWidth;
    if(W<1000){
        W=1000;
    }
    oC.width=W;
},false);