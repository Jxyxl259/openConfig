
var data;

/** 加载列表数据 */
function loadList(pageSize, pageNum){
    $("#currentPageNo").val(pageNum);
    conditionQuery("/user/list");

}

/** 列表条件搜索 */
$('#selectInfo').on( 'click', function () {
    conditionQuery("/user/list");
});


var columsName = {
	"selectAll":"<input type='checkbox' name='checkAll' value='' onclick='checkAll(this)'>",
	"number":"编号",
	"userId": "用户ID",
	"userCode":"用户代码",
	"userCname":"简体中文名称",
	"mobile": "手机号码",
	"email": "邮箱",
	"validFlag": "有效性",
	"flag": "账号状态",
/*	"password": "密码",*/
	"passwordExpireDate": "密码过期时间",
	"remark": "备注",
	"extn": "操作"
};

var columns = [
	{"data": "userId", "title": columsName["selectAll"],"width":"3%"},
	{"data": "userId", "title": columsName["number"],"width":"3%"},
	{"data": "userId", "title": columsName["userId"],"width":"15%"},
	{"data": "userCode", "title": columsName["userCode"],"width":"8%"},
	{"data": "userCname", "title": columsName["userCname"],"width":"8%"},
	{"data": "mobile", "title": columsName["mobile"],"width":"10%"},
	{"data": "email", "title": columsName["email"],"width":"12%"},
	{"data": "validFlag", "title": columsName["validFlag"],"width":"5%"},
	{"data": "flag", "title": columsName["flag"],"width":"6%"},
/*	{"data": "password", "title": columsName["password"],"width":"10%"},*/
	{"data": "passwordExpireDate", "title": columsName["passwordExpireDate"],"width":"15%"},
	{"data": "userId", "title": columsName["extn"]},
	
	{"data": "remark", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "validFlag", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "createdDate", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "createdBy", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "updatedDate", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "updatedBy", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "userId", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "passwordSetDate", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "userEname", "title": columsName["ceshi"],"sClass":"hidden"},
	{"data": "password", "title": columsName["ceshi"],"sClass":"hidden"}
	
];

	
var commonObj = {
    init:function(){
        this.tabInit();      //table 初始化
        this.editTab();  //模态框弹出编辑
        this.deleteTab();    //删除当前行
        this.deleteAll();    //批量删除
        this.detailTab();    //详情展示
    },
    //表格初始化
	tabInit:function(tabId){
		if(tabId !=undefined){
			$("#tableId").DataTable({	
			    bFilter: false,
			    bSort:false,
			    paging:false,   
			    columns:columns,
				aoColumnDefs: [
	               { "bSortable": false, "aTargets": [] },
	               { "visible": false},
	               {"aTargets":[2],"mRender":function(data,type,full){
	                   return " <a href='javascript:;' title='分配角色'  onclick='setUserRole(\""+data+"\",this)' ><font  style='color:blue;'>"+data+"</font></a>";
	               }}
				],
				data:data,
				dom: '<"H"rfl > t <"F"ip >',
	            destroy: true,                                   //因为需要多次初始化，所以需要设置允许销毁实例
			    oLanguage: {
					"sLengthMenu": "每页显示 _MENU_ 条记录",
					"sZeroRecords": "对不起，查询不到任何相关数据",
					"sInfo": "当前显示 _START_ 到 _END_ 条，共  _TOTAL_ 条记录",
					"sInfoEmtpy": "找不到相关数据",
					"sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
					"sProcessing": "正在加载中...",
					"sSearch": "搜索"
			    },
			    fnDrawCallback: function(tid){
			    	this.api().column(0).nodes().each(function(cell, i){
			    		cell.innerHTML='<input type="checkbox" name="dataCheckBox" value="">';
					});
					this.api().column(1).nodes().each(function(cell, i){
						var tid = cell.textContent;
						$(cell).parent().attr('tid',tid);
						cell.innerHTML =  i + 1;
					});
					this.api().column(7).nodes().each(function(cell, i){
						var flag = cell.textContent;
						if(flag == "0"){
							cell.innerHTML =  "<font color='red' size='3'>x</font>";
						}else if(flag == "1"){
							cell.innerHTML =  "<font size='3'>√</font>";
						}else{
							cell.innerHTML =  "<font size='3'></font>";
						}
						
					});
					this.api().column(8).nodes().each(function(cell, i){
						var flag = cell.textContent;
						if(flag == "0"){
							cell.innerHTML =  "<font color='red' size='3'>x</font>";
						}else if(flag == "1"){
							cell.innerHTML =  "<font size='3'>√</font>";
						}else{
							cell.innerHTML =  "<font size='3'></font>";
						}
						
					});
					this.api().column(10).nodes().each(function(cell, i){
						var id = cell.textContent;
						cell.innerHTML ='<button class="edi_btn uEditBtn" id='+id+'>编辑</button><button class="edi_btn uDetailBtn">详情</button><button class="edi_btn uDeleteBtn"><i class="Hui-iconfont">&#xe6e2;</i></button>';
					})
			    }
			});
		}
	},
    editTab:function(){
    	$("#tableId").on("click",".uEditBtn",function(){
    		document.getElementById("modifyForm").reset(); 
    		//编辑
    		var s = $(this).parent().parent().find("td");
    		var formObj = $("#modifyForm");
    		formObj.find("input[name='userId']").val($(this).attr("id"));
    		formObj.find("input[name='userCode']").val(s.eq(3).text());
    		formObj.find("input[name='userCname']").val(s.eq(4).text());
    		formObj.find("input[name='userEname']").val(s.eq(19).text());
    		formObj.find("input[name='password']").val(s.eq(20).text());
    		formObj.find("input[name='passwordSetDate']").val(s.eq(18).text());
    		formObj.find("input[name='passwordExpireDate']").val(s.eq(9).text());
    		formObj.find("input[name='mobile']").val(s.eq(5).text());
    		formObj.find("input[name='email']").val(s.eq(6).text());
    		formObj.find("textarea[name='remark']").val(s.eq(11).text());
    		var flag = $.trim(s.eq(12).text());
    		if(flag == "1"){
    			formObj.find("input[name='validFlag'][value='1']").prop("checked",true);
    		}else{
    			formObj.find("input[name='validFlag'][value='0']").prop("checked",true);
    		}
    		
    		(function(){
    			layer.open({
                    type :1,
                    title: ['修改用户信息'],
                    area : [ '600px', '370px' ],
                    content : $("#modifyInfoWindow") ,
                    btn:["修改"],
                    yes : function(index, dom){
                        var data = new FormData(document.getElementById("modifyForm"));
                        var s = /^((?!<script>).)*$/;
                        if(
                                $.trim(data.get("userCode"))==""||
                                $.trim(data.get("userCname"))==""||
                                $.trim(data.get("password"))==""||
                                $.trim(data.get("passwordSetDate"))==""||
                                $.trim(data.get("passwordExpireDate"))==""||
                                $.trim(data.get("mobile"))==""||
                                $.trim(data.get("email"))==""
                        ){
                                layer.alert('请完善添加信息之后提交');
                                return ;
                        }else if(!s.test($.trim(data.get("userCode")))){
                                layer.alert("您输入的合作方名称含有非法字符，请重新录入");
                                return;
                       }

                        $.ajax({
                            url:"/user/update",
                            async:false,
                            type:"POST",
                            data:data,
                            processData:false,
                            contentType:false,
                            success:function(result){                        
                            	if(result.success){
                            		loadList(itemNumPerPage, parseInt($.trim($("#currentPageNo").val())));
                            		layer.close(index);
                            		layer.msg(result.message, {time: 3000, icon:6});	
                            	}else{
                            		layer.alert(result.message)
                            	}
                            },
                            error:function(XMLHttpRequest, textStatus, errorThrown){
                            	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
                            }
                        });
                    }
                });
    			
    		})();
    		
      	});
    },
  //当前行内容详情
    detailTab:function(){
        $(".table").on("click",".uDetailBtn",function(){
    		//编辑
    		var s = $(this).parent().parent().find("td");
    		var formObj = $("#detailForm");
    		formObj.find("p[role='userId']").text(s.eq(17).text());
    		formObj.find("p[role='userCode']").text(s.eq(3).text());
    		formObj.find("p[role='userCname']").text(s.eq(4).text());
    		formObj.find("p[role='userEname']").text(s.eq(19).text());
    		formObj.find("p[role='password']").text(s.eq(20).text());
    		formObj.find("p[role='passwordSetDate']").text(s.eq(18).text());
    		formObj.find("p[role='passwordExpireDate']").text(s.eq(9).text());
    		formObj.find("p[role='mobile']").text(s.eq(5).text());
    		formObj.find("p[role='email']").text(s.eq(6).text());
    		formObj.find("p[role='remark']").text(s.eq(11).text());
    		
    		formObj.find("p[role='createdDate']").text(s.eq(13).text());
    		formObj.find("p[role='createdBy']").text(s.eq(14).text());
    		formObj.find("p[role='updatedDate']").text(s.eq(15).text());
    		formObj.find("p[role='updatedBy']").text(s.eq(16).text());
    		var flag = $.trim(s.eq(12).text());
    		if(flag == "1"){
    			formObj.find("p[role='validFlag']").text("有效");
    		}else{
    			formObj.find("p[role='validFlag']").text("无效");
    		}
    		
    		layer.open({
                type :1,
                title: ['查看详情'],
                fixed : false,                   // 不固定
                shadeClose : false,             // 点击遮罩关闭层
                area : [ '700px', '470px' ],
                content:$("#detailInfoWindow")
            });
        })
    },
    //表格内容删除
    deleteTab:function(){
        $("#tableId").on("click",".uDeleteBtn",function(){
        	var s = $(this).parent().parent().find("td");
        	id = $.trim(s.eq(2).text());
            layer.confirm('确定删除当前信息吗?', function(index){
                $.ajax({
                    url:"/user/delete",
                    type:"POST",
                    data:{
                        "ids":id
                    },
                    success:function(result){
                        layer.msg(result.message,{icon:1,time:2000});
                        loadList(itemNumPerPage, 1);
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
                    }
                })
            });
        })
    },
    /** 批量删除 */
    deleteAll:function(){
    	$("#deleteRow").click(function() {
            array = new Array();
            $("input[type='checkbox']:gt(0):checked").each(function() {
                var id = $(this).parent().parent().find("td").eq(2).text();
                array.push($.trim(id));
            });
            if (array == 0) {	
            	layer.msg('请勾选要删除的数据！', {time: 3000, icon:1});
            } else {
                layer.confirm('确定删除选中行信息吗?', function(index){
                    $.ajax({
                        url:"/user/delete",
                        type:"POST",
                        data:{
                            "ids":array.toString()
                        },
                        success:function(result){
                            layer.msg(result.message,{icon:1,time:2000});
                            loadList(itemNumPerPage, 1);
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown){
                            layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
                        }
                    })
                });
            }
        });
    }    
};
commonObj.init();

function addRow(){
	(function(){
		document.getElementById("addForm").reset(); 
		layer.open({
            type :1,
            title: ['添加用户信息'],
            area : [ '600px', '370px' ],
            content : $("#addFormWindow") ,
            btn:["添加"],
            yes : function(index, dom){
                var data = new FormData(document.getElementById("addForm"));
                var s = /^((?!<script>).)*$/;
                if(
                    $.trim(data.get("userCode"))==""||
                    $.trim(data.get("userCname"))==""||
                    $.trim(data.get("password"))==""||
                    $.trim(data.get("passwordSetDate"))==""||
                    $.trim(data.get("passwordExpireDate"))==""||
                    $.trim(data.get("mobile"))==""||
                    $.trim(data.get("email"))==""
                ){
                    layer.alert('请完善添加信息之后提交');
                    return ;
                }else if(!s.test($.trim(data.get("userCode")))){
                    layer.alert("您输入的合作方名称含有非法字符，请重新录入");
                    return;
                }

                $.ajax({
                    url:"/user/add",
                    async:false,
                    type:"POST",
                    data:data,
                    processData:false,
                    contentType:false,
                    success:function(result){                        
                    	if(result.success){
                    		loadList(itemNumPerPage, parseInt($.trim($("#currentPageNo").val())));
                    		layer.close(index);
                    		layer.msg(result.message, {time: 3000, icon:6});	
                    	}else{
                    		layer.alert(result.message)
                    	}
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                    	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
                    }
                });
            }
        });
		
	})();
}



function setUserRole(userId,obj){
	var userCode = $(obj).parent().parent().find("td").eq(3).text();
	(function(userId){
		$.ajax({
            url:"/role/all",
            async:false,
            type:"GET",
            success:function(result){                        
            	if(result.success){
            		$("#appendCheckBox").empty();
         			$.each(result.data,function(index, data){
         				if(index % 4 == 0)$("#appendCheckBox").append("<br/>");
         				$("#appendCheckBox").append("<div style=\"width:25%;display:inline-block;text-align: center; text-overflow:ellipsis;white-space:nowrap;overflow:hidden;\"><input type=\"checkbox\" value=\""+data.roleId+"\"> "+data.roleName+"</div>");
         			});
         			document.getElementById("BindForm").reset(); 
            	}else{
            		layer.alert(result.message)
            	}
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
            }
        });
		$.ajax({
            url:"/userRole/get/"+userId,
            async:false,
            type:"get",
            processData:false,
            contentType:false,
            success:function(result){        
            	if(result.success){
            		listData = result.data;
            		if(listData != null && listData.length>0){
            			$.each(listData,function(index, data){
             				$("#appendCheckBox").find("input[type='checkbox'][value='"+data.roleId+"']").prop("checked",true);
            			});
            		}
            	}else{
            		layer.alert(result.message)
            	}
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
            }
        });
	})(userId);
	
	$("#BindForm").find("span[class='role_right']").text(userCode+"  ( ID: "+userId+")");
	
	layer.open({
        type :1,
        title: ['角色绑定'],
        area : [ '600px', '370px' ],
        content : $("#BindWindow") ,
        btn:["绑定", "取消"],
        yes : function(index, dom){
        	var roleIds = new Array();
        	$("#appendCheckBox").find("input[type='checkbox']:checked").each(function() {
                 var id = $(this).val();
                 roleIds.push(id);
             });
        	
            $.ajax({
                url:"/userRole/add",
                type:"POST",
                data:{"userId":userId, "roleIds":roleIds.toString()},
                success:function(result){                        
                	if(result.success){
                    	/*layer.close(index);*/
                    	layer.msg(result.message, {time: 2000, icon:6});
                	}else{
                		layer.alert(result.message)
                	}
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
                }
            });
            
        },
        btn2: function(index, dom){
        	document.getElementById("BindForm").reset(); 
        	layer.close(index);
        },
        end : function() {
        	document.getElementById("BindForm").reset(); 
        }
    });	
		
		
		
		
		
}

