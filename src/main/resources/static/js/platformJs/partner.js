// 合作方 js
var flag = true;
var data;


/** 加载列表数据 */
function loadList(pageSize, pageNum){
    $("#currentPageNo").val(pageNum);
    RestfulClient.post(
        "/partner/list",
        {
            "partnerName" : $.trim($("#query_partnerName").val()),
            "partnerInvalid" : $("#query_validStatus :selected").eq(0).val(),
            "pageSize":pageSize,
            "pageNum":pageNum
        },
        function(resultMsg) {
            if(resultMsg.success){
                commonObj.loadData(resultMsg);
            }else{
                layer.msg(resultMsg.message + ":数据加载失败",{icon:5,time:2000});
            }
        }
    );

}

/** 列表条件搜索 */
$('#selectInfo').on( 'click', function () {
    var partnerName = $.trim($("#query_partnerName").val());
    var partnerInvalid = $("#query_validStatus :selected").eq(0).attr("value");

    RestfulClient.post("/partner/list",
        {
            "partnerName": partnerName,
            "partnerInvalid": partnerInvalid
        },
        function(resultMsg) {
            if(resultMsg.success){
                commonObj.loadData(resultMsg);
            }else{
                layer.msg(resultMsg.message + ":数据加载失败",{icon:5,time:2000});
            }
        }
    );
});


var columsName = {
    "selectAll":"<input type='checkbox' name='checkAll' value='' onclick='checkAll(this)'>",
    "number":"编号",
    "partnerId": "partnerId",
    "partnerName": "合作方名称",
    "partnerImg": "合作方图片",
    "validFlag": "有效",
    "createdDate": "创建时间",
    "createdUser": "创建人",
    "extn": "操作",
	"partnerRemark": "合作方备注",
	"updatedUser": "更新人"
};
var columns = [
    /*0*/{"data": "partnerId", "title": columsName["selectAll"],"width":"2%"},
    /*1*/{"data": "partnerId", "title": columsName["number"],"width":"4%"},
    /*2*/{"data": "partnerName", "title": columsName["partnerName"],"width":"10%","sClass":"editClass"},
    /*3*/{"data": "partnerImg", "title": columsName["partnerImg"],"width":"10%","sClass":"editClass"},
    /*4*/{"data": "partnerRemark", "title": columsName["partnerRemark"],"width":"15%","sClass":"editClass"},
    /*5*/{"data": "partnerInvalid", "title": columsName["validFlag"],"width":"4%","sClass":"editClass"},
    /*6*/{"data": "createdUser", "title": columsName["createdUser"],"width":"5%"},
    /*7*/{"data": "updatedUser", "title": columsName["updatedUser"],"width":"5%"},
    /*8*/{"data": "partnerId", "title": columsName["extn"],"width":"10%"},
    /*9*/{"data": "createdDate", "title": columsName["createdDate"],"sClass":"hidden"},
    /*10*/{"data": "updateDate", "title": columsName["updateDate"],"sClass":"hidden"},
    /*11*/{"data": "partnerId", "title": columsName["ceshi"],"sClass":"hidden"}

];

var commonObj = {
    init:function(){
        this.tabInit();      //table 初始化
        this.editTab_new();  //模态框弹出编辑
        this.deleteTab();    //删除当前行
        this.deleteAll();    //批量删除
        this.detailTab();    //详情展示
        this.resetFn();      //列表搜索  & 搜索框重置  &  合作方添加
    },
    //表格初始化
    tabInit:function(tabId){
        $(tabId).DataTable({
            bFilter: false,
            bSort:false,
            paging:false,                                       // 禁用分页
            displayLength:itemNumPerPage,                       // 每页显示多少条记录
            ordering:false,                                      // 全局禁用排序
            columns:columns,
            aoColumnDefs: [{ "bSortable": false, "aTargets": [0,1,2,3,4,5,6,7,8] },{ "visible": false}], // [{设置不允许排序的列},{隐藏排序图标}]
            data:data,
            dom: '<"H"rfl > t <"F"ip >',
            destroy: true,                                      //因为需要多次初始化，所以需要设置允许销毁实例
            oLanguage: {
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "对不起，查询不到任何相关数据",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
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
                this.api().column(3).nodes().each(function(cell, i){
                    var impPath = cell.textContent;
                    cell.innerHTML = '<img src="../../../'+ impPath +'" style="width: 60px;height: 60px"  ismap/>';
                });
                this.api().column(5).nodes().each(function(cell, i){
                    var valid_status = cell.textContent;
                    var valid_status_info = valid_status == 0 ? '<font color="red" size="3">x</font>' : '<font size="3">√</font>';
                    cell.innerHTML = valid_status_info + '<input class="tab_input" type="hidden" value="'+ valid_status +'"/>';
                });
                this.api().column(8).nodes().each(function(cell, i){
                    var id = cell.textContent;
                    cell.innerHTML ='<button class="edi_btn uEditBtn" id='+id+'>编辑</button><button class="edi_btn uDetailBtn">详情</button><button class="edi_btn uDeleteBtn"><i class="Hui-iconfont">&#xe6e2;</i></button>';
                })
            }
        });
    },
    editTab_new:function(){
    	$("#tableId").on("click",".uEditBtn",function(){
      		 var editContent = $(this).parent("td").parent("tr").find(".editClass");
      		 $("#modifyPartnerName").val(editContent.eq(0).text());   //合作伙伴
      		 $(".text_picWrap").empty().append(editContent.eq(1).html()); //图片
      		 $("#modifyPartnerRemark").val(editContent.eq(2).text());   //备注

      		 if( editContent.eq(3).find("input").val() == "1" ){               //是否有效
      			 $("#haveEffect").prop("checked",true);           
      		 }else{  
      			 $("#NoEffect").prop("checked",true);	
      		 }
      		 
      		 $("#modifyPartnerId").val(this.id);   //备注
      		
      		 PartnerCommon.changeFile()
      		 PartnerCommon.modifyPartner();
      	});
    },
    //表格内容删除
    deleteTab:function(){
        $("#tableId").on("click",".uDeleteBtn",function(){
            var that = $(this);
            var id = $(this).parent().parent().find("td").eq(11).html();
            var imageFilePath = $(this).parent().parent().find("td").eq(3).html();
            var table = $('#tableId').DataTable();
            var dataTest = table.row( this ).data();
            layer.confirm('确定删除当前信息吗?', function(index){
                $.ajax({
                    url:"/partner/deleteByIds",
                    type:"POST",
                    data:{
                        "ids":id,
                        "partnerImageFilePath":imageFilePath
                    },
                    success:function(result){
                        layer.msg(result.resultMsg,{icon:1,time:1000});
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
            imgPathArray = new Array();
            $("input[type='checkbox']:gt(0):checked").each(function() {
                var partnerId = $(this).parent().parent().find("td").eq(11).html();
                array.push(partnerId);
                var productImgPath = $(this).parent().parent().find("td").eq(3).html();
                imgPathArray.push(productImgPath);
            });
            if (array == 0) {	
            	layer.msg('请勾选要删除的数据！', {time: 5000, icon:1});
            } else {
                layer.confirm('确定删除选中行信息吗?', function(index){
                    $.ajax({
                        url:"/partner/deleteByIds",
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
    },
    //当前行内容详情
    detailTab:function(){
        var tabObj = {};
        var addTK = '';
        $(".table").on("click",".uDetailBtn",function(){
            var s = $(this).parent().parent().find("td");
            addTK ='<ul class="alert_ul">'
                +'<li class="div_wrap"><div class="li_div li_DivL">合作方名称</div>:<div class="li_div li_DivR">'+s.eq(2).text()+'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">合作方图片</div>:<div class="li_div li_DivR">'+s.eq(3).html()+'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">有效</div>:<div class="li_div li_DivR">'+ s.eq(5).text() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">合作方备注</div>:<div class="li_div li_DivR">'+ s.eq(4).text() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">创建人</div>:<div class="li_div li_DivR">'+ s.eq(6).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">更新时间</div>:<div class="li_div li_DivR">'+ s.eq(10).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">更新人</div>:<div class="li_div li_DivR">'+ s.eq(7).html() +'</div></li>'
                +'</ul>';
            layer.open({
                type :1,
                title: ['查看详情'],
                fixed : false,                   // 不固定
                shadeClose : false,             // 点击遮罩关闭层
                area : [ '700px', '470px' ],
                content:addTK
            });
        })
    },
    resetFn:function(){
    	/** 列表搜索 */
    	$('#query_selectInfo').on( 'click', function () {
    	    loadList(itemNumPerPage, 1);
    	});
    	$(".btn_reset").on("click",function(){
			$(".input-text").val("");
		})
		/** 合作方添加*/
		$("#addRow").on({ "click" : function(event){
			 	var img = $("<img />");
		        $(".text_picWrap").html(img);
			    PartnerCommon.changeFile();
		        PartnerCommon.addPartner(event);
		    }
		});

    },
    loadData:function(resultMsg) {
        result = resultMsg.data;
        data = result.dataList;
        commonObj.tabInit("#tableId");
        paginationInfo();

    }

};
commonObj.init();

var PartnerCommon = {
        // 合作方添加
        addPartner : function(event){
            layer.open({
                type : 1,
                title : ["添加合作伙伴信息"],
                area : [ '700px', '350px' ],
                content : $("#addFromDiv"),
                btn:["添加"],
                yes : function(index, dom){
                	var formdata = new FormData(document.getElementById("partnerInfoAddForm"));
                	
                    //alert(JSON.stringify(formdata));
                    var s = /^((?!<script>).)*$/;
                    if($.trim(formdata.get("partnerName"))=="" || $.trim(formdata.get("partnerImageFile").name)==""){
                        layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                        return ;
                    }else if(!s.test($.trim(formdata.get("partnerName")))){
                        layer.alert("您输入的合作方名称含有非法字符，请重新录入");
                        return;
                    }
                    $.ajax({
                        url:"/partner/addPartnerInfo",
                        async:false,
                        type:"POST",
                        data:formdata,
                        processData: false,  // 告诉jQuery不要去处理发送的数据
            	        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                        success:function(result){
                        	console.log(result)
                        	if(result.success){
                        		loadList(itemNumPerPage, 1);
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
                end : function() { //清空表单数据
                	 document.getElementById("partnerInfoAddForm").reset(); 
                }
            });
        },
        // 合作方信息修改
        modifyPartner : function(){
        	 layer.open({
                type :1,
                title: ['修改合作伙伴信息'],
                area : [ '700px', '470px' ],
                content : $("#changeFromDiv") ,
                btn:["修改"],
                yes : function(index, dom){
                    var data = new FormData(document.getElementById("partnerInfoModifyForm"));
                    var s = /^((?!<script>).)*$/;
                    if($.trim(data.get("partnerName"))==""){
                        layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                        return ;
                    }else if(!s.test($.trim(data.get("partnerName")))){
                        layer.alert("您输入的合作方名称含有非法字符，请重新录入");
                        return;
                    }
                    
                    $.ajax({
                        url:"/partner/modifyPartnerInfo",
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
                	document.getElementById("partnerInfoModifyForm").reset(); 
                }
            });
        },
        //修改上传合作伙伴图片
        changeFile:function(){
    		$("input[name='partnerImageFile']").on("change" , function(e){
				 var files = this.files;
				 var reader = new FileReader();
				     reader.readAsDataURL(files[0]);
				     reader.onload =function(e){
				        var dx =(e.total/1024)/1024;
				        if(dx>=1){
				          layer.msg('图片大小超过1M！', {time: 3000, icon:2});
				          return;
				        }
				        var result = this.result;//这里就是转化之后的DataURL
				        var img = $("<img />").attr("src",this.result);
				        $(".text_picWrap").empty().append(img);
				      }	
        	})	
        }   
};



