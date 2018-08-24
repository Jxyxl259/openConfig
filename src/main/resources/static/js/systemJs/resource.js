$(function(){
	inint();
})

function isRealNum(val){
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
    	if(val >= 0){
    		return true;
    	}else{
    		return false;
    	}
    }else{
        return false;
    }
}  

var zTree;

// 初始化加载树,id必须小于3位，第一位必须是大于0的数字，比如99，10
var resourceRootId="1";
function inint() {
	var rootObj = [{name:"open系统菜单", id:resourceRootId, pId:"-1", isParent:true, isHidden:true}];
	zTree = $.fn.zTree.init($("#treeDemo"), setting, rootObj);
	//默认触发加载一级节点
	rootNode = zTree.getNodeByParam("id",resourceRootId,null);
	zTree.expandNode(rootNode,true,false,false,false);//展开指定节点
};

	var setting = {
		async: {
			enable: true,
			url:"/resource/treelist",
			autoParam:["id=parentId"],
			dataFilter: filter
		},
		view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			selectedMulti: false
		},
		edit: {
			enable: true
		},
		data : {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeExpand: beforeExpand,
			beforeEditName: beforeEditName,
			beforeRemove : beforeRemove
		}
	};

	/** 删除节点*/
	function beforeRemove(treeId, treeNode) {
		var deleteFlag = true;
		if (treeNode.isParent) {
			//获取当前节点下的所有子节点，要是有，提示，没有删除当前父节点
			var childrenArr = treeNode.children;
			if(childrenArr.length > 0){
				layer.alert("请先删除所有子节点");
				deleteFlag = false;
			}
		}

		if(deleteFlag){
			layer.confirm("确认删除 " + treeNode.name + " 节点吗？", {
				icon : 3,
				title : '提示'
			}, function() {
				$.ajax({
					type : "get",
					url :  "/resource/delete/"+treeNode.id,
					dataType : "json",
					async:false,
					success : function(result) {
						var parNode = treeNode.getParentNode();
						if(result.success){
                    		layer.msg(result.message, {time: 2000, icon:6});	
                    		zTree.removeNode(treeNode,false);
                    	}else{
                    		layer.alert(result.message) 
                    		//删除失败局部刷新下节点，防止异步产生的错误数据
                    		zTree.reAsyncChildNodes(parNode, "refresh", true);
                    	}
						
						//检查父节点的状态
						var childrenArr = parNode.children;
						if(childrenArr.length < 1){
                             var updateForm = new FormData();
                             updateForm.set("resourceId",parNode.id);
                             updateForm.set("endFlag","1");
                             $.ajax({ // 对于父节点的更新成功失败都不影响数据一致，只是影响父节点图标的展示，这里请求做下图标的更新
                                 url:"/resource/update",
                                 type:"POST",
                                 data:updateForm,
                                 processData: false, 
                     	         contentType: false,
                     	         success:function(re){
                     	        	 if(re.success){
                     	        		parNode.isParent = false;  //改成父节点
                                        zTree.updateNode(parNode,false); //更新数据
                     	        	 }
                     	         }
                             });
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
	                	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
	                }
				});	
			});
		}
			
		return false; //这个必须要添加,防止事件冒泡，注意js是异步执行的，必须false，这个返回true，tree就会直接去掉这个节点。
	}
	
	function beforeExpand(treeId, treeNode) {
		if (!treeNode.isAjaxing) {
			ajaxGetNodes(treeNode, "refresh");
			return true;
		} else {
			alert("zTree 正在下载数据中，请稍后展开节点。。。");
			return false;
		}
	}
	
	function ajaxGetNodes(treeNode, reloadType) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		if (reloadType == "refresh") {
			zTree.updateNode(treeNode);
		}
		zTree.reAsyncChildNodes(treeNode, reloadType, true);
	}
	
	//数据加载处理函数
	function filter(treeId, parentNode, result) {
		childNodes = new Array();
		if(result.success){
 			//优化节点数据
 			$.each(result.data,function(index, data){
 				childNodes.push({name:data.resourceName, id:data.resourceId, pId:data.parentResourceId, isParent:(data.endFlag=='0'?true:false)});
 			});
 			//alert(JSON.stringify(childNodes));
     	}
		return childNodes;
	}
	
	//编辑资源
	function beforeEditName(treeId, treeNode) {
		$.ajax({
			type : "get",
			url :  "/resource/getOne/"+treeNode.id,
			dataType : "json",
			async:false,
			success : function(result) {
				if(result.success){
					var data = result.data;
					$("#addResourceForm").find("input[name='resourceName']").val(data.resourceName);
					$("#addResourceForm").find("input[name='actionUrl']").val(data.actionUrl);
					$("#addResourceForm").find("input[name='resourceIconClass']").val(data.resourceIconClass);
					$("#addResourceForm").find("input[name='resourceType']").val(data.resourceType);
					$("#addResourceForm").find("input[name='displayOrder']").val(data.displayOrder);
            		
            		showModelWin(treeNode,['编辑资源菜单'],['修改'],"/resource/update","edit");
            	}else{
            		layer.alert(result.message) 
            	}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
            	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
            }
		});	
		
		return false;
	}

	var newCount = 1;
	function addHoverDom(treeId, treeNode) {
		if(treeNode.id==resourceRootId){
			$("#"+treeNode.tId+"_edit").unbind().remove();
			$("#"+treeNode.tId+"_remove").unbind().remove();
		}
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#"+treeNode.tId+"_add").length>0) return;
		var addStr = "<span class='button add' id='" + treeNode.tId
			+ "_add' title='add node' onfocus='this.blur();'></span>";
		sObj.after(addStr);
		var btn = $("#"+treeNode.tId+"_add");
		if (btn) btn.bind("click", function(){
			showModelWin(treeNode,['添加资源菜单'],['添加'],"/resource/add","add");
			return false;
		});
	};
	function removeHoverDom(treeId, treeNode) {
		$("#"+treeNode.tId+"_add").unbind().remove();
	};
		
	function showModelWin(treeNode,title,btn,url,type){
		layer.open({
            type : 1,
            title : [title],
            area : [ '700px', '450px' ],
            content : $("#showModelWin"),
            btn:[btn],
            yes : function(index, dom){
            	var formdata = new FormData(document.getElementById("addResourceForm"));
                var s = /^((?!<script>).)*$/;
                
                var env = formdata.values();
                while(item = env.next()){
                   if(item.done) break;
                   if($.trim(item.value) == ""){
                	   layer.alert('请完善添加信息之后提交');
                       return false;
                   }
                }
                
                if(!s.test($.trim(formdata.get("resourceName")))){
                    layer.alert("您输入的资源名称含有非法字符，请重新录入");
                    return;
                }
                
                if(!isRealNum($.trim(formdata.get("displayOrder")))){
                    layer.alert("显示顺序必须为大于零的数字！");
                    return;
                }
                
                if(type == "add"){
                	formdata.append('parentResourceId',treeNode.id);
                }else if(type == "edit"){
                	formdata.append('resourceId',treeNode.id);
                }

                $.ajax({
                    url:url,
                    async:false,
                    type:"POST",
                    data:formdata,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
        	        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                    success:function(result){
                    	if(result.success){
                            layer.msg(result.message, {time: 3000, icon:6});
                            layer.close(index);
                            if(type == "add"){
                            	 treeNode.isParent = true;  //改成父节点
                                 zTree.updateNode(treeNode,false); //更新数据
                                 zTree.reAsyncChildNodes(treeNode, "refresh", true); //刷新重新加载---局部刷新
                                 zTree.expandNode(treeNode,true,false,false,false);//展开当前节点
                            }else if(type == "edit"){
                                zTree.reAsyncChildNodes(treeNode.getParentNode(), "refresh", true); //刷新重新加载父节点---局部刷新---叶子节点是没法出发加载数据事件的
                            }
                    	}else{
                    		layer.alert(result.message)
                    	}
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                    	layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
                    }
                });
            },
            end : function() { //清空表单数据
            	 document.getElementById("addResourceForm").reset(); 
            }
        });
	}