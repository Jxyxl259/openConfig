
var data;
var setting = {
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeClick: beforeClick
		},
		view: {
			selectedMulti: false
		}
	};

	function beforeClick(treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.checkNode(treeNode, !treeNode.checked, true, false);
		return false;
	}

/** 加载列表数据 */
function loadList(pageSize, pageNum){
    $("#currentPageNo").val(pageNum);
    conditionQuery("/role/list");

}

/** 列表条件搜索 */
$('#selectInfo').on( 'click', function () {
    conditionQuery("/role/list");
});


var columsName = {
	"selectAll":"<input type='checkbox' name='checkAll' value='' onclick='checkAll(this)'>",
	"number":"编号",
	"roleId": "角色编号",
	"roleName":"角色名称",
	"extn": "操作",
	"validFlag" : "状态"
};

var columns = [
	{"data": "roleId", "title": columsName["selectAll"],"width":"5%"},
	{"data": "roleId", "title": columsName["number"],"width":"5%"},
	{"data": "roleId", "title": columsName["roleId"],"width":"10%"},
	{"data": "roleName", "title": columsName["roleName"],"width":"15%"},
	{"data": "validFlag", "title": columsName["validFlag"],"width":"10%"},
	{"data": "roleId", "title": columsName["extn"],"width":"10%"},
	
	{"data": "validFlag", "title": columsName["ceshi"],"width":"3%","sClass":"hidden"},
	{"data": "createdDate", "title": columsName["ceshi"],"width":"3%","sClass":"hidden"},
	{"data": "createdBy", "title": columsName["ceshi"],"width":"3%","sClass":"hidden"},
	{"data": "updatedDate", "title": columsName["ceshi"],"width":"3%","sClass":"hidden"},
	{"data": "updatedBy", "title": columsName["ceshi"],"width":"3%","sClass":"hidden"},
	{"data": "roleId", "title": columsName["ceshi"],"width":"3%","sClass":"hidden"}
	
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
	               { "bSortable": false, "aTargets": [0,2,3,4,] },
	               { "visible": false},
	               {"aTargets":[2],"mRender":function(data,type,full){
	                   return " <a href='javascript:;' title='分配资源'  onclick='setRoleResource(\""+data+"\")' ><font  style='color:blue;'>"+data+"</font></a>";
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
					"sSearch": "搜索",
					"oPaginate": {
						"sFirst": "第一页",
						"sPrevious":" 上一页 ",
						"sNext": " 下一页 ",
						"sLast": " 最后一页 "
					} 
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
					this.api().column(4).nodes().each(function(cell, i){
						var flag = cell.textContent;
						if(flag == "0"){
							cell.innerHTML =  "<font color='red' size='3'>x</font>";
						}else if(flag == "1"){
							cell.innerHTML =  "<font size='3'>√</font>";
						}else{
							cell.innerHTML =  "<font size='3'></font>";
						}
						
					});
					this.api().column(5).nodes().each(function(cell, i){
						var id = cell.textContent;
						cell.innerHTML ='<button class="edi_btn uEditBtn" id='+id+'>编辑</button><button class="edi_btn uDetailBtn">详情</button><button class="edi_btn uDeleteBtn"><i class="Hui-iconfont">&#xe6e2;</i></button>';
					})
			    }
			});
		}
	},
    editTab:function(){
    	$("#tableId").on("click",".uEditBtn",function(){
    		//编辑
    		var s = $(this).parent().parent().find("td");
    		var formObj = $("#modifyForm");
    		formObj.find("input[name='roleId']").val($(this).attr("id"));
    		formObj.find("input[name='roleName']").val(s.eq(3).text());
    		var flag = $.trim(s.eq(6).text());
    		if(flag == "1"){
    			formObj.find("input[name='validFlag'][value='1']").prop("checked",true);
    		}else{
    			formObj.find("input[name='validFlag'][value='0']").prop("checked",true);
    		}
    		
    		(function(){
    			layer.open({
                    type :1,
                    title: ['修改角色信息'],
                    area : [ '600px', '370px' ],
                    content : $("#modifyInfoWindow") ,
                    btn:["修改"],
                    yes : function(index, dom){
                        var data = new FormData(document.getElementById("modifyForm"));
                        var s = /^((?!<script>).)*$/;
                        //alert($.trim(data.get("roleId")));alert($.trim(data.get("roleName")));alert($.trim(data.get("validFlag")));
                        if(
                            $.trim(data.get("roleId"))==""||
                            $.trim(data.get("roleName"))==""||
                            $.trim(data.get("validFlag"))==""
                        ){
                            layer.alert('请完善添加信息之后提交');
                            return ;
                        }else if(!s.test($.trim(data.get("roleName")))){
                            layer.alert("您输入的合作方名称含有非法字符，请重新录入");
                            return;
                        }

                        $.ajax({
                            url:"/role/update",
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
                    },
                    end : function() {
                    	document.getElementById("modifyForm").reset(); 
                    }
                });
    			
    		})();
    		
      	});
    },
  //当前行内容详情
    detailTab:function(){
        $(".table").on("click",".uDetailBtn",function(){
        	var s = $(this).parent().parent().find("td");
    		var formObj = $("#detailForm");
    		var flag = $.trim(s.eq(6).text());
    		if(flag == "1"){
    			formObj.find("p[role='validFlag']").text("有效");
    		}else{
    			formObj.find("p[role='validFlag']").text("无效");
    		}
    		
    		formObj.find("p[role='roleName']").text(s.eq(3).text());
    		formObj.find("p[role='createdDate']").text(s.eq(7).text());
    		formObj.find("p[role='createdBy']").text(s.eq(8).text());
    		formObj.find("p[role='updatedDate']").text(s.eq(9).text());
    		formObj.find("p[role='updatedBy']").text(s.eq(10).text());
    		formObj.find("p[role='roleId']").text(s.eq(11).text());
    		
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
        	id = $.trim(s.eq(11).text());
            layer.confirm('确定删除当前信息吗?', function(index){
                $.ajax({
                    url:"/role/delete",
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
                var id = $(this).parent().parent().find("td").eq(11).html();
                array.push(id);
            });
            if (array == 0) {	
            	layer.msg('请勾选要删除的数据！', {time: 3000, icon:1});
            } else {
                layer.confirm('确定删除选中行信息吗?', function(index){
                    $.ajax({
                        url:"/role/delete",
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
		layer.open({
            type :1,
            title: ['添加角色信息'],
            area : [ '600px', '370px' ],
            content : $("#addFormWindow") ,
            btn:["添加"],
            yes : function(index, dom){
                var data = new FormData(document.getElementById("addForm"));
                var s = /^((?!<script>).)*$/;
                if(
                    $.trim(data.get("roleName"))==""||
                    $.trim(data.get("validFlag"))==""
                ){
                    layer.alert('请完善添加信息之后提交');
                    return ;
                }else if(!s.test($.trim(data.get("roleName")))){
                    layer.alert("您输入的合作方名称含有非法字符，请重新录入");
                    return;
                }

                $.ajax({
                    url:"/role/add",
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
            },
            end : function() {
            	document.getElementById("addForm").reset(); 
            }
        });
		
	})();
}



function setRoleResource(roleId){
	(function(){
		$.ajax({
            url:"/resource/list",
            async:false,
            type:"POST",
            data:{},
            processData:false,
            contentType:false,
            success:function(result){                        
            	if(result.success){
            		//优化节点数据
            		var childNodes = new Array();
         			$.each(result.data,function(index, data){
         				childNodes.push({name:data.resourceName, id:data.resourceId, pId:data.parentResourceId, isParent:(data.endFlag=='0'?true:false)});
         			});
            		ztree = $.fn.zTree.init($("#treeDemo"), setting, childNodes);
            		ztree.expandAll(true);
            	}else{
            		layer.alert(result.message)
            	}
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
            }
        });
		$.ajax({
            url:"/roleResource/get/"+roleId,
            async:false,
            type:"get",
            processData:false,
            contentType:false,
            success:function(result){        
            	if(result.success){
            		listData = result.data;
             		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            		if(listData != null && listData.length>0){
            			$.each(listData,function(index, data){
             				treeNode = zTree.getNodeByParam("id",data.resourceId,null);
            				zTree.checkNode(treeNode, true, false, false);
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
		
	})();
	
	$("#roleResourceBindForm").find("span[class='role_right']").text(roleId);
		
	layer.open({
        type :1,
        title: ['资源绑定'],
        area : [ '600px', '370px' ],
        content : $("#roleResourceBindWindow") ,
        btn:["绑定", "取消"],
        yes : function(index, dom){
        	
        	var resourceIds = new Array();
    		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    		nodes = zTree.getCheckedNodes(true);
    		if(nodes.length > 0){
    			for (var i=0, l=nodes.length; i<l; i++) {
    				resourceIds.push(nodes[i].id);
    			}
    		}
        	
            $.ajax({
                url:"/roleResource/add",
                type:"POST",
                data:{"roleId":roleId, "resourceIds":resourceIds.toString()},
                success:function(result){                        
                	if(result.success){
                		document.getElementById("roleResourceBindForm").reset(); 
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
        	document.getElementById("roleResourceBindForm").reset(); 
        	layer.close(index);
        },
        end : function() {
        	document.getElementById("roleResourceBindForm").reset(); 
        }
    });	
		
		
		
		
		
}

