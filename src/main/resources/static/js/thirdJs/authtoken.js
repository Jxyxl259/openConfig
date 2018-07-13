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
            UserCommon.addTokens(event);
            setTimeout('selectBoxInfo()',500);	
        }
    });
    
})


/** 加载列表数据 */
function loadList(){
	RestfulClient.post("/authtoken/list", {}, 
		function(result) {
			data = result.dataList;
			commonObj.tabInit("#tableId");
		}
	);
}

/** 列表搜索 */
$('#selectInfo').on( 'click', function () {

	RestfulClient.post("/authtoken/list", 
		{
			"appId" : $.trim($("#appId").val()), 
			"appSecret" : $.trim($("#appSecret").val()),
			"openId" : $.trim($("#openId").val()), 
			"accessToken" : $.trim($("#accessToken").val()), 
			"refreshToken" : $.trim($("#refreshToken").val()), 
			"expiretime" : $.trim($("#expiretime").val()), 
			"refExpireTime" : $.trim($("#refExpireTime").val())
			
   		},
		 function(result) {
   			data = result.dataList;
			commonObj.tabInit("#tableId");
 		}
	);
	
});

/** 批量删除 */
$("#deleteRow").click(function() {
//	alert("dd");
	array = new Array();
	$("input[type='checkbox']:gt(0):checked").each(
	    function() {
	    	
	    	var tokenId = $(this).parent().parent().find("td").eq(11).html();
//	    	array.push($(this).parent().next().text());
	    	array.push(tokenId);
	    }
	);
	if (array == 0) {	alert("请勾选!!");	} 
	else {
		layer.confirm('确定删除选中行信息吗?', function(index){
			$.ajax({
				url:"/authtoken/deleteByIds",
				type:"POST",
				data:{"tokenIds":array.toString()},
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
    	"tokenId":"tokenId",
    	"appId":"appID",
    	"appSecret":"appSecret",
    	"openId":"openId",
    	"accessToken":"accessToken",
    	"refreshToken":"refreshToken",
    	"expiretime":"expiretime",
    	"refExpireTime":"refExpireTime",
        "createdDate":"创建时间",
        "createdUser":"创建用户",
        "extn":"操作"
    };
    var columns = [
           {"data": "tokenId","title":columsName["selectAll"],"width":"4%"},
           {"data": "tokenId","title":columsName["number"],"width":"4%"},
           {"data": "appId","title":columsName["appId"],"width":"12%","sClass":"editClass"},
           {"data": "appSecret","title":columsName["appSecret"],"width":"13%","sClass":"editClass"},
           {"data": "accessToken","title":columsName["accessToken"],"width":"13%","sClass":"editClass"},
           {"data": "refreshToken","title":columsName["refreshToken"],"width":"12%","sClass":"editClass"},
           {"data": "expiretime","title":columsName["expiretime"],"width":"7%","sClass":"editClass"},
           {"data": "refExpireTime","title":columsName["refExpireTime"],"width":"7%","sClass":"editClass"},
           {"data": "createdDate","title":columsName["createdDate"],"width":"7%"},
           {"data": "createdUser","title":columsName["createdUser"],"width":"7%"},
           {"data": "tokenId","title":columsName["extn"],"width":"17%"},
           {"data": "tokenId","title":columsName["bindId"],"width":"1%","sClass":"hidden"}
   ];
    
	var commonObj = {
		init:function(){
			this.tabInit();
			this.editTab();
			this.deleteTab();
			this.detailTab();
// this.ajaxData();
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
			        	cell.innerHTML='<input type="checkbox" name="" value="">';
			        　　 });
			        this.api().column(1).nodes().each(function(cell, i){
			        	var tid = cell.textContent;
			        	$(cell).parent().attr('tid',tid);
			        　　　　 cell.innerHTML =  i + 1;
			        　　 });
			        this.api().column(10).nodes().each(function(cell, i){
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
//		        		if(data.length-1 == a){
//		        			$(this).html( text_select);
//		        		}else{
		        			$(this).html("<input class='tab_input' type='text' value='"+$(this).text()+"'>");
//		        		}
		        	}else{
		        		//if(data.length-1 == a){
					    	//$(this).html(obj_option);
					   // }else{
					    	$(this).html(obj_text.val());
					    //}
		        	}
		        })
		        
		        if(strOld == '编辑'){
		        	var currentId = $(this).attr("id");
		        }else if(strOld == '确定'){
		        	RestfulClient.post("/authtoken/changeInfo", 
		       			 {
							"tokenId":$.trim($(this).parent().parent().find("td").eq(11).html()),
							"appId":$.trim($(this).parent().parent().find("td").eq(2).html()),
					    	"appSecret":$.trim($(this).parent().parent().find("td").eq(3).html()),
					    	"accessToken":$.trim($(this).parent().parent().find("td").eq(4).html()),
					    	"refreshToken":$.trim($(this).parent().parent().find("td").eq(5).html()),
					    	"expiretime":$.trim($(this).parent().parent().find("td").eq(6).html()),
					    	"refExpireTime":$.trim($(this).parent().parent().find("td").eq(7).html()),
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
				var id = $(this).parent().parent().find("td").eq(11).html();
				var table = $('#tableId').DataTable();
				var dataTest = table.row( this ).data();
				layer.confirm('确定删除当前信息吗?', function(index){
					$.ajax({
						url:"/authtoken/deleteByIds",
						type:"POST",
						data:{"tokenIds":id},
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
					+'<li class="div_wrap"><div class="li_div li_DivL">appId<i></i></div>:<div class="li_div li_DivR">'+s.eq(2).html()+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">appSecret<i></i></div>:<div class="li_div li_DivR">'+s.eq(3).html()+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">accessToken<i></i></div>:<div class="li_div li_DivR">'+ s.eq(4).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">refreshToken<i></i></div>:<div class="li_div li_DivR">'+ s.eq(5).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">expiretime<i></i></div>:<div class="li_div li_DivR">'+ s.eq(6).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">创建时间<i></i></div>:<div class="li_div li_DivR">'+ s.eq(8).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">创建人<i></i></div>:<div class="li_div li_DivR">'+ s.eq(9).html() +'</div></li>'
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
"<table  class='table table-border  table-bg  ' style='border: 0!important; border-collapse: separate;' id='dataSourceTable'>"+
"<tr><td  class='text-r'width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'><font style='color: red'>*</font>账户APPID</td>"+
   "<td  width='55%'><select  id='selectBox' class='input-text' ><option  style='width:60px;'>----请选择----</option></select></td>"+
   "<td  width='23%' >&nbsp;</td></tr>" +
"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'><font style='color: red'>*</font>appSecret</td>"+
	"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
	"<input  name='appSecret' id='appSecret' class='input-text'  type='text' /></td>"+
	"<td  width='23%' >&nbsp;</td></tr>" +
"<tr><td  class='text-r' width='20%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'><font style='color: red'>*</font>openId</td>"+
	"<td  width='55%' style='text-align: right!important;  padding: 8px; line-height: 20px;word-break: break-all;'>" +
	"<input  name='openId' id='openId' class='input-text'  type='text' /></td>"+
	"<td  width='23%' >&nbsp;</td></tr>" +
"</table>" +
"<input  id='reqType' hidden='hidden' vale='${add}'>" +
"</form>";
	
	
	
	
var UserCommon = function(){
    return {
        addTokens : function(event,tokenId){
                layer.open({
                    type : 1,
                    fixed : true, // 不固定
                    shadeClose : false, // 点击遮罩关闭层
                    title : [ (tokenId ? "修改方案" : "添加方案"),'background-color: #F8F8F8;font-size:16px;border-bottom: 1px solid #eee;' ],
                    //closeBtn : true,
                    area : [ '700px', '470px' ],
                    content :fromTemplate ,
                    btn:[(tokenId ? "修改" : "添加")],
                    btnAlign : 'c',
                    yes : function(index, dom){
                        var data = $("#us").formData();
	                        //alert(JSON.stringify(data));
                        var s = /^((?!<script>).)*$/;
                        if(data.appSecret==""||data.openId==""||data.tokenId==""){
                            layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                            return ;
                        }else if(!s.test(data.appSecret)){
                            layer.alert("您输入的appSecret含有非法字符，请重新录入");
                            return;
                        }
                    	RestfulClient.post("/authtoken/changeInfo", 
                			{
                    		    "appId": $("#selectBox").val(),
                				"appSecret" : $.trim(data.appSecret), 
                				"openId" : $.trim(data.openId),
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
	RestfulClient.post("/account/listAll", {},
		 function(result) {
			data = result.dataList;
			for(var i in data){
				$("#selectBox").append("<option value='"+data[i].appId+"'>'"+data[i].appId+"'</option>");
			}
 		}
	);
}

$(".table_box").delegate('#tableId tr', 'click', function () {
    var nTds = $("td",this);
    var sBrowser = $(nTds[11]).text();//获取第一列的值，其中第一列为隐藏列
});	
