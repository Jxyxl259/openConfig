// 合作方 js
var flag = true;
var data;
var itemNumPerPage;
var currentPage;
var currentTrContent;
var tr_ele;

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
        "/product/list",
        {
            "productName" : $.trim($("#productName").val()),
            "createdUser" : $.trim($("#createdUser").val()),
            "productInvalid" : $.trim($("#validStatus").val()) == '' ? null : parseInt($.trim($("#validStatus").val())),
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

            var productId = $(this).parent().parent().find("td").eq(10).html();
//	    	array.push($(this).parent().next().text());
            array.push(productId);
        }
    );
    if (array == 0) {	alert("请勾选!!");	}
    else {
        layer.confirm('确定删除选中行信息吗?', function(index){
            $.ajax({
                url:"/product/deleteByIds",
                type:"POST",
                data:{"productIds":array.toString()},
                success:function(result){
                    layer.msg(result.resultMsg,{icon:1,time:2000});
                    loadList(itemNumPerPage, 1);
                }
            })
        });
    }
});


/** 产品详情展示信息添加*/
$("#addRow").on({ "click" : function(event){

        PartnerCommon.showAddProductForm(event);

    // 将 添加产品信息的form表单所在div元素的display:none属性去掉
    //$(".productInfoFormContainer").attr("style","");
        //PartnerCommon.addProduct(event);
        //setTimeout('selectBoxInfo()',500);
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

        PartnerCommon.modifyPartner(event, productId);
        setTimeout('selectBoxInfo()',500);
    }
});

var columsName = {
    "selectAll":"<input type='checkbox' name='checkAll' value='' onclick='checkAll(this)'>",
    "number":"编号",
    "productId": "productId",
    "productName": "产品名称",
    "productImg": "展示图片",
    "productInvalid": "有效",
    "productRemark":"产品备注",
    "productDivHtml": "产品展示页HTML代码",
    "productFiledAa": "产品备用字段",
    "createdDate": "创建时间",
    "createdUser": "创建人",
    "extn": "操作",
    "updatedUser": "更新人",
    "productImgUrl": "产品图片路径"
};
var columns = [
    /*0*/{"data": "productId", "title": columsName["selectAll"],"width":"2%"},//checkbox
    /*1*/{"data": "productId", "title": columsName["number"],"width":"3%"},//在当前页中显示的序号
    /*2*/{"data": "productName", "title": columsName["productName"],"width":"10%","sClass":"editClass"},//产品名称
    /*3*/{"data": "productImg", "title": columsName["productImg"],"width":"5%"},//产品展示缩略图
    /*4*/{"data": "productDivHtml", "title": columsName["productDivHtml"],"width":"15%","sClass":"editClass"},//产品展示HTML代码
    /*5*/{"data": "productRemark", "title": columsName["productRemark"],"width":"15%","sClass":"editClass"},//产品备注
    /*6*/{"data": "productInvalid", "title": columsName["productInvalid"],"width":"4%","sClass":"editClass"},//有效标识
    /*7*/{"data": "createdDate", "title": columsName["createdDate"],"width":"3%","sClass":"hidden"},//创建时间
    /*8*/{"data": "createdUser", "title": columsName["createdUser"],"width":"7%"},//创建人
    /*9*/{"data": "productId", "title": columsName["extn"],"width":"10%"},//操作
    /*10*/{"data": "productId", "title": columsName["ceshi"],"width":"3%","sClass":"hidden"},//测试
    /*11*/{"data": "updatedUser", "title": columsName["updatedUser"],"width":"3%","sClass":"hidden"},//更新用户
    /*12*/{"data": "updateDate", "title": columsName["updateDate"],"width":"3%","sClass":"hidden"},//更新时间
    /*13*/{"data": "productImg", "title": columsName["productImgUrl"],"width":"10%","sClass":"hidden"}//产品图片url路径


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
                // 产品展示缩略图
                this.api().column(3).nodes().each(function(cell, i){
                    var imgUrl = cell.textContent;
                    cell.innerHTML = '<img src="../../..'+ imgUrl +'" style="width: 60px;height: 60px"/>';
                });
                // 产品展示页HTML代码
                this.api().column(4).nodes().each(function(cell, i){
                    var productDivHtml = String(cell.innerHTML);
                    // 使用 innerText 将HTML代码进行转义，转义后在页面显示为纯文本，不被当做HTML代码解析
                    cell.innerText = productDivHtml;
                });
                this.api().column(6).nodes().each(function(cell, i){
                    var valid_status = cell.textContent;
                    var valid_status_info = valid_status == 0 ? '<font color="red" size="3">x</font>' : '<font size="3">√</font>';
                    cell.innerHTML = valid_status_info + '<input class="tab_input" type="hidden" value="'+ valid_status +'"/>';
                });
                this.api().column(9).nodes().each(function(cell, i){
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
            if("编辑" === strOld){
                //保留修改之前的 tr元素内的HTML代码
                currentTrContent = $(this).parent().parent().html();
            }
            tr_ele = $(this).parent().parent();
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
                RestfulClient.post("/product/modifyProductInfo",
                    {
                        "productId" : $.trim($(this).parent().parent().find("td").eq(10).html()),
                        "productName" : $.trim($(this).parent().parent().find("td").eq(2).html()),
                        "productImg" : $.trim($(this).parent().parent().find("td").eq(13).html()),
                        "productDivHtml" : $.trim($(this).parent().parent().find("td").eq(4).html()),
                        "productRemark" : $.trim($(this).parent().parent().find("td").eq(5).html()),
                        "productInvalid": $.trim($(this).parent().parent().find("td").eq(6).children().eq(1).val())
                        //"test" : $("input[name='dataCheckBox']:checked:eq(0)").parent().parent().find("td").eq(2).html()
                    },
                    function(result) {
                        if(result.resultCode != 0){
                            tr_ele.html(currentTrContent);
                            layer.msg(result.resultMsg,{icon:7,time:2000});
                            return;
                        }else{
                            layer.msg(result.resultMsg,{icon:1,time:2000});
                            loadList(itemNumPerPage, 1);
                        }
                    }
                );
            }

        })

    },
    //表格内容删除
    deleteTab:function(){
        $(".table").on("click",".uDeleteBtn",function(){
            var that = $(this);
            var id = $(this).parent().parent().find("td").eq(10).html();
            var table = $('#tableId').DataTable();
            var dataTest = table.row( this ).data();
            layer.confirm('确定删除当前信息吗?', function(index){
                $.ajax({
                    url:"/product/deleteByIds",
                    type:"POST",
                    data:{"productIds":id},
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
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>有效</i></div>:<div class="li_div li_DivR">'+ s.eq(6).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>创建时间</i></div>:<div class="li_div li_DivR">'+ s.eq(7).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>创建人</i></div>:<div class="li_div li_DivR">'+ s.eq(8).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>更新时间</i></div>:<div class="li_div li_DivR">'+ s.eq(11).html() +'</div></li>'
                +'<li class="div_wrap"><div class="li_div li_DivL"><i>更新人</i></div>:<div class="li_div li_DivR">'+ s.eq(12).html() +'</div></li>'
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



var PartnerCommon = function(){
    return {
        // 弹出添加产品表单
        showAddProductForm : function(event){
            layer.open({
                type: 2,
                area: ['700px', '550px'],
                fixed: false, //不固定
                maxmin: true,
                content: './fragement/product_add_form.html'
            });
        },

        // TODO 修改产品信息也使用弹出html页面的方式
        // 合作方信息修改
        modifyPartner : function(event,partnerId){
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
                    if(data.productName==""||data.productImg==""||data.partnerInvalid==""||data.updatedUser==""){
                        layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                        return ;
                    }else if(!s.test(data.partnerName)){
                        layer.alert("您输入的账户代码含有非法字符，请重新录入");
                        return;
                    }
                    RestfulClient.post("/product/modifyProductInfo",
                        {
                            "partnerId" : parseInt($.trim(partnerId)),
                            "partnerName" : $.trim(data.partnerName),
                            "partnerInvalid" : $.trim(data.partnerInvalid),
                            "partnerImg" : $.trim(data.partnerImg),
                            "partnerRemark" : $.trim(data.partnerRemark),
                            "updatedUser" : $.trim(data.updatedUser)
                        },
                        function(result) {
                            layer.alert(result.resultMsg);
                            layer.close(index);
                            loadList(itemNumPerPage, parseInt($.trim($("#currentPageNo").val())));
                        }
                    );
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