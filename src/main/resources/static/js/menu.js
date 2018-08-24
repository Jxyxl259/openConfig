$(function(){

    document.getElementById("login_username").innerHTML=GetQueryString("login_username")+'<i class="Hui-iconfont">&#xe6d5;</i>';

    var menuArr = [];

    $.ajax({
        url:"/resource/menu",
        type:"GET",
        data:{},
        async:false,
        success:function(resultMsg){
            if(resultMsg.success){
                menuArr = resultMsg.data;
			}else{
                layer.msg(result.message, {time: 2000, icon:5});
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
        }
    });


	var snsObj = {
		init:function(){
			this.menuFn();
			this.clickFn();
		},
		menuFn:function(){
			if(menuArr.length !=0){
				for (var i = 0 ; i < menuArr.length;i++) {
			         var firDd =
						 '<dl id="menu_'+ menuArr[i].id+'">'+
			             	'<dt><i class="Hui-iconfont">&#xe613;</i> '+menuArr[i].menuName+'<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>' +
						 	'<dd><ul fmenu='+menuArr[i].menuName+'></ul></dd>' +
						 '</dl>';
						$(".menu_dropdown").append(firDd);
				        for (var j = 0; j < menuArr[i].childs.length; j++) {
				        	 var lis =
								 '<li>' +
								 	'<a data-href='+menuArr[i].childs[j].href+' data-title="'+menuArr[i].childs[j].menuName+'" href="javascript:void(0)">'+menuArr[i].childs[j].menuName+'</a>' +
								 '</li>';
				            $(".menu_dropdown").find("dl").eq(i).find("ul").append(lis);
				        }   
				}
			}	
		},
		clickFn:function(){
			$(".menu_dropdown ul li").on("click","a",function(){
                var that = $(this);
                var menuTitle = that.attr("data-title");         // 获取二级菜单标题
                var pId = that.parent().parent().attr('fmenu');  // 获取一级菜单标题
					that.parent().addClass("menu_li");
					that.parent().siblings().removeClass("menu_li"); 
					snsObj.navTopFn(pId,menuTitle);
				var navStr = '<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> '+pId+' <span class="c-gray en">&gt;</span> '+menuTitle+' </nav>'
					$(".Hui_nav").empty().append(navStr);
		    })
			
		},
		navTopFn:function(a,b){
//			console.log(a,b)
			var navT = '<span class="c-gray en">&gt;</span>'+a+' <span class="c-gray en">&gt;</span>'+b;
			$(".breadcrumb").append(navT);
            $(".breadcrumb").html("sss")
		}
	};
	snsObj.init();
    
	
	
});


/** 获取挂在URL后面的参数 */
var GetQueryString = function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null)
        return unescape(r[2]);
    return null;
};