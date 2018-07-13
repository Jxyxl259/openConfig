//$(function(){
	var flag = true;
	data = [
        {
            "id":"1",
            "userName":"0",
            "channel":"channel1",
            "channelEn":"渠道1",
            "yesNo":"是否",
            "creat_date": "2018/04/25",
            "creatName":"Edinburgh"
        },
        {
            "id":"2",
            "userName":"0",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        },
        {
            "id":"3",
            "userName":"2",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        },
        {
            "id":"4",
            "userName":"0",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        },
        {
            "id":"5",
            "userName":"1",
            "channel":"channel1",
            "channelEn":"渠道1",
            "yesNo":"是否",
            "creat_date": "2018/04/25",
            "creatName":"Edinburgh"
        },
        {
            "id":"6",
            "userName":"2",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        },
        {
            "id":"7",
            "userName":"0",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        },
        {
            "id":"8",
            "userName":"0",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        },
        {
            "id":"9",
            "userName":"0",
            "channel":"channel1",
            "channelEn":"渠道1",
            "yesNo":"是否",
            "creat_date": "2018/04/25",
            "creatName":"Edinburgh"
        },
        {
            "id":"10",
            "userName":"1",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        },
        {
            "id":"11",
            "userName":"1",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        },
        {
            "id":"12",
            "userName":"0",
            "channel":"channel2",
            "channelEn":"渠道2",
            "yesNo":"是",
            "creat_date": "2018/04/26",
            "creatName":"boy"
        }
    ];
    var columsName = {
    	"selectAll":"<input type='checkbox' name='' value=''>",
    	"number":"编号",
    	"userName":"用户名",
        "channel": "渠道",
        "channelEn": "渠道中文名",
        "yesNo": "是否可用",
        "creat_date": "创建时间",
        "creatName": "创建人",
        "extn": "操作"
    };
    var columns = [
            {"data": "id", "title": columsName["selectAll"],"width":"30px"},
            {"data": "id", "title": columsName["number"],"width":"50px"},
            {"data": "userName", "title": columsName["userName"],"sClass":"editClass"},
            {"data": "channel", "title": columsName["channel"],"sClass":"editClass"},
            {"data": "channelEn", "title": columsName["channelEn"],"sClass":"editClass"},
            {"data": "yesNo", "title": columsName["yesNo"],"width":"80px","sClass":"editClass"},
            {"data": "creat_date", "title": columsName["creat_date"]},
            {"data": "creatName", "title": columsName["creatName"]},
            {"data": "id", "title": columsName["extn"],"width":"160px"}
    ];
    
	var commonObj = {
		init:function(){
			this.tabInit();
			this.editTab();
			this.deleteTab();
			this.detailTab();
			//this.ajaxData();
			this.allDeleteFn();
		},
		dataApi:{
			userList:"http://192.168.16.108:8082/account/list",
			channelList:"",
			schemeList:"",
			serverList:"",
			productList:"",
			tokenList:""
		},
		ajaxData:function(){
			$.ajax({
				url:"../../js/accountText.json",
				type:"get",
				success:function(r){
					 data = r.lists;	
				},
				error:function(e){
					console.log(e);
				}
			})
		},
		//表格初始化
		tabInit:function(tabId){
			$(tabId).DataTable({	
			    bFilter: false,
			    bSort:false,
			    columns:columns,
			    aoColumnDefs: [{ "bSortable": false, "aTargets": [0,2,3,4,5,6,7,8] },{ "visible": false}],
				data:data,
				dom: '<"H"rfl > t <"F"ip >',
//				processing: true,
//      		serverSide: true,
                destroy: true, //因为需要多次初始化，所以需要设置允许销毁实例
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
			        	cell.innerHTML='<input type="checkbox" name="checks" value="">';
			        　　 });
			        this.api().column(1).nodes().each(function(cell, i){
			        	var tid = cell.textContent;
			        	$(cell).parent().attr('tid',tid);
			        　　　　 cell.innerHTML =  i + 1;
			        　　 });
			        this.api().column(2).nodes().each(function(cell, i){
			        	var valNum = parseInt(cell.textContent);
			        　　　　 cell.innerHTML = commonObj.switchFn(valNum);
			        　　 });
			        this.api().column(8).nodes().each(function(cell, i){
			        	var id = cell.textContent;
						cell.innerHTML ='<button class="edi_btn uEditBtn" id='+id+'>编辑</button><button class="edi_btn uDetailBtn">详情</button><button class="edi_btn uDeleteBtn"><i class="Hui-iconfont">&#xe6e2;</i></button>';
		     	    })
			    }
			});
		},
		//表格行内编辑
		editTab:function(){
		
			$(".table").on("click",".uEditBtn",function(){
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
			        var obj_option = $(this).find(".tab_select").find("option:selected").html();
			        var user_select = "<select class='user_select'><option value='0'>admin</option><option value='1'>admin1</option><option value='2'>admins2</option></select>"
		        	var user_option = $(this).find(".user_select").find("option:selected").html();
//		        	//console.log(a,b)
		        	if(!obj_text.length && !obj_select.length){
		        		if(data.length-1 == a){
		        			$(this).html( text_select);
		        		}else if(data.length-4 == a){
		        			$(this).html( user_select);
		        		}else{
		        			$(this).html("<input class='tab_input' type='text' value='"+$(this).text()+"'>");
		        		}
		        	}else{
		        		if(data.length-1 == a){
					    	$(this).html(obj_option);
					    }else if(data.length-4 == a){
					    	$(this).html(user_option);
					    }else{
					    	$(this).html(obj_text.val());
					    }
		        	}
		        })
//		        if(str == '编辑'){
//		        	var currentId = $(this).attr("id");
//		        }
		        
			})
			
		},
		//表格内容删除
		deleteTab:function(){
			$(".table").on("click",".uDeleteBtn",function(){
				var that = $(this);
				layer.confirm('确定删除当前信息吗?', function(index){
				  that.parent().parent().remove();
				  layer.close(index);
				  layer.msg('已删除!',{icon:1,time:1000});
				}); 	
			})
		},
		//当前行内容详情
		detailTab:function(){
			var tabObj = {};
			var addTK = '';
			$(".table").on("click",".uDetailBtn",function(){
				tabObj.tabA = $(this).parent().parent().find("td").eq(1).html();
				tabObj.tabA1 = $(this).parent().parent().find("td").eq(2).html();
				tabObj.tabB = $(this).parent().parent().find("td").eq(3).html();
				tabObj.tabC = $(this).parent().prev().prev().prev().prev().html();
				tabObj.tabD = $(this).parent().prev().prev().prev().html();
				tabObj.tabE = $(this).parent().prev().prev().html();
				tabObj.tabF = $(this).parent().prev().html();
				console.log()
				addTK ='<ul class="alert_ul">'
					+'<li class="div_wrap"><div class="li_div li_DivL">编号<i></i></div>:<div class="li_div li_DivR">'+tabObj.tabA+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">用户名<i></i></div>:<div class="li_div li_DivR">'+tabObj.tabA1+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">渠道<i></i></div>:<div class="li_div li_DivR">'+tabObj.tabB+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">渠道中文名<i></i></div>:<div class="li_div li_DivR">'+tabObj.tabC+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">是否可用<i></i></div>:<div class="li_div li_DivR">'+tabObj.tabD+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">创建时间<i></i></div>:<div class="li_div li_DivR">'+tabObj.tabE+'</div></li>'
					+'<li class="div_wrap"><div class="li_div li_DivL">创建人<i></i></div>:<div class="li_div li_DivR">'+tabObj.tabF+'</div></li>'
				+'</ul>';
				layer.open({
					type :1,
					title: ['查看详情', 'background-color:#f5fafe;font-size:18px;height:60px;line-height:60px'],
				    fixed : true,                   // 不固定
					shadeClose : false,             // 点击遮罩关闭层
					area : [ '800px', '520px' ],
//				    content:addTK
					content:'addUser.html'
				}); 		
			})
			
		},
		switchFn:function(valCode){
			var userName = "";
			switch(valCode){
				case 0:
				  userName = "admin"; 
				  break;
				case 1:
				  userName = "admin1"; 
				case 2:
				  userName = "admin2";
			}
			return userName;
		},
		allDeleteFn:function(){
			$("#deleteBtn").on("click",function(){
				var boxes = $("input[name='checks']");
		    	var idStr = "";
		    	var idArr = [];
		        for(var i = 0;i<boxes.length;i++){
					if(boxes[i].checked){	
					    var id = boxes[i].parentNode.parentNode.attr("tid");
					    idArr.push(id);	
					    console.log(idArr)
//					    $.ajax({
//					    	type:"post",
//					    	url:basePath + "",
//					    	async:true,
//					    	data:idStr,
//					    	success:function(data){
//					    		if(data.success){
//					    			tr = boxes[i].parentNode.parentNode;
//					                tr.parentNode.removeChild(tr);
//					    		}
//					    	},
//					    	error:function(e){
//					    	    console.log(e);
//					    	}
//					    });       
					}    
			    }
		        console.log()
			})
				
			
		}
		
	}
	commonObj.init();
//})
