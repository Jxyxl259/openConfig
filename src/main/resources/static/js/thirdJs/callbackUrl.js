var flag = true;
var data;
	
$().ready(function () {  
	RestfulClient.post(
		"/callback/list", 
		{
			"form" : null,
			"extend" : {

			}
		}, 
	 function(result) {
		data = result.data;
		commonObj.tabInit("#tableId");
	});  
}); 

    var columsName = {
    	"selectAll":"<input type='checkbox' name='' value=''>",
    	"number":"编号",
    	"projectId":"方案ID",
    	"callbackType":"回调类型",
    	"callbackUrl":"回调地址",
    	"callbackMethod":"回调方法",
        "createdDate":"创建时间",
        "createdUser":"创建用户",
        "extn":"操作"
    };
    var columns = [
           {"data": "callbackUrlId", "title": columsName["selectAll"],"width":"5%"},
           {"data": "callbackUrlId", "title": columsName["number"],"width":"5%"},
           {"data": "projectId", "title": columsName["projectId"],"width":"8%"},
           {"data": "callbackType", "title": columsName["callbackType"],"width":"8%","sClass":"editClass"},
           {"data": "callbackUrl", "title": columsName["callbackUrl"],"width":"10%"},
           {"data": "callbackMethod", "title": columsName["callbackMethod"],"width":"8%"},
           {"data": "createdDate", "title": columsName["createdDate"],"width":"12%"},
           {"data": "createdUser", "title": columsName["createdUser"],"width":"7%"},
           {"data": "callbackUrlId", "title": columsName["extn"],"width":"17%"},
           {"data": "callbackUrlId", "visible":false, "title": columsName["bindId"],"width":"17%"}
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
			        this.api().column(8).nodes().each(function(cell, i){
			        	var id = cell.textContent;
			        	console.log("id:"+id);
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
		        	RestfulClient.post("/callback/changeInfo", 
		       			 {
       		 		    "extend":{
//       		 		      "projectId":$(this).parent().parent().find("td").eq(1).html(),
//       		 		      "projectCode":$(this).parent().parent().find("td").eq(2).html(),
//       		 		      "projectId":$(this).parent().parent().find("td").eq(3).html(), 
       		 		      "reqType":"edit"
       		 		    }
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
				var id = $(this).attr("id");
				var table = $('#tableId').DataTable();
				var dataTest = table.row( this ).data();
				console.log("table:"+table);
				console.log("dataTest:"+dataTest);
				layer.confirm('确定删除当前信息吗?', function(index){
					
					RestfulClient.post(
						"/callback/deleteById",
						{
							"extend":{"callbackUrlId":id}
						},
						function(result){
							that.parent().parent().remove();
							layer.close(index);
							layer.msg(result,{icon:1,time:1000});
						}
					)
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
					+'<li class="div_wrap"><div class="li_div li_DivL">方案代码<i></i></div>:<div class="li_div li_DivR">'+s.eq(2).html()+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">方案名称<i></i></div>:<div class="li_div li_DivR">'+s.eq(3).html()+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">渠道名称<i></i></div>:<div class="li_div li_DivR">'+ s.eq(4).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">鉴权类型<i></i></div>:<div class="li_div li_DivR">'+ s.eq(5).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">默认方案<i></i></div>:<div class="li_div li_DivR">'+ s.eq(6).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">创建时间<i></i></div>:<div class="li_div li_DivR">'+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">创建人<i></i></div>:<div class="li_div li_DivR">'+ s.eq(8).html() +'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">更新用户<i></i></div>:<div class="li_div li_DivR">'+ s.eq(8).html() +'</div></li>'
				+'</ul>';
				layer.open({
					type :1,
					title: ['查看详情', 'background-color:#f5fafe;font-size:18px;height:60px;line-height:60px'],
				    fixed : true,                   // 不固定
					shadeClose : false,             // 点击遮罩关闭层
					area : [ '800px', '520px' ],
				    content:addTK
				}); 		
			})
			
		}
		
	}
	commonObj.init();