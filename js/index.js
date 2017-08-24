var data = [
	'img/load/logo2.png',
	'img/load/logo3.png',
	'img/load/logo4.png',
	'img/load/loadIco1.png',
	'img/load/loadIco2.png',
	'img/load/loadIco3.png',
	'img/load/loadIco4.png',
	'img/load/loadIco5.png',
	'img/load/loadIco6.png',
	'img/load/loadIco7.png',
	'img/load/loadIco8.png',
	'img/load/loadIco9.png',
	'img/bg/1.png',
	'img/bg/2.png',
	'img/bg/3.png',
	'img/bg/4.png',
	'img/bg/5.png',
	'img/bg/6.png',
	'img/bg/7.png',
	'img/bg/8.png',
	'img/bg/9.png',
	'img/bg/10.png',
	'img/bg/11.png',
	'img/bg/12.png',
	'img/bg/13.png',
	'img/bg/14.png',
	'img/bg/15.png',
	'img/bg/16.png',
	'img/bg/17.png',
	'img/bg/18.png',
	'img/bg/19.png',
	'img/bg/20.png',
    'img/bg/bg.jpg',
    'img/music.png',
    'img/music_pause.png'
];
var dataPieces = [
	'img/load/loadIco1.png',
	'img/load/loadIco2.png',
	'img/load/loadIco3.png',
	'img/load/loadIco4.png',
	'img/load/loadIco5.png',
	'img/load/loadIco6.png',
	'img/load/loadIco7.png',
	'img/load/loadIco8.png',
	'img/load/loadIco9.png'
]


var dataBg = [
    'img/bg/1.png',
    'img/bg/2.png',
    'img/bg/3.png',
    'img/bg/4.png',
    'img/bg/5.png',
    'img/bg/6.png',
    'img/bg/7.png',
    'img/bg/8.png',
    'img/bg/9.png',
    'img/bg/10.png',
    'img/bg/11.png',
    'img/bg/12.png',
    'img/bg/13.png',
    'img/bg/14.png',
    'img/bg/15.png',
    'img/bg/16.png',
    'img/bg/17.png',
    'img/bg/18.png',
    'img/bg/19.png',
    'img/bg/20.png'
];
dataBg.reverse();


//阻止默认事件
document.addEventListener('touchstart', function(e){
    e.preventDefault();
});
document.addEventListener('touchmove', function(e){
    e.preventDefault();
});


cylinder();

var loadedNum = 0;
var perElem = document.querySelector('.logo1 .per');
for(var i = 0; i < data.length ; i++){
	var img = new Image();
	img.src = data[i];
	img.onload = function(){
		loadedNum++;
		perElem.innerHTML = Math.round(loadedNum/data.length*100);
		if(loadedNum === data.length){
			hideLogo1();
		}
	}
}

//绘制圆柱
function cylinder(){
    var mainWrap = document.querySelector('.main');
    var halfW = 64.5;
    var deg = Math.round(360/dataBg.length);

    var sHtml = '';
    for(var i = 0; i < dataBg.length; i++){
        sHtml += '<span style="background-image:url('+dataBg[i]+')"></span>';
    }
    mainWrap.innerHTML = sHtml;
    var span = mainWrap.children;
    for(var i = 0; i < span.length;i++){
        var R = Math.abs(Math.round(halfW*Math.tan((180 - deg)/360*Math.PI)));
        css(span[i], 'rotateY', i*deg);
        css(span[i], 'translateZ', -R);
        css(span[i], 'opacity', 0);
    }
    //控制圆柱距离视点的距离
    css(mainWrap, 'translateZ', -5000);
    //控制圆柱固定时间内所需旋转的角度
    css(mainWrap, 'rotateY', -1000);
    for(var i = 0; i < span.length;i++){
        movejs(span[i], { opacity: 100 }, 1000, 'easeOut');
    }
    movejs(mainWrap, { translateZ:-200,rotateY:0}, 3000, 'easeOut'
        , function(){
        setTimeout(function(){
            document.body.style.backgroundImage = 'url(img/bg/bg.jpg)';

            var startX = 0;
            var startY = 0;
            var startdegY = css(mainWrap, 'rotateY');
            var startdegX = css(mainWrap, 'rotateX');
            document.body.addEventListener('touchstart', function(e){
                startX = e.changedTouches[0].pageX;
                startY = e.changedTouches[0].pageY;
                startdegY = css(mainWrap, 'rotateY');
                startdegX = css(mainWrap, 'rotateX');
                movejs(mainWrap, {translateZ: -250}, 100, 'linear');
                window.removeEventListener("devicemotion", devicemotion);

                e.stopPropagation();
                e.preventDefault();
            });
            var dir = null;
            document.body.addEventListener('touchmove', function(e){
                var nowX = e.changedTouches[0].pageX;
                // var nowY = e.changedTouches[0].pageY;
                var disX = nowX - startX;
                // var disY = nowY - startY;
                // var rotY = disY-startdegX/5;
                // if( rotY > 20 ){
                //     rotY = 20;
                // }
                // if( rotY < -20 ){
                //     rotY = -20;
                // }

                // if(dir === null && Math.abs(disX) > 5){
                //     dir = 'x';
                // }else if(dir === null && Math.abs(disY) > 5){
                //     dir = 'y';
                // }
                // console.log(dir);
                // if(dir === 'x'){
                    css(mainWrap, 'rotateY', startdegY-disX/5);
                // }
                // if(dir === 'y'){
                //     css(mainWrap, 'rotateX', rotY);
                // }

                e.stopPropagation();
                e.preventDefault();
            });
            document.body.addEventListener('touchend', function(e){
                movejs(mainWrap, {translateZ: -200}, 100, 'linear');
                dir = null;
                window.addEventListener("devicemotion", devicemotion);
            });
            //陀螺仪
            var tX = 0;
            window.addEventListener("devicemotion", devicemotion);
            function devicemotion(e){
                try{
                    tX = css(mainWrap, 'rotateY');
                    var motion = e.accelerationIncludingGravity;
                    var x = Number((motion.x).toFixed(0));
                    x = getIos()?x:-x;
                    var y = Number((motion.y).toFixed(0));
                    y = getIos()?y:-y;
                    tX += x;
                    css(mainWrap, 'rotateY', tX);
                }catch(e){

                }
            }
        },30);}
    );
}

function getIos(){
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

