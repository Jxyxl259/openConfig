// 合作方 js
var data;

/** 加载列表数据 */
function loadList(pageSize, pageNum){
    $("#currentPageNo").val(pageNum);
    conditionQuery("/product/list");

}

/** 列表条件搜索 */
$('#selectInfo').on( 'click', function () {
    conditionQuery("/product/list");
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
    /*3*/{"data": "productImg", "title": columsName["productImg"],"width":"10%","sClass":"editClass"},//产品图片路径
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
        this.addNew();
        this.editTab();
        this.deleteTab();
        this.deleteAll();
        this.detailTab();
    },
    /** 表格初始化 */
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
                this.api().column(3).nodes().each(function(cell, i){
                    var impPath = cell.textContent;
                    cell.innerHTML = '<img src="../../../' + impPath + '" style="width: 60px;height: 60px"  ismap/>';
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
    /** 产品详情展示信息添加*/
    addNew:function(){
        $("#addRow").on({ "click" : function(event){
                var img = $("<img />");
                $(".text_picWrap").html(img);
                ProductCommon.changeFile();
                ProductCommon.addProduct(event);
            }
        });
    },
    /** 产品信息修改 */
    editTab:function(){
        //弹出模态框
        $("#tableId").on("click",".uEditBtn",function(){
            var editContent = $(this).parent("td").parent("tr").find(".editClass");
            $("#modifyProductName").val(editContent.eq(0).text());       //产品名称
            $("#modifyProductDivHtml").val(editContent.eq(2).text());    //产品展示HTML代码
            $("#modifyProductRemark").val(editContent.eq(3).text());     //产品备注
            $("#modifyProductTxt").val($(this).parent("td").parent("tr").children().eq(-1).text());//产品介绍
            $(".text_picWrap").empty().append(editContent.eq(1).html()); //产品图片

            if( editContent.eq(4).find("input").val() == "1" ){          //有效标识
                $("#haveEffect").prop("checked",true);
            }else{
                $("#NoEffect").prop("checked",true);
            }

            $("#modifyProductId").val(this.id);   //要修改的ProductId

            var imgUrl = editContent.eq(1).children().eq(0).attr("src");
            $("#picFileNameBeforeModifiedId").val(imgUrl.substring(imgUrl.lastIndexOf('/')+1,imgUrl.length)); // 修改之前的图片名
            ProductCommon.changeFile();
            ProductCommon.modifyProduct(this.id);
        });
    },
    /** 产品信息删除 */
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
    /** 批量删除 */
    deleteAll:function(){
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
    },
    /** 产品信息详情 */
    detailTab:function(){
        $(".table").on("click",".uDetailBtn",function(){
            var s = $(this).parent().parent().find("td");
            $("#detail_productName").html(s.eq(2).html());
            $("#detail_productTxt").html(s.eq(14).html());
            $("#detail_productRemark").html(s.eq(5).html());
            $("#detail_productDivHtml").html(s.eq(4).html());
            $("#detail_productImg").html(s.eq(3).html());
            $("#detail_productInvalid").html(s.eq(6).html());
            $("#detail_createdUser").html(s.eq(8).html());
            $("#detail_createdDate").html(s.eq(7).html());
            $("#detail_updatedUser").html(s.eq(9).html());
            $("#detail_updateDate").html(s.eq(12).html());

            layer.open({
                type :1,
                title: ['查看详情'],
                fixed : true,                   // 不固定
                area : [ '700px', '470px' ],
                content : $("#showDetailDiv")
            });
        })
    }
};
commonObj.init();


var ProductCommon = function(){
    return {
        /** 弹出添加表单 */
        addProduct : function(event){
            layer.open({
                type : 1,
                title : ["添加产品信息"],
                area : [ '700px', '350px' ],
                content : $("#addFromDiv"),
                btn:["添加"],
                yes : function(index, dom){
                    var formdata = new FormData(document.getElementById("productInfoAddForm"));
                    console.log(formdata);
                    var s = /^((?!<script>).)*$/;
                    if($.trim(formdata.get("productName"))==""
                        || $.trim(formdata.get("productImageFile").name)==""
                        || $.trim(formdata.get("productTxt"))==""
                        || $.trim(formdata.get("productDivHtml"))==""
                        || $.trim(formdata.get("productInvalid"))==""
                        || $.trim(formdata.get("productRemark"))==""){
                        layer.alert('请完善添加信息之后提交');
                        return ;
                    }else if(!s.test($.trim(formdata.get("productName")))){
                        layer.alert("您输入的合作方名称含有非法字符，请重新录入");
                        return;
                    }
                    $.ajax({
                        url:"/product/addProductInfo",
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
                                layer.msg(result.message, {time: 2000, icon:6});
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
                    document.getElementById("productInfoAddForm").reset();
                }
            });
        },
        /** 产品信息修改 */
        modifyProduct : function(productId){
            layer.open({
                type : 1,
                fixed : true, // 不固定
                shadeClose : false, // 点击遮罩关闭层
                title : ["修改产品详情展示信息",'background-color: #F8F8F8;font-size:16px;border-bottom: 1px solid #eee;' ],
                //closeBtn : true,
                area : [ '700px', '470px' ],
                content : $("#changeFromDiv"),
                btn:["修改"],
                btnAlign : 'c',
                yes : function(index, dom){
                    var formdata = new FormData(document.getElementById("productInfoModifyForm"));
                    var s = /^((?!<script>).)*$/;
                    if($.trim(formdata.get("productName"))==""
                        || $.trim(formdata.get("productId"))==""
                        || $.trim(formdata.get("productInvalid"))==""
                        || $.trim(formdata.get("productRemark"))==""
                        || $.trim(formdata.get("productDivHtml"))==""
                        || $.trim(formdata.get("productTxt"))==""){
                        layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                        return ;
                    }else if(!s.test($.trim(formdata.get("partnerName")))){
                        layer.alert("您输入的合作方名称含有非法字符，请重新录入");
                        return;
                    }
                    // 如果本次修改没有涉及图片修改， 将图片置null
                    if($.trim(formdata.get("productImageFile").name)==""){
                        formdata.delete("productImageFile");
                    }
                    $.ajax({
                        url:"/product/modifyProductInfo",
                        async:false,
                        type:"POST",
                        data:formdata,
                        processData:false,
                        contentType:false,
                        success:function(result){
                            if(result.success){
                                loadList(itemNumPerPage, parseInt($.trim($("#currentPageNo").val())));
                                layer.close(index);
                                layer.msg(result.message, {time: 2000, icon:6});
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
                    document.getElementById("productInfoModifyForm").reset();
                }
            });
        },
        /** 产品图片替换时触发 */
        changeFile:function(){
            $("input[name='productImageFile']").on("change" , function(e){
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
    }
}();
