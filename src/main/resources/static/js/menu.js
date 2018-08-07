$(function(){
	var menuArr = [
	{"id":1,"firstMenu":"平台管理","pic":"&#xe616;",
	"child": [
		{ "id": "1","secMenu": "合作伙伴管理","href":"html/platform/partner.html"},
		{ "id": "2","secMenu": "产品管理","href":"html/platform/product.html" },
		{ "id": "3","secMenu": "第三方用户管理","href":"html/platform/thirdUser.html" }
		]
	},
	{"id":2,"firstMenu":"系统管理","pic":"&#xe613;",
	"child": [
		{ "id": "1","secMenu": "用户管理","href":"snsHtml/systemHtml/user-list.html" },
		{ "id": "2","secMenu": "角色管理","href":"snsHtml/systemHtml/role-list.html" },
		{ "id": "3","secMenu": "资源管理","href":"snsHtml/systemHtml/resource-list.html"}
	 	]
	}];
	
	var snsObj = {
		init:function(){
			this.menuFn();
			this.clickFn();
		},
		menuFn:function(){
			if(menuArr.length !=0){
				for (var i = 0 ; i < menuArr.length;i++) {
			         var firDd = '<dl id="menu_'+ menuArr[i].id+'">'
			            +'<dt><i class="Hui-iconfont">'+menuArr[i].pic+'</i> '+menuArr[i].firstMenu+'<i class="Hui-iconfont menu_dropdown-arrow">&#xe6d5;</i></dt>'
						+'<dd><ul fmenu='+menuArr[i].firstMenu+'></ul></dd></dl>';
						$(".menu_dropdown").append(firDd);
				        for (var j = 0; j < menuArr[i].child.length; j++) {
				        	 var lis = '<li><a data-href='+menuArr[i].child[j].href+' data-title="'+menuArr[i].child[j].secMenu+'" href="javascript:void(0)">'+menuArr[i].child[j].secMenu+'</a></li>'
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
	}
	snsObj.init();
    
	
	
})
