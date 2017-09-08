$(function() {
	if($.cookie("rmbUser") == "true") {
		$("#rmbUser").attr("checked", true);
		$("#user").val($.cookie("userName"));
		$("#pass").val($.cookie("passWord"));
	}
	$('.login form').on('submit', function() {
			saveUserInfo();
			return false;
		})
		//保存用户信息 
	function saveUserInfo() {
		if($("#rmbUser")[0].checked) {/*记住密码的复选按钮状态*/
			var userName = $("#user").val();
			var passWord = $("#pass").val();
			$.cookie("rmbUser", "true", {
				expires: 7
			}); // 存储一个带7天期限的 cookie 
			$.cookie("userName", userName, {
				expires: 7
			}); // 存储一个带7天期限的 cookie 
			$.cookie("passWord", passWord, {
				expires: 7
			}); // 存储一个带7天期限的 cookie 
		} else {
			$.cookie("rmbUser", "false", {
				expires: -1
			});
			$.cookie("userName", '', {
				expires: -1
			});
			$.cookie("passWord", '', {
				expires: -1
			});
		}
	}
});