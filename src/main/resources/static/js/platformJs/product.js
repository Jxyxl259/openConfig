// 合作方 js
var flag = true;
var data;
var currentTrContent;
var tr_ele;


/** 加载列表数据 */
function loadList(pageSize, pageNum){

    $("#currentPageNo").val(pageNum);

    RestfulClient.post(
        "/product/list",
        {
            "productName" : $.trim($("#productName").val()),
            "createdUser" : $.trim($("#createdUser").val()),
            "productInvalid" : $("#query_validStatus :selected").eq(0).val(),
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

    RestfulClient.post("/product/list",
        {
            "productName": $.trim($("#productName").val()),
            "createdUser": $.trim($("#createdUser").val()),
            "productInvalid": $("#query_validStatus :selected").eq(0).val(),
            "pageSize":itemNumPerPage,
            "pageNum":currentPage
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



/** 批量删除 */
$("#deleteRow").click(function() {
    idsArray = new Array();
    imgPathArray = new Array();
    $("input[type='checkbox']:gt(0):checked").each(
        function() {
            var productId = $(this).parent().parent().find("td").eq(11).html();
            idsArray.push(productId);
            var productImgPath = $(this).parent().parent().find("td").eq(3).html();
            imgPathArray.push(productImgPath);
        }
    );
    if (idsArray == 0) {	alert("请勾选!!");	}
    else {
        layer.confirm('确定删除选中行信息吗?', function(index){
            $.ajax({
                url:"/product/deleteByIds",
                type:"POST",
                data:{
                    "ids":idsArray.toString(),
                    "productImageFilePath":imgPathArray.toString()
                },
                success:function(result){
                    layer.msg(result.resultMsg,{icon:1,time:2000});
                    loadList(itemNumPerPage, 1);
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
                }
            })
        });
    }
});


/** 产品详情展示信息添加*/
$("#addRow").on({ "click" : function(event){
        ProductCommon.showAddProductForm(event);
    }
});

/** 产品详情展示信息修改 */
$("#modifyRow").on({'click' : function(event){
        // 获取到要修改的checkBox
        var item = $(":checkbox").filter(":checked");
        if(1 != item.length || 'checkAll' === $(item[0]).attr("name") ){
            alert("请选择一项进行修改！");
            return;
        }else {
            var productId = $(item[0]).parent("td").parent("tr").attr('tid');
        }

        ProductCommon.modifyProduct(event, productId);
    }
});

var columsName = {
    "selectAll":"<input type='checkbox' name='checkAll' value='' onclick='checkAll(this)'>",
    "number":"编号",
    "productId": "productId",
    "productName": "产品名称",
    "productImg": "图片存放路径",
    "productInvalid": "有效",
    "productRemark":"产品备注",
    "productDivHtml": "产品展示页HTML代码",
    "productFiledAa": "产品备用字段",
    "createdDate": "创建时间",
    "createdUser": "创建人",
    "extn": "操作",
    "updatedUser": "更新人",
    "productImgUrl": "产品图片路径",
    "productTxt": "产品介绍"
};
var columns = [
    /*0*/{"data": "productId", "title": columsName["selectAll"],"width":"2%"},//checkbox
    /*1*/{"data": "productId", "title": columsName["number"],"width":"3%"},//在当前页中显示的序号
    /*2*/{"data": "productName", "title": columsName["productName"],"width":"10%","sClass":"editClass"},//产品名称
    /*3*/{"data": "productImg", "title": columsName["productImg"],"width":"10%"},//产品图片存放路径
    /*4*/{"data": "productDivHtml", "title": columsName["productDivHtml"],"width":"15%","sClass":"editClass"},//产品展示HTML代码
    /*5*/{"data": "productRemark", "title": columsName["productRemark"],"width":"15%","sClass":"editClass"},//产品备注
    /*6*/{"data": "productInvalid", "title": columsName["productInvalid"],"width":"4%","sClass":"editClass"},//有效标识
    /*7*/{"data": "createdDate", "title": columsName["createdDate"],"width":"3%","sClass":"hidden"},//创建时间
    /*8*/{"data": "createdUser", "title": columsName["createdUser"],"width":"4%"},//创建人
    /*9*/{"data": "updatedUser", "title": columsName["updatedUser"],"width":"4%","sClass":"editClass"},//更新人
    /*10*/{"data": "productId", "title": columsName["extn"],"width":"10%"},//操作
    /*11*/{"data": "productId", "title": columsName["ceshi"],"sClass":"hidden"},//测试
    /*12*/{"data": "updateDate", "title": columsName["updateDate"],"sClass":"hidden"},//更新时间
    /*13*/{"data": "productImg", "title": columsName["productImgUrl"],"sClass":"hidden"},//产品图片url路径
    /*14*/{"data": "productTxt", "title": columsName["productTxt"],"sClass":"hidden"}//产品介绍


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
            aoColumnDefs: [{ "bSortable": false, "aTargets": [0,1,2,3,4,5,6,7,8,9,10,11,12,13] },{ "visible": false}], // [{设置不允许排序的列},{隐藏排序图标}]
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
                // 产品展示页HTML代码
                this.api().column(4).nodes().each(function(cell, i){
                    $(cell).attr("class","editClass html_code");
                    var productDivHtml = String(cell.innerHTML);
                    // 使用 innerText 将HTML代码进行转义，转义后在页面显示为纯文本，不被当做HTML代码解析
                    cell.innerText = productDivHtml;
                });
                this.api().column(6).nodes().each(function(cell, i){
                    var valid_status = cell.textContent;
                    var valid_status_info = valid_status == 0 ? '<font color="red" size="3">x</font>' : '<font size="3">√</font>';
                    cell.innerHTML = valid_status_info + '<input class="tab_input" type="hidden" value="'+ valid_status +'"/>';
                });
                this.api().column(10).nodes().each(function(cell, i){
                    var id = cell.textContent;
                    cell.innerHTML ='<button class="edi_btn uEditBtn" id='+id+'>编辑</button><button class="edi_btn uDetailBtn">详情</button><button class="edi_btn uDeleteBtn"><i class="Hui-iconfont">&#xe6e2;</i></button>';
                })
            }
        });
    },
    //表格行内编辑
    editTab:function(){

        //弹出模态框



        // $(".table").on("click",".uEditBtn",function(){
        //     var strOld = $(this).html();
        //
        //     if("编辑" === strOld){
        //         //保留修改之前的 tr元素内的HTML代码
        //         currentTrContent = $(this).parent().parent().html();
        //     }
        //     tr_ele = $(this).parent().parent();
        //     str = $(this).html()=="编辑"?"确定":"编辑";
        //     $(this).html(str);
        //     flag = !flag;
        //     if(flag){
        //         $(this).removeClass("blueBtn");
        //     }else{
        //         $(this).addClass("blueBtn");
        //     }
        //     var data = $(this).parent().siblings(".editClass");
        //     data.each(function(a,b){
        //
        //         var obj_text = $(this).find("input:text");
        //         var obj_select = $(this).find("select");
        //         var text_select = "<select class='tab_select'><option value='0'>是</option><option value='1'>否</option></select>";
        //         //console.log(a,b)
        //         obj_option = $(this).find("option:selected").html();
        //         if(!obj_text.length && !obj_select.length){
        //             if($(this).text() === 'x' || $(this).text() === '√') {
        //                 if($(this).text() === 'x'){
        //                     $(this).html("<input class='tab_input' type='text' value='0'>");
        //                 }else{
        //                     $(this).html("<input class='tab_input' type='text' value='1'>");
        //                 }
        //             }else{
        //                 $(this).html("<input class='tab_input' type='text' value='" + $(this).text() + "'>");
        //             }
        //         }else{
        //             var modified_val = obj_text.val();
        //             if(modified_val === '0' || modified_val === '1'){
        //                 var status_flag = obj_text.val();
        //                 modified_val = status_flag === '0' ? '<font color="red" size="3">x</font>' : '<font size="3">√</font>';
        //                 modified_val += '<input class="tab_input" type="hidden" value="'+ status_flag +'"/>';
        //                 $(this).html(modified_val);
        //             }else{
        //                 this.innerText = modified_val;
        //             }
        //         }
        //
        //
        //
        //     });
        //
        //     if(strOld == '编辑'){
        //         var currentId = $(this).attr("id");
        //     }else if(strOld == '确定'){
        //
        //         var productId_td_ele = $(this).parent().parent().find("td").eq(11);
        //         var productName_td_ele =  $(this).parent().parent().find("td").eq(2);
        //         var productDivHtml_td_ele = $(this).parent().parent().find("td").eq(4);
        //         var productRemark_td_ele = $(this).parent().parent().find("td").eq(5);
        //         var productInvalid_td_ele = $(this).parent().parent().find("td").eq(6);
        //         var updatedUser_td_ele = $(this).parent().parent().find("td").eq(9);
        //
        //         var productId = $.trim(productId_td_ele.html());
        //         var productName = $.trim(productName_td_ele.html());
        //         var productDivHtml = $.trim(String(productDivHtml_td_ele[0].innerText));
        //         var productRemark = $.trim(productRemark_td_ele.html());
        //         var productInvalid = $.trim(productInvalid_td_ele.children().eq(1).val());
        //         var updatedUser = $.trim(updatedUser_td_ele.html());
        //
        //         if(isEmpty(productId) || isEmpty(productName) || isEmpty(productDivHtml) || isEmpty(productRemark) || isEmpty(productInvalid) || isEmpty(updatedUser)){
        //             layer.alert('请完善添加信息之后提交');
        //             return ;
        //         }
        //
        //         RestfulClient.post("/product/editProductInfo",
        //             {
        //                 "productId" : productId,
        //                 "productName" : productName,
        //                 "productDivHtml" : productDivHtml,
        //                 "productRemark" : productRemark,
        //                 "productInvalid": productInvalid,
        //                 "updatedUser": updatedUser
        //             },
        //             function(result) {
        //                 if(result.resultCode != 0){
        //                     tr_ele.html(currentTrContent);
        //                     layer.msg(result.resultMsg,{icon:7,time:2000});
        //                     return;
        //                 }else{
        //                     layer.msg(result.resultMsg,{icon:1,time:2000});
        //                 }
        //             }
        //         );
        //     }
        //
        // })

    },
    //表格内容删除
    deleteTab:function(){
        $(".table").on("click",".uDeleteBtn",function(){
            var that = $(this);
            var id = $(this).parent().parent().find("td").eq(11).html();
            var imagePath = $(this).parent().parent().find("td").eq(3).html();
            var table = $('#tableId').DataTable();
            var dataTest = table.row( this ).data();
            layer.confirm('确定删除当前信息吗?', function(index){
                $.ajax({
                    url:"/product/deleteByIds",
                    type:"POST",
                    data:{
                        "ids":id,
                        "productImageFilePath":imagePath
                    },
                    success:function(result){
                        layer.msg(result.resultMsg,{icon:1,time:1000});
                        loadList(itemNumPerPage, 1);
                    }
                })
            });
        })
    },

    /** 当前行内容详情 */
    detailTab:function(){
        var tabObj = {};
        var addTK = '';

        $(".table").on("click",".uDetailBtn",function(){
            var s = $(this).parent().parent().find("td");
            addTK =

            '    <table class="table table-border  table-bg product_detail"'+
            '           id="product_detail_table">'+
            '        <tbody>'+
            '        <tr>'+
            '            <td class="item" width="20%" >'+
            '                产品名称</td>'+
            '            <td class="content_td">'+
            '                <div class="content_div">'+ s.eq(2).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr >'+
            '            <td class="item text_massive" width="20%" >'+
            '                产品介绍</td>'+
            '            <td class="content_td text_massive">'+
            '                <div class="content_div">'+ s.eq(14).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr >'+
            '            <td class="item text_massive" width="20%" >'+
            '                产品备注</td>'+
            '            <td class="content_td text_massive">'+
            '                <div class="content_div">'+ s.eq(5).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr >'+
            '            <td class="item text_massive" width="20%">'+
            '                HTML 代码</td>'+
            '            <td class="content_td text_massive">'+
            '                <div class="content_div">'+ s.eq(4).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr>'+
            '            <td class="item" width="20%" >'+
            '                图片路径</td>'+
            '            <td class="content_td">'+
            '                <div class="content_div">'+ s.eq(3).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr>'+
            '            <td class="item" width="20%" >'+
            '                是否有效'+
            '            </td>'+
            '            <td class="content_td">'+
            '                <div class="content_div">'+ s.eq(6).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr>'+
            '            <td class="item" width="20%" >'+
            '                备用字段Aa</td>'+
            '            <td class="content_td">'+
            '                <div class="content_div"></div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr>'+
            '            <td class="item" width="20%" >'+
            '                创建人</td>'+
            '            <td class="content_td">'+
            '               <div class="content_div">'+ s.eq(8).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr>'+
            '            <td class="item" width="20%" >'+
            '                创建时间</td>'+
            '            <td class="content_td">'+
            '               <div class="content_div">'+ s.eq(7).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr>'+
            '            <td class="item" width="20%" >'+
            '                修改人</td>'+
            '            <td class="content_td">'+
            '               <div class="content_div">'+ s.eq(9).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        <tr>'+
            '            <td class="item" width="20%" >'+
            '                修改时间</td>'+
            '            <td class="content_td">'+
            '               <div class="content_div">'+ s.eq(12).html() +'</div></td>'+
            '            <td width="10%">&nbsp;</td>'+
            '        </tr>'+
            '        </tbody>'+
            '    </table>';

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
    loadData:function(resultMsg) {
        result = resultMsg.data;
        data = result.dataList;
        commonObj.tabInit("#tableId");
        paginationInfo();

    }
};
commonObj.init();




function getModifyFormTemplate(){

    var tdEles = $("input[name='dataCheckBox']:checked:eq(0)").parent().parent().find("td");

    var modifyFromTemplate = ""+

    "<div class='pd-30'>"+
    "<form id='productInfoModifyForm'>"+
    "<table class='table table-border  table-bg  ' style='border: 0 !important; border-collapse: separate;' id='accountTable'>"+
        "<tr>"+
            "<td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<font style='color: red'>*</font>产品名称</td>"+
            "<td width='55%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<input name='productName' id='productName' class='input-text' type='text' value='" + tdEles.eq(2).html() +"'/></td>"+
            "<td width='10%'>&nbsp;</td>"+
        "</tr>"+
        "<tr>"+
            "<td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<font style='color: red'>*</font>产品展示页HTML代码</td>"+
            "<td width='55%' style='text-align: left !important; padding: 5px; word-break: break-all;height: 160px'>"+
                "<textarea name='productDivHtml' id='productDivHtml' style='width: 340px;height: 100px;border: 1px solid #ccc;' >" +
                "" + tdEles.eq(4).html() + ""+
                "</textarea> </td>"+
            "<td width='10%'>&nbsp;</td>"+
        "</tr>"+
        "<tr>"+
            "<td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<font style='color: red'>*</font>产品介绍</td>"+
            "<td width='55%' style='text-align: left !important; padding: 5px; word-break: break-all;height: 160px'>"+
                "<textarea name='productTxt' id='productTxt' style='width: 340px;height: 100px;border: 1px solid #ccc;' >" +
                "" + tdEles.eq(14).html() + ""+
                "</textarea></td>"+
            "<td width='10%'>&nbsp;</td>"+
        "</tr>"+
        "<tr>"+
            "<td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<font style='color: red'>*</font>产品备注</td>"+
            "<td width='55%' style='text-align: left !important; padding: 5px; word-break: break-all;height: 160px'>"+
                "<textarea name='productRemark' id='productRemark' style='width: 340px;height: 100px;border: 1px solid #ccc;' >" +
                "" + tdEles.eq(5).html() + ""+
                "</textarea></td>"+
            "<td width='10%'>&nbsp;</td>"+
        "</tr>"+
        "<tr>"+
            "<td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<font style='color: red'>*</font>是否有效</td>"+
            "<td width='55%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<input name='productInvalid' id='productInvalid' class='input-text' type='text' placeholder='1:有效 0:无效' " +
                        "value='" + tdEles.eq(6).children().eq(1).val() +"'/></td>"+
            "<td width='10%'>&nbsp;</td>"+
        "</tr>"+
        "<tr>"+
        "    <td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>" +
        "        产品图片</td>"+
        "    <td width='55%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
        "        <input type='file' name='productImageFile' id='productImageFile'></td>"+
        "    <td width='23%'>&nbsp;</td>"+
        "</tr>"+
        "<tr>"+
            "<td class='text-r' width='20%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<font style='color: red'>*</font>更新人</td>"+
            "<td width='55%' style='text-align: right !important; padding: 8px; line-height: 20px; word-break: break-all;'>"+
                "<input name='updatedUser' id='updatedUser' class='input-text' type='text'"+
                        "value='" + tdEles.eq(9).html() +"'/></td>"+
            "<td width='10%'>&nbsp;</td>"+
        "</tr>"+
    "</table>"+
    "<input id='reqType' hidden='hidden' value='${add}'>"+
    "<input id='productId' name='productId' hidden='hidden' value='"+ tdEles.eq(11).html() +"'/>"+
    "<input id='productImage' name='productImage' hidden='hidden' value='"+ tdEles.eq(3).html() +"'/>"+
    "</form>";

    return modifyFromTemplate;
}


var ProductCommon = function(){
    return {
        // 弹出添加产品表单
        showAddProductForm : function(event){
            layer.open({
                type: 2,
                area: ['700px', '520px'],
                fixed: false, //不固定
                maxmin: true,
                content: './fragement/product_add_form.html'
            });
        },

        // 产品信息修改
        modifyProduct : function(event,productId){
            layer.open({
                type : 1,
                fixed : true, // 不固定
                shadeClose : false, // 点击遮罩关闭层
                title : ["修改产品详情展示信息",'background-color: #F8F8F8;font-size:16px;border-bottom: 1px solid #eee;' ],
                //closeBtn : true,
                area : [ '700px', '470px' ],
                content : getModifyFormTemplate() ,
                btn:["修改"],
                btnAlign : 'c',
                yes : function(index, dom){
                    var data = $("#us").formData();
                    //alert(JSON.stringify(data));
                    var s = /^((?!<script>).)*$/;
                    if(data.productName==""|| data.productDivHtml ==""|| data.productRemark==""||data.productInvalid==""||data.updatedUser==""){
                        layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                        return ;
                    }

                    var formData = new FormData(document.getElementById("productInfoModifyForm"));
                    $.ajax({
                        url:"/product/modifyProductInfo",
                        async:false,
                        type:"POST",
                        data:formData,
                        processData:false,
                        contentType:false,
                        success:function(result){
                            layer.alert(result.resultMsg);
                            layer.close(index);
                            loadList(itemNumPerPage, parseInt($.trim($("#currentPageNo").val())));
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown){
                            layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
                        }
                    });
                },
                success : function(dom,index){

                },
                end : function() {

                }
            });
        }
    }
}();
