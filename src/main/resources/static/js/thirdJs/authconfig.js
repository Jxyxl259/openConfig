$(function(){
	
	//alert("levelId-----"+levelId);
	//alert("numberId-----"+numberId);
	var accountInfo, authencryptinfo, callbackinfo, authmappinfo, serverSmallTypes, serverLists;
	var authTypes, encryptTypes, serverEnvTypes, serverTypes, interfaceTypes, callbackTypes;
	
	RestfulClient.post("/innerconfig/getAllTypesInfo", {}, 
	function(result) {
		maps = result.dataList;
		authTypes = maps.authTypes;					//获取鉴权类型
		encryptTypes = maps.encryptTypes;			//获取加密类型
		serverEnvTypes = maps.serverEnvTypes;		//获取环境类型列表
		serverTypes = maps.serverTypes;				//获取服务类型
		interfaceTypes = maps.interfaceTypes;		//获取接口类型
		callbackTypes = maps.callbackTypes;			//获取回调类型
		
		if(levelId == 0){
			$(".accountinfodiv").show();
			$(".info").hide();
			loadAccount();
		}else{
			if(levelId == 2){
				$("#span_title").html("方案");
			}
			$(".info").show();
			$(".accountinfodiv").hide();
			loadElseInfos();
		}
	});
	
	//加载账户右侧信息
	function loadAccount(){
		//获取渠道信息
		RestfulClient.post("/account/getInfo", {
			"accountId": 1
		}, 
		function(result) {
			accountInfo = result.dataList;
//			alert("111---accountInfo----"+JSON.stringify(accountInfo));
//			style="display: none;"
			 
//			$("#accountinfo").attr("style","display:none;");//显示div
//			debugger;
//			$("#accountinfo").show();
//			$("#info").hide();
			accountEdit.init();
		});
	}
	
	
	
	//加载渠道与方案右侧信息
	function loadElseInfos(){
		//根据级别ID获取对应的信息
		if(levelId == 1){
			
			//获取渠道信息
			RestfulClient.post("/innerconfig/getFullDatasourceInfo", {
				"dataSourceId" : numberId
			}, 
			function(result) {
				//渠道所有信息
				infos = result.dataList;
				//方案所有信息
				projectinfos = infos.projectList;
				if(projectinfos){
					//鉴权信息
					authencryptinfo = projectinfos[0].authEncryptDto;
					//回调信息
					callbackinfo = projectinfos[0].callbackList;
					//方案服务关系信息
					authmappinfo = projectinfos[0].authmappList;
					edit.init();
				}
//				alert("111---projectinfos----"+projectinfos);
			});
			
		}
		else if(levelId == 2){
			
			//获取方案信息
			RestfulClient.post("/innerconfig/getFullProjectInfo", {
				"projectId" : numberId
			}, 
			function(result) {
				//方案所有信息
				projectinfos = result.dataList;
				//鉴权信息
				authencryptinfo = projectinfos.authEncryptDto;
				//回调信息
				callbackinfo = projectinfos.callbackList;
				//方案服务关系信息
				authmappinfo = projectinfos.authmappList;
				edit.init();
//				alert("2222---projectinfos----"+projectinfos);
			});
			
		}
	}
//	var flag = true;
	var edit = {
		init:function(){
			this.tabEdit();
			this.addClick();
			this.editFn();
			this.delLi();
			this.saveFn();
			
		},
		tabEdit:function(){
			var schemeArr = [{id:"fa1",name:"方案1",code:"code1"}];
			var authenArr = [{id:"lx1",name:"方案1",type:"MD5加密"},];
			var serverArr = [{id:"lx1",type1:"类型1",type2:"类型11",type3:"类型12",type4:"类型13"},
						     {id:"lx2",type1:"类型2",type2:"类型21",type3:"类型22",type4:"类型23"}];
			var callBackArr = [{id:"lx1",type1:"类型1",address:"地址1"},{id:"lx2",type1:"类型2",address:"地址2"}];
			
			//方案或者渠道基本信息 
			if(levelId == 2){
				
				//方案基本信息
				var schemeMsg = '<li class="first_info" id="'+projectinfos.projectId+'">'+
					'<div class="d_info">方案名称：<input id="projectName" class="info_content" type="text" readonly value="'+projectinfos.projectName+'"/></div>'+
					'<div class="d_info">方案code：<input id="projectCode" class="info_content" type="text" readonly value="'+projectinfos.projectCode+'"/></div>'+
					'<div class="d_info d_edit"><button class="edit_btn btn_Edit">编辑</button></div></li>';
				$("#scheme_msg").append(schemeMsg);
				
				
			}else if(levelId == 1){
				
				//渠道基本信息
				var schemeMsg = '<li class="first_info" id="'+infos.dataSourceId+'">'+
					'<div class="d_info">渠道名称：<input id="sourceName" class="info_content" type="text" readonly value="'+infos.sourceName+'"/></div>'+
					'<div class="d_info">渠道code：<input id="dataSource" class="info_content" type="text" readonly value="'+infos.dataSource+'"/></div>'+
					'<div class="d_info d_edit"><button class="edit_btn btn_Edit">编辑</button></div></li>';
				$("#scheme_msg").append(schemeMsg);
			}
				
			//鉴权配置信息
			if(authencryptinfo){
//				var authenMsg = '<li class="li_info" id="'+authencryptinfo.authId+'"><div class="d_info">鉴权类型：<input class="info_content" type="text" readonly value="'+authencryptinfo.authType+'"/></div><div class="d_info">加密类型：<input class="info_content" type="text" readonly value="'+authencryptinfo.encryptType+'"/></div><div class="d_info d_edit"><button class="edit_btn btn_Edit">编辑</button></div></li>'
				var authenMsg = '<li class="li_info" id="'+authencryptinfo.authId+'">'+
					'<div class="d_info">鉴权类型：<select id="authType" name="authType" class="selectWidth" ></select></div>'+
					'<div class="d_info">加密类型：<select id="encryptType" name="encryptType" class="selectWidth" ></select></div>'+
					'<div class="d_info d_edit"><button class="edit_btn btn_Edit">编辑</button></div></li>';
				$("#authen_msg ").append(authenMsg);
				
				for (var i = 0 ; i < authTypes.length; i++) {
					$("#authType").append("<option value='"+authTypes[i]+"'>'"+authTypes[i]+"'</option>");
					if(authencryptinfo.authType == authTypes[i]){
						$("#authType").find("option[value='"+authencryptinfo.authType+"']").attr("selected",true); 
					}
				}	
				for (var i = 0 ; i < encryptTypes.length; i++) {
					$("#encryptType").append("<option value='"+encryptTypes[i]+"'>'"+encryptTypes[i]+"'</option>");
					if(authencryptinfo.encryptType == encryptTypes[i]){
						$("#encryptType").find("option[value='"+authencryptinfo.encryptType+"']").attr("selected",true); 
					}
				}
			}
				
			
			
			//选择服务
			var authenMsg1 = '<li class="li_info">'+
				'<div class="d_info">环境类型：<select id="serverEnvType" name="serverEnvType" class="selectWidth" ></select></div>'+
				'<div class="d_info">服务类型：<select id="serverType" name="serverType" onchange="showSmallTypes();" class="selectWidth" ></select></div>'+
				'<div class="d_info">服务小类：<select id="serverSmallType" name="serverSmallType" onchange="showServerLists();" class="selectWidth" ></select></div>'+
				'<div class="d_info">选择服务：<select id="serverList" name="serverList" class="selectWidth" ></select></div>'+
				'<div class="d_info d_edit"><button class="btn_Edit add_btn">添加</button></div></li>'
			$("#server_msg ").append(authenMsg1);
			
			for (var i = 0 ; i < serverEnvTypes.length; i++) {
				$("#serverEnvType").append("<option value='"+serverEnvTypes[i]+"'>'"+serverEnvTypes[i]+"'</option>");
			}	
			for (var i = 0 ; i < serverTypes.length; i++) {
				$("#serverType").append("<option value='"+serverTypes[i]+"'>'"+serverTypes[i]+"'</option>");
			}	
			
			
			
			
			//服务配置信息
			if(authmappinfo){
				for (var i = 0 ; i < authmappinfo.length; i++) {
					mappid = authmappinfo[i].mappingId;
					var server_msg = '<li class="li_info" id="'+mappid+'">'+
						'<div class="d_info">接口类型：<select id="requestType_'+mappid+'" name="requestType" class="selectWidth" ></select></div>'+
						'<div class="d_info">接口地址：<input id="requestUrl" class="info_content" type="text" readonly value="'+authmappinfo[i].requestUrl+'"/></div><div class="d_info d_edit"><button class="edit_btn btn_Edit">编辑</button><button class="btn_Edit del_btn">删除</button></div></li>'
					$("#server_msg").append(server_msg);
					for (var j = 0 ; j < interfaceTypes.length; j++) {
						$("#requestType_"+mappid).append("<option value='"+interfaceTypes[j]+"'>'"+interfaceTypes[j]+"'</option>");
						
						if(authmappinfo[i].requestType == interfaceTypes[j]){
							$("#requestType_"+mappid).find("option[value='"+authmappinfo[i].requestType+"']").attr("selected",true); 
						}
					}
				}
			}
			//回调配置信息
			if(callbackinfo){
				for (var i = 0 ; i < callbackinfo.length; i++) {
					callid = callbackinfo[i].callbackUrlId;
					var callBack_msg = '<li class="li_info" id="'+callid+'">'+
						'<div class="d_info">回调类型：<select id="callbackType_'+callid+'" name="callbackType" class="selectWidth" ></select></div>'+
						'<div class="d_info">回调地址：<input class="info_content" type="text" readonly value="'+callbackinfo[i].callbackUrl+'"/></div><div class="d_info d_edit"><button class="edit_btn btn_Edit">编辑</button><button class="btn_Edit del_btn">删除</button></div></li>';
					$("#callBack_msg").append(callBack_msg);
					for (var j = 0 ; j < callbackTypes.length; j++) {
						$("#callbackType_"+callid).append("<option value='"+callbackTypes[j]+"'>'"+callbackTypes[j]+"'</option>");
						
						if(callbackinfo[i].callbackType == callbackTypes[j]){
							$("#callbackType_"+callid).find("option[value='"+callbackinfo[i].callbackType+"']").attr("selected",true); 
						}
					}
					
				}	
			}
			
			//所有下拉默认禁用
			$(".selectWidth").attr("disabled","disabled");
		},
		addClick:function(){
			$(".info_ul").on("click",".add_btn",function(){
				var that = $(this);
				var pId ="#"+$(this).parent().parent().parent().attr("id");
				if (pId == "#undefined"){
					pId ="#"+$(this).parent().parent().attr("id");
				}
				if($("#callbackType_a").length > 0 || $("#requestType_a").length > 0){
					alert("请先保存新增内容");
				}else {
					edit.tabAdd(pId);
				}
			})
		},
		tabAdd:function(ulId){
			var tabTr = '';
			switch (ulId){
//				case "#authen_msg":
//				tabTr = '<li class="li_info"><div class="d_info"><span class="span_title">方案名称：</span><input class="add_text" type="text" /></div><div class="d_info">加密类型：<input class="add_text" type="text" /></div><div class="d_info d_edit"><button class="save_btn btn_Edit">保存</button><button class="btn_Edit  del_btn">删除</button></div></li>'
//				$("#authen_msg").append(tabTr);
//				break;
				case "#callBack_msg":
					tabTr ='<li class="li_info">'+
						'<div class="d_info"><span class="span_title">回调类型：<select id="callbackType_a" name="callbackType" class="selectWidth" disabled="disabled" ></select></div>'+
						'<div class="d_info">回调地址：<input class="add_text" type="text" /></div><div class="d_info d_edit"><button class="save_btn btn_Edit">保存</button><button class="btn_Edit del_btn">删除</button></div></li>'
					$("#callBack_msg").append(tabTr);
					for (var j = 0 ; j < callbackTypes.length; j++) {
						$("#callbackType_a").append("<option value='"+callbackTypes[j]+"'>'"+callbackTypes[j]+"'</option>");
					}
				break;
				case "#server_msg":
					tabTr ='<li class="li_info">'+
						'<div class="d_info"><span class="span_title">接口类型：</span><select id="requestType_a" name="requestType"class="selectWidth" disabled="disabled"></select></div>'+
						'<div class="d_info">接口地址：<input class="add_text" type="text" /></div><div class="d_info d_edit"><button class="save_btn btn_Edit">保存</button><button class="btn_Edit del_btn">删除</button></div></li>'
					$("#server_msg").append(tabTr);
					for (var j = 0 ; j < interfaceTypes.length; j++) {
						$("#requestType_a").append("<option value='"+interfaceTypes[j]+"'>'"+interfaceTypes[j]+"'</option>");
					}
				break;
			}
			
		},
		//编辑
		editFn:function(){
			$(".info_ul").on("click",".d_info .edit_btn",function(){
				var str = $(this).html()=="编辑"?"确定":"编辑";
				$(this).html(str); 
				var data;
				alert("bianji");
				if(str=="确定"){
					debugger;
					$(this).parent().siblings().find(".info_content").removeAttr("readonly").css("border","1px solid #ccc");
					$(this).parent().siblings().find(".selectWidth").removeAttr("disabled");
				}else if(str=="编辑"){
					debugger;
					var lineId = $(this).parent().parent()[0].id;
					var tt = $(this).parent().siblings().find(".info_content");
					var ulId = $(this).parent().parent().parent()[0].id;
					//编辑后保存
					updateSave(ulId,lineId,tt,$(this));
				}
			})
		},
		//删除
		delLi:function(){
			$(".info_ul").on("click",".d_info .del_btn",function(){
//				alert("dddddddd");
				var ulId =$(this).parent().parent().parent().attr("id");
				var liId =$(this).parent().parent().attr("id");

				if((typeof(liId) != "undefined")){
					deleteInfo(ulId,liId,$(this));
				}else{
					$(this).parent().parent().remove();
				}
			})
		},
		//添加
		saveFn:function(){
			$(".info_ul").on("click",".d_info .save_btn",function(){

				var strSave = $(this).html()=="保存"?"编辑":"保存";
				$(this).html(strSave);
				if(strSave =="编辑"){
//					alert("ddd");
					var tt = $(this).parent().siblings().find(".add_text");
					var ulId = $(this).parent().parent().parent()[0].id;
					addSave(ulId,tt,$(this));

				}else{
//					alert("777777");
					$(this).parent().siblings().find(".add_text").removeAttr("readonly").css("border","1px solid #ccc");
				}
			})
		}
	}
	
	
	var accountEdit = {
		init:function(){
			this.loadAcct();
			this.editFn();
		},
		loadAcct:function(){
			var schemeMsg = '<li class="first_info" id="'+accountInfo.accountId+'">'+
				'<div class="d_info">账户APPID：<input id="editAcctAppid" class="info_content_acct" type="text" readonly value="'+accountInfo.appId+'"/></div><div class="d_info">&nbsp;</div></li>'+
				'<li class="first_info"><div class="d_info">账户CODE：<input id="editAppCode" class="info_content_acct" type="text" readonly value="'+accountInfo.appCode+'"/></div><div class="d_info">&nbsp;</div></li>'+
				'<li class="first_info"><div class="d_info">账户名称：<input id="editAcctName" class="info_content_acct" type="text" readonly value="'+accountInfo.accountName+'"/></div><div class="d_info">&nbsp;</div></li>'+
				'<li class="first_info"><div class="d_info">手机号码：<input id="editAcctMobile" class="info_content_acct" type="text" readonly value="'+accountInfo.mobile+'"/></div><div class="d_info">&nbsp;</div></li>'+
				'<li class="first_info"><div class="d_info">邮箱地址：<input id="editAcctEmail" class="info_content_acct" type="text" readonly value="'+accountInfo.email+'"/></div><div class="d_info">&nbsp;</div></li>'+
				'<li class="first_info"><div class="d_info"><button id="editAccount" class="edit_btn btn_Edit">编辑</button></div></li>';
			$("#account_msg").append(schemeMsg);
		},
		editFn:function(){
			$("#editAccount").on("click",function(){
				var str = $(this).html()=="编辑"?"确定":"编辑";
				$(this).html(str);
				var data;
				if(str=="确定"){
					$(".accountinfodiv").attr("id",accountInfo.accountId);
					$("#editAppCode").removeAttr("readonly").css("border","1px solid #ccc");
					$("#editAcctName").removeAttr("readonly").css("border","1px solid #ccc");
					$("#editAcctMobile").removeAttr("readonly").css("border","1px solid #ccc");
					$("#editAcctEmail").removeAttr("readonly").css("border","1px solid #ccc");
				}else if(str=="编辑"){
					//编辑后保存
					updateAcctSave();
				}
			});
		}
	}
})


function showSmallTypes(){
	$.ajax({
		url:"/authconfig/getServerSmallTypes",
		type:"POST",
		data:{"severType":$("#serverType").val()},
		success:function(result){
			serverSmallTypes=result.data;
			$("#serverSmallType").empty();
			$("#serverList").empty();
			for (var i = 0 ; i < serverSmallTypes.length; i++) {
				$("#serverSmallType").append("<option value='"+serverSmallTypes[i]+"'>'"+serverSmallTypes[i]+"'</option>");
			}
		}
	})
}
function showServerLists(){
	$.ajax({
		url:"/authconfig/getServerList",
		type:"POST",
		data:{
			"envType":$("#serverEnvType").val(),
			"serverType":$("#serverType").val()
		},
		success:function(result){
			serverLists=result.data;
			$("#serverList").empty();
			for (var i = 0 ; i < serverLists.length; i++) {
				$("#serverList").append("<option value='"+serverLists[i].serverId+"'>'"+serverLists[i].serverUrl+"'</option>");
			}
		}
	})
}

	/*
	 * 账户编辑后保存
	 */
	function updateAcctSave(){
//		alert("updateAcctSave---"+$(".accountinfodiv").attr("id")+"-----"+$("#editAppCode").val()+"-----"
//				+$("#editAcctName").val()+"-------"+$("#editAcctMobile").val()+"-----"+$("#editAcctEmail").val());

		RestfulClient.post("/account/changeInfo", 
			{
				"accountId" : $(".accountinfodiv").attr("id"), 
				"appCode" : $.trim($("#editAppCode").val()), 
				"accountName" : $.trim($("#editAcctName").val()), 
				"mobile" : $.trim($("#editAcctMobile").val()), 
				"email" : $.trim($("#editAcctEmail").val()), 
				"reqType":"edit"
			},
			function(result) {
				alert(result.resultMsg);
				//判断结果
				if(result.resultCode != "9999"){
					
					$("#editAppCode").attr("readonly","readonly").css("border","none");
					$("#editAcctName").attr("readonly","readonly").css("border","none");
					$("#editAcctMobile").attr("readonly","readonly").css("border","none");
					$("#editAcctEmail").attr("readonly","readonly").css("border","none");
				}
				else
					//var m = $(".accountinfodiv").find("readonly");
					alert("失败");
				////回复原数据
				
	 		}
		);
	}
	/*
	 * 渠道和方案编辑后保存
	 */
	function updateSave(ulId,lineId,params,e){
		alert("updateSave--------"+ulId+"-----"+lineId+"-------"+params.length);
		//基本信息编辑保存 
		if("scheme_msg"==ulId){
			
			if(levelId == 1){
				RestfulClient.post("/source/changeInfo", 
					{
						"dataSourceId" :lineId, 
						"dataSource" : $("#dataSource").val(),
						"sourceName" : $("#sourceName").val(),
						"reqType":"edit"
					},
					function(result) {
						alert(result.resultMsg);
						//判断结果
						if(result.resultCode != "9999"){
							
							e.parent().siblings().find(".info_content").attr("readonly","readonly").css("border","none");
							e.parent().siblings().find(".selectWidth").attr("disabled","disabled");
						}
						else
							e.parent().parent().remove();
						////回复原数据
						
			 		}
				);
			}else {
				RestfulClient.post("/project/changeInfo", 
					{
						"projectId" : lineId, 
						"projectCode" : $("#projectCode").val(),
						"projectName" : $("#projectName").val(),
						"reqType":"edit"
					},
					function(result) {
						alert(result.resultMsg);
						//判断结果
						if(result.resultCode != "9999"){
							
							e.parent().siblings().find(".info_content").attr("readonly","readonly").css("border","none");
							e.parent().siblings().find(".selectWidth").attr("disabled","disabled");
						}
						else
							e.parent().parent().remove();
						////回复原数据
						
			 		}
				);
			}
			
		}
		
		//鉴权编辑保存 
		if("authen_msg"==ulId){
			
			RestfulClient.post("/authEncrypt/changeInfo", 
				{
					"authId" : lineId, 
					"authType" : $("#authType").val(),
					"encryptType" : $("#encryptType").val(),
					"reqType":"edit"
				},
				function(result) {
					alert(result.resultMsg);
					//判断结果
					if(result.resultCode != "9999"){
						
						e.parent().siblings().find(".info_content").attr("readonly","readonly").css("border","none");
						e.parent().siblings().find(".selectWidth").attr("disabled","disabled");
					}
					else
						e.parent().parent().remove();
					////回复原数据
					
		 		}
			);
		}
		
		//方案服务关系编辑保存功能
		if("server_msg"==ulId){

			var reqType = $("#requestType_"+lineId).val();
			RestfulClient.post("/authmapping/changeInfo", 
				{
					"mappingId" : lineId, 
					"projectId" : numberId,
					"requestType" : reqType,
					"requestUrl" : $.trim(params[0].value),
					"reqType":"edit"
				},
				function(result) {
					alert(result.resultMsg);
					//判断结果
					if(result.resultCode != "9999"){
						
						e.parent().siblings().find(".info_content").attr("readonly","readonly").css("border","none");
						e.parent().siblings().find(".selectWidth").attr("disabled","disabled");
					}
					else
						e.parent().parent().remove();
					////回复原数据
					
				}
			);

		}
		
		//回调编辑保存功能
		else if("callBack_msg"==ulId){
			
			var backType = $("#callbackType_"+lineId).val();
			//alert(backType);
			RestfulClient.post("/callback/changeInfo", 
				{
					"callbackUrlId" : lineId, 
					"projectId" : numberId,
					"callbackType" : backType,
					"callbackUrl" : $.trim(params[0].value),
					"reqType":"edit"
				},
				function(result) {
					alert(result.resultMsg);
					//判断结果
					if(result.resultCode != "9999"){
						
						e.parent().siblings().find(".info_content").attr("readonly","readonly").css("border","none");
						e.parent().siblings().find(".selectWidth").attr("disabled","disabled");
					}
					else
						e.parent().parent().remove();
					////回复原数据
					
				}
			);
		}
		
		
	}

	/*
	 * 添加后保存
	 */
	function addSave(ulId,params,e){
//		alert("addSave--------"+ulId+"-----"+params.length+"-------");
		//方案服务关系
		var reqType = $("#requestType_a").val();
		if("server_msg"==ulId){
			var serverId = $("#serverList").val();
			
			if(serverId != null){
				RestfulClient.post("/authmapping/changeInfo", 
					{
						"projectId" : numberId,
						"requestType" : reqType,
						"requestUrl" : $.trim(params[0].value),
						"serverId" : serverId,
						"reqType":"add"
					},
					function(result) {
						alert(result.resultMsg);
						//判断结果
						if(result.resultCode != "9999"){
							e.parent().siblings().find(".add_text").attr("readonly","readonly").css("border","none");
							e.parent().siblings().find(".selectWidth").attr("disabled","disabled");
							e.parent().parent().attr("id",result.resultCode);
							
							e.parent().parent().find("#requestType_a").attr("id","requestType_"+result.resultCode);
						}
						else
							e.parent().parent().remove();
						
					}
				);
			}else{
				alert("请选择服务");
				e.parent().parent().remove();
			}
		}
		
		else if("callBack_msg"==ulId){
			//回调
			var backType = $("#callbackType_a").val();
			RestfulClient.post("/callback/changeInfo", 
				{
					"projectId" : numberId,
					"callbackType" : backType,
					"callbackUrl" : $.trim(params[0].value),
					"reqType":"add"
				},
				function(result) {
					alert(result.resultMsg);
					//判断结果
					if(result.resultCode != "9999"){ 
						e.parent().siblings().find(".add_text").attr("readonly","readonly").css("border","none");
						e.parent().siblings().find(".selectWidth").attr("disabled","disabled");
						e.parent().parent().attr("id",result.resultCode);
						
						e.parent().parent().find("#callbackType_a").attr("id","callbackType_"+result.resultCode);
					}
					else
						e.parent().parent().remove();
					
				}
			);
		}
		
	}
	
	
	/*
	 * 删除
	 */
	function deleteInfo(ulId,liId,e){
//		alert("deleteInfo--------"+ulId+"-----"+liId+"-------");
		
		//方案服务关系删除
		if("server_msg"==ulId){
			
			$.ajax({
				url:"/authmapping/deleteById",
				type:"POST",
				data:{"mappingId":liId},
				success:function(result){
					alert(result.resultMsg);
					//判断结果 失败不做任何处理
					if(result.resultCode != "9999")
						e.parent().parent().remove();
				}
			})
		}
		
		//回调删除
		else if("callBack_msg"==ulId){
			
			$.ajax({
				url:"/callback/deleteById",
				type:"POST",
				data:{"callbackUrlId":liId},
				success:function(result){
					alert(result.resultMsg);
					//判断结果 失败不做任何处理
					if(result.resultCode != "9999")
						e.parent().parent().remove();
				}
			})
		}
		
	}


