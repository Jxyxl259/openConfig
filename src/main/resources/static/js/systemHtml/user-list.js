var flag = true;
var data;
$.fn.formData = function() {
    var o = {};
    var a = $("#us").serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function() {
    // 数据初始化
	loadList();
	
    //全选反选
    $("input[name='checkAll']").click(function(){
         if (this.checked){  
             //alert("全选");
             $("input[name='dataCheckBox']:checkbox").each(function(){
                 $(this).prop("checked", true);
             });
         } else {
            // alert("反选");
             $("input[name='dataCheckBox']:checkbox").each(function() {     
                 $(this).prop("checked", false);
             });
         }
    });
    
    //添加提交
    $("#addRow").on({ "click" : function(event){
            UserCommon.addProjects(event);
            setTimeout('selectBoxInfo()',500);	
        }
    });
    
})




/** 加载列表数据 */
function loadList(){
	RestfulClient.post("/user/list", {}, 
		function(result) {
			data = result.dataList;
			commonObj.tabInit("#tableId");
		}
	);
}


/** 列表搜索 */
$('#selectInfo').on( 'click', function () {

	RestfulClient.post("/user/list", 
		{
			"userCode" : $.trim($("#userCode").val()), 
			"userCname" : $.trim($("#userCname").val()),
   		},
		 function(result) {
   			data = result.dataList;
			commonObj.tabInit("#tableId");
 		}
	);
	
});

/** 批量删除 */
$("#deleteRow").click(function() {
	array = new Array();
	$("input[type='checkbox']:gt(0):checked").each(
	    function() {
	    	
	    	var userCode = $(this).parent().parent().find("td").eq(3).html();
	    	array.push(userCode);
	    }
	);
	if (array == 0) {layer.msg('请至少勾选一条记录删除', {
		icon: 1,
		time: 1000
	});	
	return;
	} 
	else {
		layer.confirm('确定删除选中行信息吗?', function(index){
			$.ajax({
				url:"/user/deleteByUserCode",
				type:"POST",
				data:{"userCode":array.toString()},
				success:function(result){
					layer.msg(result.resultMsg,{icon:1,time:1000});
					loadList();
				}
			})
		});
	}
});


	var columsName = {
		"selectAll":"<input type='checkbox' name='' value=''>",
		"number":"编号",
		"userId": "用户ID",
		"userCode":"用户代码",
		"userCname":"简体中文名称",
		"companyCode": "机构代码",
		"mobile": "电话号码",
		"address": "通信地址",
		"validFlag": "是否有效",
		"extn": "操作",
		"projectid": "操作"
	};
	var columns = [
		{"data": "userId", "title": columsName["selectAll"],"width":"5%"},
		{"data": "userId", "title": columsName["number"],"width":"5%"},
		{"data": "userId", "title": columsName["userId"],"width":"15%"},
		{"data": "userCode", "title": columsName["userCode"],"width":"5%"},
		{"data": "userCname", "title": columsName["userCname"],"width":"7%","sClass":"editClass"},
		{"data": "companyCode", "title": columsName["companyCode"],"width":"5%","sClass":"editClass"},
		{"data": "mobile", "title": columsName["mobile"],"width":"15%","sClass":"editClass"},
		{"data": "address", "title": columsName["address"],"width":"15%","sClass":"editClass"},
		{"data": "validFlag", "title": columsName["validFlag"],"width":"10%"}, 
		{"data": "userId", "title": columsName["extn"],"width":"18%"},
		{"data": "userCode","title": columsName["projectid"],"width":"7%","sClass":"hidden"}
	];

	var commonObj = {
		init:function(){
			this.tabInit();
			this.editTab();
			this.deleteTab();
			this.detailTab();
		},
		// 表格初始化
		tabInit:function(tabId){
			$(tabId).DataTable({	
				bFilter: false,
				bSort:false,
				columns:columns,
				aoColumnDefs: [{ "bSortable": false, "aTargets": [0,2,3,4,5,6,7] },{ "visible": false}],
				data:data,
				dom: '<"H"rfl > t <"F"ip >',
				destroy: true,                                   // 因为需要多次初始化，所以需要设置允许销毁实例
				oLanguage: {
					"sLengthMenu": "每页显示 _MENU_ 条记录",
					"sZeroRecords": "对不起，查询不到任何相关数据",
					"sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
					"sInfoEmtpy": "找不到相关数据",
					"sProcessing": "正在加载中...",
					"sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
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
						cell.innerHTML='<input type="checkbox" name="" value="">';
					});
					this.api().column(1).nodes().each(function(cell, i){
						var tid = cell.textContent;
						$(cell).parent().attr('tid',tid);
					     cell.innerHTML =  i + 1;
					});
					//下拉内容展示
					this.api().column(8).nodes().each(function(cell, i){
						var tid = cell.textContent;
						if(tid == '1')	tid = '是';
						else	tid = "否";
						$(cell).parent().attr('tid',tid);
						cell.innerHTML =  tid;
					});
					this.api().column(9).nodes().each(function(cell, i){
						var id = cell.textContent;
						cell.innerHTML ='<button class="edi_btn uEditBtn" id='+id+'>编辑</button><button class="edi_btn uDetailBtn">详情</button><button class="edi_btn uDeleteBtn"><i class="Hui-iconfont">&#xe6e2;</i></button>';
						})
					}
			});
		},
		
		// 表格行内编辑
		editTab:function(){
			$(".table").on("click",".uEditBtn",function(){
				var strOld = $(this).html();
				str = $(this).html()=="编辑"?"确定":"编辑";
				$(this).html(str);  
				flag = !flag;
				if(flag){
					$(this).removeClass("blueBtn");
				}else{
					$(this).addClass("blueBtn");
				}
				var data = $(this).parent().siblings(".editClass");
				data.each(function(a,b){
					var obj_text = $(this).find("input:text");
					var obj_select = $(this).find("select");
					var text_select = "<select class='tab_select'><option value='0'>是</option><option value='1'>否</option></select>";
					obj_option = $(this).find("option:selected").html();
					//console.log(a,b)
					
					if(!obj_text.length && !obj_select.length){
//						if(data.length-1 == a){
//							$(this).html( text_select);
//						}else{
							$(this).html("<input class='tab_input' type='text' value='"+$(this).text()+"'>");
//						}
					}else{
//						if(data.length-1 == a){
//							$(this).html(obj_option);
//						}else{
							$(this).html(obj_text.val());
//						}
					}
				})
				
				if(strOld == '编辑'){
					var currentId = $(this).attr("id");
				}else if(strOld == '确定'){
					RestfulClient.post("/user/changeInfo", 
						{
							"address" : $.trim($(this).parent().parent().find("td").eq(7).html()),
							"mobile" : $.trim($(this).parent().parent().find("td").eq(6).html()),
							"companyCode" : $.trim($(this).parent().parent().find("td").eq(5).html()),
							"userCname" : $.trim($(this).parent().parent().find("td").eq(4).html()),
							"userId" : $.trim($(this).parent().parent().find("td").eq(2).html()),
							"userCode" : $.trim($(this).parent().parent().find("td").eq(3).html()), 
							"reqType":"edit"
						},
						function(result) {
							layer.msg(result.resultMsg,{icon:1,time:1000});
							loadList();
						}
					);
				}
			})
			
		},
		// 表格内容删除
		deleteTab:function(){
			$(".table").on("click",".uDeleteBtn",function(){
				var that = $(this);
				var usercode = $(this).parent().parent().find("td").eq(3).html();
				alert(usercode);
				var table = $('#tableId').DataTable();
				var dataTest = table.row( this ).data();
//				console.log("table:"+table);
//				console.log("dataTest:"+dataTest);
				layer.confirm('确定删除当前信息吗?', function(index){
					
					$.ajax({
						url:"/user/deleteByUserCode",
						type:"POST",
						data:{"userCode":usercode},
						success:function(result){
							layer.msg(result.resultMsg,{icon:1,time:1000});
							loadList();
						}
					})
				}); 	
			})
		},
		// 当前行内容详情
		detailTab:function(){
			var tabObj = {};
			var addTK = '';
			$(".table").on("click",".uDetailBtn",function(){
				var s = $(this).parent().parent().find("td");
				addTK ='<ul class="alert_ul">'
					+'<li class="div_wrap"><div class="li_div li_DivL">用户ID<i></i></div>:<div class="li_div li_DivR">'+s.eq(2).html()+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">用户代码<i></i></div>:<div class="li_div li_DivR">'+s.eq(3).html()+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">简体中文名称<i></i></div>:<div class="li_div li_DivR">'+ s.eq(4).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">机构代码<i></i></div>:<div class="li_div li_DivR">'+ s.eq(5).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">电话号码<i></i></div>:<div class="li_div li_DivR">'+ s.eq(6).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">通讯地址<i></i></div>:<div class="li_div li_DivR">'+ s.eq(7).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">是否有效<i></i></div>:<div class="li_div li_DivR">'+ s.eq(8).html() +'</div></li>'
				+'</ul>';
				layer.open({
					type :1,
					title: ['查看详情', 'background-color:#f5fafe;font-size:18px;height:60px;line-height:60px'],
					fixed : true,                   // 不固定
					shadeClose : false,             // 点击遮罩关闭层
					area : [ '700px', '470px' ],
					content:addTK
				}); 		
			})
			
		}
	}	
	commonObj.init();

var fromTemplate = "<div  class='pd-30'><form  id='us'>"+
	"<table  class='table table-border  table-bg  ' style='border: 0!important; border-collapse: separate;' id='projectTable'>"+
		"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'><font style='color: red'>*</font>用户代码：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='userCode' id='userCode' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
		    "<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'><font style='color: red'>*</font>简体中文名称：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='userCname' id='userCname' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>英文中文名称：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='userEname' id='userEname' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>繁体中文名称：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='userTname' id='userTname' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'><font style='color: red'>*</font>密码：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='password' id='password' class='input-text'  type='password' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>密码设置日期：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input type='text' id='passwordSetDate' class='input-text'  placeholder=' ---请选择--- ' name='passwordSetDate'  class='Wdate required' onclick='WdatePicker({dateFmt:\"yyyy-MM-dd HH:mm:ss\",isShowClear:false});' readonly='readonly' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'><font style='color: red'>*</font>密码过期日期：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input type='text' id='passwordExpireDate' class='input-text'  placeholder=' ---请选择--- ' name='passwordExpireDate' maxlength='20' class='Wdate required'   onclick='WdatePicker({dateFmt:\"yyyy-MM-dd HH:mm:ss\",isShowClear:false});' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>用户状态：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<select class='formControls col-xs-12 col-sm-12' style='height: 33px;' name='validFlag' id='validFlag'>" +
			" <option value='1' autofocus='true'>有效</option>" +
			"<option value='0'>无效</option>"+
			"</select></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'><font style='color: red'>*</font>机构代码：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<select class='formControls col-xs-12 col-sm-12'id='selectBox' style='height: 33px;' name='companyCode' id='companyCode'>" +
			"</select></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>手机号码：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='mobile' id='mobile' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>电话号码：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='phone' id='phone' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'> 邮箱：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='email' id='email' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>邮政编码：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='postCode' id='postCode' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>通信地址：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<input  name='address' id='address' class='input-text'  type='text' /></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
			"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>备注：</td>"+
			"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
			"<textarea cols='' rows='' class='textarea input-text' name='remark' id='remark'  placeholder='说点什么...'></textarea></td>"+
			"<td  width='23%' >&nbsp;</td></tr>" +
		"</table>" +
		"<input  id='reqType' hidden='hidden' vale='add'>" +
		"</form>"
	
	
	
	
var UserCommon = function(){
    return {
        addProjects : function(event,userId){
                layer.open({
                    type : 1,
                    fixed : true, // 不固定
                    shadeClose : false, // 点击遮罩关闭层
                    title : [ (userId ? "修改方案" : "添加方案"),'background-color: #F8F8F8;font-size:16px;border-bottom: 1px solid #eee;' ],
                    //closeBtn : true,
                    area : [ '700px', '600px' ],
                    content :fromTemplate ,
                    btn:[(userId ? "修改" : "添加")],
                    btnAlign : 'c',
                    yes : function(index, dom){
                        var data = $("#us").formData();
	                        //alert(JSON.stringify(data));
                        var s = /^((?!<script>).)*$/;
                        if(data.userCode==""||data.userCname==""||data.password==""||data.passwordExpireDate==""||data.validFlag==""||data.companyCode==""){
                            layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                            return ;
                        }else if(!s.test(data.projectName)){
                            layer.alert("您输入的用户代码含有非法字符，请重新录入");
                            return;
                        }
                    	RestfulClient.post("/user/changeInfo", 
                			{
                				"userCode" : $.trim(data.userCode), 
                				"userCname" : $.trim(data.userCname),
                				"userEname" : $.trim(data.userEname), 
                				"userTname" : $.trim(data.userTname),
                				"password" : $.trim(data.password), 
                				"passwordSetDate" : $.trim(data.passwordSetDate),
                				"passwordExpireDate" : $.trim(data.passwordExpireDate), 
                				"validFlag" : $.trim(data.validFlag),
                				"phone" : $.trim(data.phone), 
                				"mobile" : $.trim(data.mobile),
                				"postCode" : $.trim(data.postCode), 
                				"address" : $.trim(data.address),
                				"remark" : $.trim(data.remark), 
                				"companyCode": $("#selectBox").val(),
                				"reqType":"add"
                	   		},
                			 function(result) {
    							layer.msg(result.resultMsg,{icon:1,time:1000});
    							layer.close(index);
    							loadList();
                	 		}
                		);
                    },
                    success : function(dom,index){
                        
                    },
                    end : function() {
                    	loadList();
                    }
                });
        }
    }
}();


function selectBoxInfo(){
	RestfulClient.post("/user/getCompanyCodeList", {},
		 function(result) {
			data = result.dataList;
			for(var i in data){
				$("#selectBox").append("<option value='"+data[i].companyId+"'>'"+data[i].companyCname+"'</option>");
			}
 		}
	);
}

	
	 