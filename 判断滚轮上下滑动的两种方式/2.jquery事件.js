$(document).on("DOMMouseScroll mousewheel keydown",function(e){
			e = e || window.event;
			var type=$.trim(e.type);
			/*判断事件类型*/
			if( type == "DOMMouseScroll" || type == "mousewheel"){
				if (e.originalEvent.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
					console.log("1  "+e.originalEvent.wheelDelta);
				    if (e.originalEvent.wheelDelta > 0) { //当滑轮向上滚动时  
				        console.log("滑轮向上滚动");  
				    }  
				    if (e.originalEvent.wheelDelta < 0) { //当滑轮向下滚动时  
				    	console.log("滑轮向下滚动");  
				    }  
				} else if (e.originalEvent.detail) {  //Firefox滑轮事件  
					console.log("2  "+(-e.originalEvent.detail));
				    if (-e.originalEvent.detail> 0) { //当滑轮向上滚动时  
				        console.log("滑轮向上滚动");  
				    }  
				    if (-e.originalEvent.detail< 0) { //当滑轮向下滚动时  
				        console.log("滑轮向下滚动");  
				    }  
				} 
			}else if(type == "keydown"){
				console.log("按键事件："+type);				
			}
			
		})