// 第三方用户 js
var flag = true;
var data;
var itemNumPerPage;

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
    loadList(10,1);

    itemNumPerPage = parseInt($.trim($("#pageSizeVal").val()));

});


/** 全选、反选 */
function checkAll(ele){
    //全选反选
    if (ele.checked){
        //alert("全选");
        $("input[name='dataCheckBox']:checkbox").each(function(){
            $(this).prop("checked", true);
        });
    } else {
        //alert("反选");
        $("input[name='dataCheckBox']:checkbox").each(function() {
            $(this).prop("checked", false);
        });
    }
}



/** 翻页 */
function turnPage(targetPageNum){

    loadList(itemNumPerPage, targetPageNum);
}


/** 刷新每页显示的条目数 */
function updatePageSize(ele){

    var newPageSize = parseInt($(ele).children(":selected")[0].value);
    var oldPageSize = parseInt($.trim($("#pageSizeVal").val()));

    if(newPageSize != null && oldPageSize != newPageSize){
        $("#pageSizeVal").val(newPageSize);
        itemNumPerPage = newPageSize;
        loadList(newPageSize, 1);
    }

}


/** 加载列表数据 */
function loadList(pageSize, pageNum){

    RestfulClient.post(
        "/userAccount/list",
        {
            "accountName" : $.trim($("#accountName").val()),
            "mobile" : $.trim($("#mobile").val()),
            "email" : $.trim($("#email").val()),
            "authFlag" : $.trim($("#authStatus").val()) == '' ? null : parseInt($.trim($("#authStatus").val())),
            "validFlag" : $.trim($("#validStatus").val()) == '' ? null : parseInt($.trim($("#validStatus").val())),
            "pageSize":pageSize,
            "pageNum":pageNum
        },
        function(result) {
            data = result.dataList;
            commonObj.tabInit("#tableId");

            var currentPage = result.pageNum;
            var pageTotal = result.pages;
            var pageSize = result.pageSize;
            var totalItemNums = result.recordsTotal;


            /** 设置左下角分页信息显示 */
            var currentPagenationInfo = "";
            if(0 != pageSize){
                currentPagenationInfo = "当前显示第 " + ((currentPage -1 ) * pageSize + 1 ) + " ~ " + ( (currentPage * pageSize) > totalItemNums ? totalItemNums : (currentPage * pageSize) ) + " 条，共 " + totalItemNums + " 条记录";
            }else{
                currentPagenationInfo = "当前显示第 1 ~ " + totalItemNums + " 条，共 " + totalItemNums + " 条记录";
            }

            if(currentPage === 0 && pageTotal === 0 && totalItemNums === 0){
                currentPagenationInfo = "";
            }
            $("#tableId_info").html(currentPagenationInfo);


            /** 设置右下角分页页签 */
            var pagenationContent ="";


            if(pageTotal <=3){
                for(var i = 1; i<=pageTotal; i++){
                    pagenationContent += '   <span><a class="paginate_button disabled" aria-controls="tableId" data-dt-idx="1" tabindex="0" href="javascript:void(0);" onclick="turnPage(' + i + ')">' + i + '</a></span>';
                }
            }else{
                // 总页数超过3页总是显示首页
                pagenationContent += '<span><a class="paginate_button previous disabled" aria-controls="tableId" data-dt-idx="0" tabindex="0" id="tableId_first_page" href="javascript:void(0);" onclick="turnPage(1)"> 首页 </a></span>';
                // 如果当前页不是第一页，则显示当前页的上一页
                if(1 != currentPage){
                    if(pageTotal === currentPage){
                        pagenationContent += '   <span><a class="paginate_button disabled" aria-controls="tableId" data-dt-idx="1" tabindex="0" href="javascript:void(0);" onclick="turnPage(' + (currentPage -2) + ')">' + (currentPage-2) + '</a></span>';
                    }
                    pagenationContent += '   <span><a class="paginate_button disabled" aria-controls="tableId" data-dt-idx="1" tabindex="0" href="javascript:void(0);" onclick="turnPage(' + (currentPage -1) + ')">' + (currentPage-1) + '</a></span>';
                }


                // 当前页签
                pagenationContent += '   <span id="current_page"><a class="paginate_button current" aria-controls="tableId" data-dt-idx="1" tabindex="0">' + currentPage + '</a></span>';


                if(pageTotal != currentPage){
                    pagenationContent += '   <span><a class="paginate_button disabled" aria-controls="tableId" data-dt-idx="1" tabindex="0" href="javascript:void(0);" onclick="turnPage(' + (currentPage +1) + ')">' + (currentPage+1) + '</a></span>';
                    if(1 === currentPage){
                        pagenationContent += '   <span><a class="paginate_button disabled" aria-controls="tableId" data-dt-idx="1" tabindex="0" href="javascript:void(0);" onclick="turnPage(' + (currentPage +2) + ')">' + (currentPage+2) + '</a></span>';
                    }
                }
                // 总页数超过3页总是显示末页
                pagenationContent += '<span><a class="paginate_button previous disabled" aria-controls="tableId" data-dt-idx="0" tabindex="0" id="tableId_last_page" href="javascript:void(0);" onclick="turnPage(' + pageTotal + ')"> 末页 </a></span>';
            }

            pagenationContent += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>跳转到第 <input type="text" id="targetPage"/> 页 <b><button id="goToTargetPage" onclick="gotoTargetPage(this)">Go</button>';

            if(0 === pageSize ){
                pagenationContent = "";
            }

            $("div[id='pagenationContainer']").html(pagenationContent);
        }
    );

}

/** 去指定页面 */
function gotoTargetPage(btn){
    itemNumPerPage = parseInt($.trim($("#pageSizeVal").val()));
    var targetPageNumber = parseInt($.trim($("#targetPage").val()));
    loadList(itemNumPerPage, targetPageNumber)
}

/** 列表搜索 */
$('#selectInfo').on( 'click', function () {
    var v= $("#mobile").val();
    console.log("v:"+v);

    loadList(itemNumPerPage, 1);

});



/** 批量删除 */
$("#deleteRow").click(function() {
//	alert("dd");
    array = new Array();
    $("input[type='checkbox']:gt(0):checked").each(
        function() {

            var accountId = $(this).parent().parent().find("td").eq(9).html();
//	    	array.push($(this).parent().next().text());
            array.push(accountId);
        }
    );
    if (array == 0) {	alert("请勾选!!");	}
    else {
        layer.confirm('确定删除选中行信息吗?', function(index){
            $.ajax({
                url:"/userAccount/deleteByIds",
                type:"POST",
                data:{"accountIds":array.toString()},
                success:function(result){
                    layer.msg(result.resultMsg,{icon:1,time:2000});
                    loadList(itemNumPerPage, 1);
                }
            })
        });
    }
});


var columsName = {
    "selectAll":"<input type='checkbox' name='checkAll' value='' onclick='checkAll(this)'>",
    "number":"编号",
    "accountId": "accountId",
    "appCode": "appCode",
    "accountName": "用户名称",
    "mobile": "手机号",
    "email": "邮箱",
    "authFlag": "认证",
    "validFlag": "有效",
    "createdDate": "创建时间",
    "createdUser": "创建人",
    "extn": "操作"
};
var columns = [
    {"data": "accountId", "title": columsName["selectAll"],"width":"2%"},
    {"data": "accountId", "title": columsName["number"],"width":"3%"},
    {"data": "accountName", "title": columsName["accountName"],"width":"10%"},
    {"data": "mobile", "title": columsName["mobile"],"width":"12%"},
    {"data": "email", "title": columsName["email"],"width":"13%"},
    {"data": "authFlag", "title": columsName["authFlag"],"width":"4%","sClass":"editClass"},
    {"data": "validFlag", "title": columsName["validFlag"],"width":"4%","sClass":"editClass"},
    {"data": "createdDate", "title": columsName["createdDate"],"width":"12%"},
    {"data": "accountId", "title": columsName["extn"],"width":"12%"},
    {"data": "accountId", "title": columsName["ceshi"],"width":"3%","sClass":"hidden"}
];

var commonObj = {
    init:function(){
        this.tabInit();
        this.editTab();
        this.deleteTab();
        this.detailTab();
//			this.ajaxData();
    },
    //表格初始化
    tabInit:function(tabId){
        $(tabId).DataTable({
            bFilter: false,
            bSort:false,
            //aLengthMenu:[10,20,40,80],                        // 每页展示数量(用户可选)
            paging:false,                                       // 禁用分页
            displayLength:itemNumPerPage,                       // 每页显示多少条记录
            ordering:false,                                      // 全局禁用排序
            //serverSide:true,
            columns:columns,
            //order:[7,'desc'],
            aoColumnDefs: [{ "bSortable": false, "aTargets": [0,1,2,3,4,5,6,7,8,9] },{ "visible": false}], // [{设置不允许排序的列},{隐藏排序图标}]
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
                this.api().column(5).nodes().each(function(cell, i){
                    var auth_status = cell.textContent;
                    var auth_status_info = auth_status == 0 ? '<font color="red" size="3">x</font>' : '<font size="3">√</font>';
                    cell.innerHTML =  auth_status_info + '<input class="tab_input" type="hidden" value="'+ auth_status +'"/>';
                });
                this.api().column(6).nodes().each(function(cell, i){
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
    //表格行内编辑
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
                //console.log(a,b)
                obj_option = $(this).find("option:selected").html();
                if(!obj_text.length && !obj_select.length){
                    if($(this).text() === 'x' || $(this).text() === '√') {
                        if($(this).text() === 'x'){
                            $(this).html("<input class='tab_input' type='text' value='0'>");
                        }else{
                            $(this).html("<input class='tab_input' type='text' value='1'>");
                        }
                    }else{
                        $(this).html("<input class='tab_input' type='text' value='" + $(this).text() + "'>");
                    }
                }else{
                    var modified_val = obj_text.val();
                    if(modified_val === '0' || modified_val === '1'){
                        var status_flag = obj_text.val();
                        modified_val = status_flag === '0' ? '<font color="red" size="3">x</font>' : '<font size="3">√</font>';
                        modified_val += '<input class="tab_input" type="hidden" value="'+ status_flag +'"/>';

                    }
                    $(this).html(modified_val);
                }



            })

            if(strOld == '编辑'){
                var currentId = $(this).attr("id");
            }else if(strOld == '确定'){
                RestfulClient.post("/userAccount/modifyUserAccountInfo",
                    {
                        "accountId" : $.trim($(this).parent().parent().find("td").eq(9).html()),
                        "authFlag": $.trim($(this).parent().parent().find("td").eq(5).children().eq(1).val()),
                        "validFlag": $.trim($(this).parent().parent().find("td").eq(6).children().eq(1).val())
                    },
                    function(result) {
                        layer.msg(result.resultMsg,{icon:1,time:2000});
                        loadList(itemNumPerPage, 1);
                    }
                );
            }

        })

    },
    //表格内容删除
    deleteTab:function(){
        $(".table").on("click",".uDeleteBtn",function(){
            var that = $(this);
            var id = $(this).parent().parent().find("td").eq(9).html();
            var table = $('#tableId').DataTable();
            var dataTest = table.row( this ).data();
            layer.confirm('确定删除当前信息吗?', function(index){
                $.ajax({
                    url:"/userAccount/deleteByIds",
                    type:"POST",
                    data:{"accountIds":id},
                    success:function(result){
                        layer.msg(result.resultMsg,{icon:1,time:1000});
                        loadList(itemNumPerPage, 1);
                    }
                })
            });
        })
    },
    //当前行内容详情
    detailTab:function(){
        var tabObj = {};
        var addTK = '';
        $(".table").on("click",".uDetailBtn",function(){
            var s = $(this).parent().parent().find("td");
            addTK ='<ul class="alert_ul">'
                +'<li class="div_wrap"><div class="li_div li_DivL">用户名称<i></i></div>:<div class="li_div li_DivR">'+s.eq(2).html()+'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">手机号<i></i></div>:<div class="li_div li_DivR">'+s.eq(3).html()+'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">邮箱<i></i></div>:<div class="li_div li_DivR">'+ s.eq(4).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">认证<i></i></div>:<div class="li_div li_DivR">'+ s.eq(5).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">有效<i></i></div>:<div class="li_div li_DivR">'+ s.eq(6).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL">创建时间<i></i></div>:<div class="li_div li_DivR">'+ s.eq(7).html() +'</div></li>'
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
    },
};
commonObj.init();

var fromTemplate = "<div class='pd-30'>"+
    "<form id='us'>"+
        "<table class='table table-border  table-bg  '"+
        "style='border: 0 !important; border-collapse: separate;'"+
        "id='accountTable'>"+
            "<tr>"+
            "<td class='text-r' width='20%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<font style='color: red'>*</font>账户APPID</td>"+
            "<td width='55%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<input name='appId' id='appId' class='input-text'"+
            "type='text' />"+
            "</td>"+
            "<td width='23%'><input type='button' id='genAppid' name='genAppid' class='btn btn-primary' onClick='genAppId();' value='生成APPID' /></td>"+
            "</tr>"+
            "<tr>"+
            "<td class='text-r' width='20%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<font style='color: red'>*</font>账户名称</td>"+
            "<td width='55%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<input name='accountName' id='accountName' class='input-text'"+
            "type='text' />"+
            "</td>"+
            "<td width='23%'>&nbsp;</td>"+
            "</tr>"+
            "<tr>"+
            "<td class='text-r' width='20%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<font style='color: red'>*</font>账户CODE</td>"+
            "<td width='55%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<input name='appCode' id='appCode' class='input-text'"+
            "type='text' />"+
            "</td>"+
            "<td width='23%'>&nbsp;</td>"+
            "</tr>"+
            "<tr>"+
            "<td class='text-r' width='20%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<font style='color: red'>*</font>手机号</td>"+
            "<td width='55%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<input name='mobile' id='mobile' class='input-text'"+
            "type='text' />"+
            "</td>"+
            "<td width='23%'>&nbsp;</td>"+
            "</tr>"+
            "<tr>"+
            "<td class='text-r' width='20%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<font style='color: red'>*</font>邮箱地址</td>"+
            "<td width='55%'"+
            "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
            "<input name='email' id='email' class='input-text'"+
            "type='text' />"+
            "</td>"+
            "<td width='23%'>&nbsp;</td>"+
            "</tr>"+
        "</table>"+
        "<input id='reqType' hidden='hidden' vale='${add}'>"+
    "</form>";




var UserCommon = function(){
    return {
        // 账户添加功能由open前台调用open后台接口
        // addAccounts : function(event,accountId){
        //     layer.open({
        //         type : 1,
        //         fixed : true, // 不固定
        //         shadeClose : false, // 点击遮罩关闭层
        //         title : [ (accountId ? "修改账户" : "添加账户"),'background-color: #F8F8F8;font-size:16px;border-bottom: 1px solid #eee;' ],
        //         //closeBtn : true,
        //         area : [ '700px', '470px' ],
        //         content :fromTemplate ,
        //         btn:[(accountId ? "修改" : "添加")],
        //         btnAlign : 'c',
        //         yes : function(index, dom){
        //             var data = $("#us").formData();
        //             //alert(JSON.stringify(data));
        //             var s = /^((?!<script>).)*$/;
        //             if(data.appId==""||data.accountName==""||data.appCode==""||data.mobile==""||data.email==""){
        //                 layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
        //                 return ;
        //             }else if(!s.test(data.accountName)){
        //                 layer.alert("您输入的账户代码含有非法字符，请重新录入");
        //                 return;
        //             }
        //             RestfulClient.post("/account/changeInfo",
        //                 {
        //                     "appId" : data.appId,
        //                     "accountName" : $.trim(data.accountName),
        //                     "appCode" : $.trim(data.appCode),
        //                     "mobile" : $.trim(data.mobile),
        //                     "email" : $.trim(data.email),
        //                     "reqType":"add"
        //                 },
        //                 function(result) {
        //                     layer.alert(result.resultMsg);
        //                     layer.close(index);
        //                     loadList();
        //                 }
        //             );
        //         },
        //         success : function(dom,index){
        //
        //         },
        //         end : function() {
        //             loadList();
        //         }
        //     });
        // }
    }
}();


function selectBoxInfo(){
    RestfulClient.post("/source/listAll", {},
        function(result) {
            data = result.dataList;
            for(var i in data){
                $("#selectBox").append("<option value='"+data[i].dataSourceId+"'>'"+data[i].sourceName+"'</option>");
            }
        }
    );
}

function genAppId(){
//	alert("genAppid");
    RestfulClient.post("/authconfig/getNewAppid", {},
        function(result) {
            data = result.data;
            $("#appId").val(data);
        }
    );
}
$(".table_box").delegate('#tableId tr', 'click', function () {
    var nTds = $("td",this);
    var sBrowser = $(nTds[11]).text();//获取第一列的值，其中第一列为隐藏列
});	

	