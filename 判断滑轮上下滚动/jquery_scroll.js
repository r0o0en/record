// JavaScript Document
/*引用：http://www.internetke.com/effects/layer/2014/1202/960.html
 * 吐槽：写的真乱,还得自己改
 * */
(function ($) {
	var wp=$('.num_box'),
		wp_li=wp.children('.num'),
		nav=$('.fixed_r ul'),
		nav_li=nav.children('li'),
		inp1=$('.ddw'),
		inp2=$('.ddw2'),
		onclass="on";
	inp1.val(0);
	inp2.val(0);
	alertScroll(0,1);
	/*dot导航的个数*/
	if( nav_li.length > wp_li.length){
		nav_li.eq(wp_li.length-1).nextAll().remove();	
	}else if( nav_li.length < wp_li.length){
		for (var f = 1 ;f<=wp_li.length-nav_li.length;f++ ) {
			nav.append('<li>'+(nav_li.length+f)+'</li>');
		}
		nav_li=nav.children('li');
	}
	/*全屏*/
	quanp();
	$(window).resize(function() {
		if(typeof indexSlides != 'undefined' && indexSlides.reformat)
			indexSlides.reformat();
		quanp();
	});
	/*滑轮上（1）下(-1)滚动事件*/
	$(function() {
		wp.mousewheel(function(event, delta) {
			/* delta(上滚:1，下滚:-1)*/
			var aaaa = inp2.val();
			if(aaaa == 1) {
				return;
			}
			qpgd(delta);
		});
	});
	/*滑轮上下滚动方法*/
	function qpgd(a) {
		var z = inp1.val();
		b = parseInt(z);
		c = wp_li.length;
		/*判断将滚动的目标元素是否存在*/
		if(a < 0) {/*下滚*/
			if(b == c - 1) {
				return; /*跳出qpgd(a)函数*/
			}
			b += 1;
			alertScroll(b);
		} else if(a > 0) {/*上滚*/
			if(b == 0) {
				return;/*跳出qpgd(a)函数*/
			}
			b -= 1;
			alertScroll(b);
		}
		
	}
	/* 悬浮dot导航click事件 */
	nav_li.click(function() {
		if(!wp.is(':animated')){
			var b = $(this).index();
			alertScroll(b);
		}
	})
	/*触摸*/
	var yd=0,tp=0,jl=0,go=0;
	var fun={
		start:function(o){
			wp.attr({
				'data-start':$(document).scrollTop(),
				'data-anime':"ok"
				});
			go=parseInt( inp1.val() );
			console.log('开始');
		},
		move:function(o){
			yd=o.y-o.y2;
			console.log('移动 : '+ yd);
			jl= ( yd>=0 ? yd : -yd);
			tp=parseFloat(wp.attr('data-start'))+yd;
			if(tp>=0 && tp <= wp_li.length*wp_li.outerHeight()){
//				$(document).scrollTop(tp);
				$('body,html').stop().animate({scrollTop: tp+'px'},0);
				if(jl>=100){
					go = go + (yd>=0 ? 1:-1) ; 
					wp.trigger('touchend');
				}
			}
		},
		end:function(o){
			console.log('结束');
			if(wp.attr('data-anime')=='ok'){
				wp.attr({'data-anime':"no"});
				alertScroll(go);
			}
		}
	}
//	touchEvent(wp,fun);
	
	/*移动wp坐标动画*/
	function alertScroll(i,Time){
		inp2.val(1);
		var single_hh = $(window).height();
		var time= ( arguments.length > 1 ? parseInt(Time) : 1000 );
		click_hh = single_hh * i;
		wp_li.removeClass(onclass);
		nav_li.eq(i).addClass(onclass).siblings('li').removeClass(onclass);
		$('body,html').stop().animate({
			scrollTop: click_hh+'px'
		},time,function(){
			wp_li.eq(i).addClass(onclass);
			inp1.val(i);
			inp2.val(0);
		});
	}
	
	function quanp() {
		var single_hh = $(window).height();
		var single_ww = $(window).width();
		wp_li.height(single_hh);
		$('.num li').width(single_ww);
	}
	
	function touchEvent(wp,fun){
		var initial={
			start:function(x){},
			move:function(x){},
			end:function(x){}
		}
		var o =$.extend({}, initial, fun);
		var x,y,startX,startY,moveEndX,moveEndY;
		wp.on("touchstart", function(e) {
		    startX = e.originalEvent.changedTouches[0].pageX;
		    startY = e.originalEvent.changedTouches[0].pageY;
		    o.start({x:startX,y:startY});
		    wp.on("touchmove",movefun);
		});


		wp.on("touchend", function(e) {
			wp.off('touchmove',movefun);
		    o.end({x:startX,y:startY,x2:moveEndX,y2:moveEndY});
		});
		function movefun(ee) {
			ee.preventDefault();
			moveEndX = ee.originalEvent.changedTouches[0].pageX;
			moveEndY = ee.originalEvent.changedTouches[0].pageY;
			X = moveEndX - startX;
			Y = moveEndY - startY;
			o.move({x:startX,y:startY,x2:moveEndX,y2:moveEndY});
		}
	}

})(jQuery)