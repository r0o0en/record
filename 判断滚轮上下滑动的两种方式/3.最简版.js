$(document).on("DOMMouseScroll mousewheel keydown",function(e){
			e = e || window.event;
			var type=$.trim(e.type);
			/*判断事件类型*/
			if( type == "DOMMouseScroll" || type == "mousewheel"){
				var mvmt = e.originalEvent.wheelDelta;/* ie chrome 120/-120*/
				if(!mvmt){/*opera firefox -3/3*/
					mvmt = -e.originalEvent.detail; 
				}
				
			}else if(type == "keydown"){
				console.log("按键事件："+type);				
			}
			
		})