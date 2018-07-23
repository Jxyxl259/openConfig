// 合作方 js
var flag = true;
var data;
var itemNumPerPage;
var currentPage;

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
    itemNumPerPage = parseInt($.trim($("#pageSizeVal").val()));
    currentPage = parseInt($.trim($("#currentPageNo").val()));
    loadList(itemNumPerPage,currentPage);
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

    $("#currentPageNo").val(pageNum);

    RestfulClient.post(
        "/partner/list",
        {
            "partnerName" : $.trim($("#partnerName").val()),
            "createdUser" : $.trim($("#createdUser").val()),
            "partnerInvalid" : $.trim($("#validStatus").val()) == '' ? null : parseInt($.trim($("#validStatus").val())),
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

            if(totalItemNums === 0){
                currentPagenationInfo = "";
            }

            $("#tableId_info").html(currentPagenationInfo);


            /** 设置右下角分页页签 */
            var pagenationContent ="";


            if(pageTotal <=3){
                for(var i = 1; i<=pageTotal; i++){
                    if(i === currentPage){
                        pagenationContent += '   <span id="current_page"><a class="paginate_button current" aria-controls="tableId" data-dt-idx="1" tabindex="0" href="javascript:void(0);" onclick="turnPage(' + i + ')">' + i + '</a></span>';
                    }else{
                        pagenationContent += '   <span><a class="paginate_button disabled" aria-controls="tableId" data-dt-idx="1" tabindex="0" href="javascript:void(0);" onclick="turnPage(' + i + ')">' + i + '</a></span>';
                    }
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

    // TODO partner模块列表搜索功能...
    var v= $("#mobile").val();
    console.log("v:"+v);

    loadList(itemNumPerPage, 1);

});



/** 批量删除 */
$("#deleteRow").click(function() {
//	alert("dd");
    array = new Array();
    imgPathArray = new Array();
    $("input[type='checkbox']:gt(0):checked").each(
        function() {

            var partnerId = $(this).parent().parent().find("td").eq(11).html();
            array.push(partnerId);
            var productImgPath = $(this).parent().parent().find("td").eq(3).html();
            imgPathArray.push(productImgPath);
        }
    );
    if (array == 0) {	alert("请勾选!!");	}
    else {
        layer.confirm('确定删除选中行信息吗?', function(index){
            $.ajax({
                url:"/partner/deleteByIds",
                type:"POST",
                data:{
                    "ids":array.toString(),
                    "partnerImageFilePath":imgPathArray.toString()
                },
                success:function(result){
                    layer.msg(result.resultMsg,{icon:1,time:2000});
                    loadList(itemNumPerPage, 1);
                }
            })
        });
    }
});


/** 合作方添加*/
$("#addRow").on({ "click" : function(event){
        PartnerCommon.addPartner(event);
    }
});

/** 合作方修改 */
$("#modifyRow").on({'click' : function(event){
		// 获取到要修改的checkBox
		var item = $(":checkbox").filter(":checked");
		if(1 != item.length || 'checkAll' === $(item[0]).attr("name") ){
			alert("请选择一项进行修改！");
			return;
		}else {
            var partnerId = $(item[0]).parent("td").parent("tr").attr('tid');
        }

        PartnerCommon.modifyPartner(event, partnerId);
	}
});

var columsName = {
    "selectAll":"<input type='checkbox' name='checkAll' value='' onclick='checkAll(this)'>",
    "number":"编号",
    "partnerId": "partnerId",
    "partnerName": "合作方名称",
    "partnerImg": "合作方图片路径",
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
    /*3*/{"data": "partnerImg", "title": columsName["partnerImg"],"width":"15%"},
    /*4*/{"data": "partnerRemark", "title": columsName["partnerRemark"],"width":"15%","sClass":"editClass"},
    /*5*/{"data": "partnerInvalid", "title": columsName["validFlag"],"width":"4%","sClass":"editClass"},
    /*6*/{"data": "createdUser", "title": columsName["createdUser"],"width":"5%"},
    /*7*/{"data": "updatedUser", "title": columsName["updatedUser"],"width":"5%","sClass":"editClass"},
    /*8*/{"data": "partnerId", "title": columsName["extn"],"width":"10%"},
    /*9*/{"data": "createdDate", "title": columsName["createdDate"],"sClass":"hidden"},
    /*10*/{"data": "updateDate", "title": columsName["updateDate"],"sClass":"hidden"},
    /*11*/{"data": "partnerId", "title": columsName["ceshi"],"sClass":"hidden"}

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
    //表格行内编辑
    editTab:function(){

        $(".table").on("click",".uEditBtn",function(){
            var strOld = $(this).html();
            str = $(this).html()=="编辑"?"确定":"编辑";
            $(this).html(str);

            flag = !flag;
            flag ? $(this).removeClass("blueBtn") : $(this).addClass("blueBtn");

            var data = $(this).parent().siblings(".editClass");
            data.each(function(a,b){
                var obj_text = $(this).find("input:text");
                if(!obj_text.length){

                    // 开启当前 td节点 的编辑状态
                    change2EditStat(this);
                }else{

                    // 恢复当前 td节点 为展示状态
                    change2ShowStat(this, obj_text);
                }

            })

            if(strOld == '编辑'){
                var currentId = $(this).attr("id");
            }else if(strOld == '确定'){

                var tdNodes = $(this).parent().parent().find("td");

                var partnerId = parseInt($.trim(tdNodes.eq(11).html()));
                var partnerName = $.trim(tdNodes.eq(2).html());
                var partnerRemark = $.trim(tdNodes.eq(4).html());
                var partnerInvalid = $.trim(tdNodes.eq(5).children().eq(1).val());
                var updatedUser = $.trim(tdNodes.eq(7).html());

                if(isEmpty(partnerId) || isEmpty(partnerId) || isEmpty(partnerInvalid) || isEmpty(updatedUser)){
                    layer.alert('请完善添加信息之后提交');
                    return ;
                }

                RestfulClient.post("/partner/editPartnerInfo",
                    {
                        "partnerId" : partnerId,
                        "partnerName" : partnerName,
                        "partnerRemark" : partnerRemark,
                        "partnerInvalid": partnerInvalid,
                        "updatedUser": updatedUser
						//"test" : $("input[name='dataCheckBox']:checked:eq(0)").parent().parent().find("td").eq(2).html()
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
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>合作方名称</i></div>:<div class="li_div li_DivR">'+s.eq(2).html()+'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>合作方图片</i></div>:<div class="li_div li_DivR">'+s.eq(3).html()+'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>有效</i></div>:<div class="li_div li_DivR">'+ s.eq(5).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>创建时间</i></div>:<div class="li_div li_DivR">'+ s.eq(6).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>创建人</i></div>:<div class="li_div li_DivR">'+ s.eq(7).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>更新时间</i></div>:<div class="li_div li_DivR">'+ s.eq(11).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>更新人</i></div>:<div class="li_div li_DivR">'+ s.eq(10).html() +'</div></li>'
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


function change2EditStat(ele){

    // 启用编辑时显示 有效标识原始值
    if($(ele).text() === 'x' || $(ele).text() === '√') {
        if($(ele).text() === 'x'){
            $(ele).html("<input class='tab_input' type='text' value='0'>");
        }else{
            $(ele).html("<input class='tab_input' type='text' value='1'>");
        }
    }else{
        $(ele).html("<input class='tab_input' type='text' value='" + $(ele).text() + "'>");
    }

}

function change2ShowStat(ele, obj_text) {
    var modified_val = obj_text.val();

    if(modified_val === '0' || modified_val === '1'){
        var status_flag = obj_text.val();
        modified_val = status_flag === '0' ? '<font color="red" size="3">x</font>' : '<font size="3">√</font>';
        modified_val += '<input class="tab_input" type="hidden" value="'+ status_flag +'"/>';
        $(ele).html(modified_val);
    }else{
        $(ele).html(modified_val);
    }
}

function getModifyFormTemplate(){
    //$("input[name='dataCheckBox']:checked:eq(0)").parent().parent().find("td").eq(2).html()
    var tdEles = $("input[name='dataCheckBox']:checked:eq(0)").parent().parent().find("td");

    var modifyFromTemplate = "<div class='pd-30'>"+
        "<form id='partnerInfoModifyForm'>"+
        "<table class='table table-border  table-bg  '"+
        "style='border: 0 !important; border-collapse: separate;'"+
        "id='accountTable'>"+
        "<tr>"+
        "<td class='text-r' width='20%'"+
        "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "<font style='color: red'>*</font>合作方名称</td>"+
        "<td width='55%'"+
        "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "<input name='partnerName' id='partnerName' class='input-text'"+
        "type='text'" +
        "value='" + tdEles.eq(2).html() +"'/>"+
        "</td>"+
        "</tr>"+
        "<tr>"+
        "    <td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>" +
        "        合作方详情图片</td>"+
        "    <td width='55%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "        <input type='file' name='partnerImageFile' id='partnerImageFile'></td>"+
        "    <td width='23%'>&nbsp;</td>"+
        "</tr>"+
        "<tr>"+
        "<td class='text-r' width='20%'"+
        "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "<font style='color: red'>*</font>是否有效</td>"+
        "<td width='55%'"+
        "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "<input name='partnerInvalid' id='partnerInvalid' class='input-text'"+
        "type='text' placeholder='1:有效 0:无效'"+
        "value='" + tdEles.eq(5).children().eq(1).val() +"'/>"+
        "</td>"+
        "<td width='23%'>&nbsp;</td>"+
        "</tr>"+
        "<tr style='height: 150px;'>"+
        "<td class='text-r' width='20%'"+
        "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "<font style='color: red'>*</font>备注</td>"+
        "<td width='55%'"+
        "style='text-align: left !important; padding: 5px; word-break: break-all;height: 160px'>"+
        "<textarea name='partnerRemark' id='partnerRemark' style='width: 340px;height: 150px;border: 1px solid #ccc;' >" +
        "" + tdEles.eq(4).html() + ""+
        "</textarea>" +
        "</td>"+
        "<td width='23%'>&nbsp;</td>"+
        "</tr>"+
        "<tr>"+
        "<td class='text-r' width='20%'"+
        "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "<font style='color: red'>*</font>更新人</td>"+
        "<td width='55%'"+
        "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "<input name='updatedUser' id='updatedUser' class='input-text'"+
        "type='text'"+
        "value='" + tdEles.eq(7).html() +"'/>"+
        "</td>"+
        "<td width='23%'>&nbsp;</td>"+
        "</tr>"+
        "</table>"+
        "<input id='reqType' hidden='hidden' value='${add}'>"+
        "<input id='partnerImage' name='partnerImage' hidden='hidden' value='"+ tdEles.eq(3).html() +"'/>"+
        "<input id='partnerId' name='partnerId' hidden='hidden' value='"+ tdEles.eq(11).html() +"'/>"+
        "</form>";
	return modifyFromTemplate;
}


var PartnerCommon = function(){
    return {
        // 合作方添加
        addPartner : function(event){
            layer.open({
                type : 1,
                fixed : true, // 不固定
                shadeClose : false, // 点击遮罩关闭层
                title : ["添加合作伙伴信息",'background-color: #F8F8F8;font-size:16px;border-bottom: 1px solid #eee;' ],
                //closeBtn : true,
                area : [ '700px', '470px' ],
                content :addFromTemplate ,
                btn:["添加"],
                btnAlign : 'c',
                yes : function(index, dom){
                    var data = $("#us").formData();
                    //alert(JSON.stringify(data));
                    var s = /^((?!<script>).)*$/;
                    if(data.partnerName==""||data.partnerImg==""||data.partnerInvalid==""||data.createdUser==""){
                        layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                        return ;
                    }else if(!s.test(data.partnerName)){
                        layer.alert("您输入的账户代码含有非法字符，请重新录入");
                        return;
                    }

                    var formData = new FormData(document.getElementById("partnerInfoAddForm"));
                    $.ajax({
                        url:"/partner/addPartnerInfo",
                        async:false,
                        type:"POST",
                        data:formData,
                        processData:false,
                        contentType:false,
                        success:function(result){
                            layer.alert(result.resultMsg);
                            layer.close(index);
                            loadList(itemNumPerPage, 1);
                        }
                    });
                },
                success : function(dom,index){

                },
                end : function() {
                    loadList(itemNumPerPage, 1);
                }
            });
        },
        // 合作方信息修改
        modifyPartner : function(event,partnerId){
            layer.open({
                type : 1,
                fixed : true, // 不固定
                shadeClose : false, // 点击遮罩关闭层
                title : ["修改合作伙伴信息",'background-color: #F8F8F8;font-size:16px;border-bottom: 1px solid #eee;' ],
                //closeBtn : true,
                area : [ '700px', '470px' ],
                content : getModifyFormTemplate() ,
                btn:["修改"],
                btnAlign : 'c',
                yes : function(index, dom){
                    var data = $("#us").formData();
                    var s = /^((?!<script>).)*$/;
                    if(data.partnerName==""||data.partnerImg==""||data.partnerInvalid==""||data.updatedUser==""){
                        layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                        return ;
                    }else if(!s.test(data.partnerName)){
                        layer.alert("您输入的账户代码含有非法字符，请重新录入");
                        return;
                    }

                    var formData = new FormData(document.getElementById("partnerInfoModifyForm"));
                    $.ajax({
                        url:"/partner/modifyPartnerInfo",
                        async:false,
                        type:"POST",
                        data:formData,
                        processData:false,
                        contentType:false,
                        success:function(result){
                            layer.alert(result.resultMsg);
                            layer.close(index);
                            loadList(itemNumPerPage, parseInt($.trim($("#currentPageNo").val())));
                        }
                    });
                },
                success : function(dom,index){

                },
                end : function() {
                    loadList(itemNumPerPage, parseInt($.trim($("#currentPageNo").val())));
                }
            });
        }
    }
}();



$(".table_box").delegate('#tableId tr', 'click', function () {
    var nTds = $("td",this);
    var sBrowser = $(nTds[11]).text();//获取第一列的值，其中第一列为隐藏列
});



var addFromTemplate = "<div class='pd-30'>"+
    "<form id='partnerInfoAddForm'>"+
    "<table class='table table-border  table-bg  '"+
    "style='border: 0 !important; border-collapse: separate;'"+
    "id='accountTable'>"+
    "<tr>"+
    "<td class='text-r' width='20%'"+
    "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "<font style='color: red'>*</font>合作方名称</td>"+
    "<td width='55%'"+
    "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "<input name='partnerName' id='partnerName' class='input-text'"+
    "type='text' />"+
    "</td>"+
    "</tr>"+
    "<tr>"+
    "    <td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>" +
    "        <font style='color: red'>*</font>合作方详情图片</td>"+
    "    <td width='55%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "        <input type='file' name='partnerImageFile' id='partnerImageFile'></td>"+
    "    <td width='23%'>&nbsp;</td>"+
    "</tr>"+

    "<tr>"+
    "<td class='text-r' width='20%'"+
    "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "<font style='color: red'>*</font>是否有效</td>"+
    "<td width='55%'"+
    "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "<input name='partnerInvalid' id='partnerInvalid' class='input-text'"+
    "type='text' placeholder='1:有效 0:无效'/>"+
    "</td>"+
    "<td width='23%'>&nbsp;</td>"+
    "</tr>"+
    "<tr>"+
    "<td class='text-r' width='20%'"+
    "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "<font style='color: red'>*</font>备注</td>"+
    "<td width='55%'"+
    "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "<input name='partnerRemark' id='partnerRemark' class='input-text'"+
    "type='text' />"+
    "</td>"+
    "<td width='23%'>&nbsp;</td>"+
    "</tr>"+
    "<tr>"+
    "<td class='text-r' width='20%'"+
    "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "<font style='color: red'>*</font>创建人</td>"+
    "<td width='55%'"+
    "style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
    "<input name='createdUser' id='createdUser' class='input-text'"+
    "type='text' />"+
    "</td>"+
    "<td width='23%'>&nbsp;</td>"+
    "</tr>"+
    "</table>"+
    "<input id='reqType' hidden='hidden' vale='${add}'>"+
    "</form>";

