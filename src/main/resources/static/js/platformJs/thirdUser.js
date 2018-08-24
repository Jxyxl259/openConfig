// 第三方用户 js
var flag = true;
var data;

/** 加载列表数据 */
function loadList(pageSize, pageNum){
    $("#currentPageNo").val(pageNum);
    conditionQuery("/userAccount/list");

}

/** 列表条件搜索 */
$('#selectInfo').on( 'click', function () {
    conditionQuery("/userAccount/list");
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
        this.deleteAll();
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
                console.log(a)
                 console.log(b)
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
            });

            if(strOld == '编辑'){
                var currentId = $(this).attr("id");
            }else if(strOld == '确定'){
                var tdEles = $(this).parent().parent().find("td");

                var accountId = $.trim($(tdEles[9]).html());
                var authFlag = $.trim($(tdEles[5]).children().eq(1).val());
                var validFlag = $.trim($(tdEles[6]).children().eq(1).val());

                if(isEmpty(accountId) || isEmpty(authFlag) || isEmpty(validFlag)){
                    layer.alert('请完善添加信息之后提交');//使用parent可以获得父页面DOM
                    return ;
                }

                RestfulClient.post("/userAccount/modifyUserAccountInfo",
                    {
                        "accountId" : accountId,
                        "authFlag": authFlag,
                        "validFlag": validFlag
                    },
                    function(resultMsg) {
                        if(resultMsg.success){
                            layer.msg(resultMsg.message,{icon:1,time:2000});
                            loadList(itemNumPerPage, currentPage);
                        }else{
                            layer.msg(resultMsg.message,{icon:5,time:2000});
                        }
                    }
                );
            }
        })
    },
    // 批量删除
    deleteAll:function(){
        $("#deleteRow").click(function() {
            var array = new Array();
            $("input[type='checkbox']:gt(0):checked").each(
                function() {

                    var accountId = $(this).parent().parent().find("td").eq(9).html();
                    array.push(accountId);
                }
            );
            if (array == 0) {	alert("请勾选!!");	}
            else {
                layer.confirm('确定删除选中行信息吗?', function(index){
                    $.ajax({
                        url:"/userAccount/deleteByIds",
                        type:"GET",
                        data:{"accountIds":array.toString()},
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
                    type:"GET",
                    data:{"accountIds":id},
                    success:function(result){
                        layer.msg(result.resultMsg,{icon:1,time:1000});
                        loadList(itemNumPerPage, currentPage);
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
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
                title: ['查看详情'],
                fixed : true,                   // 不固定
                shadeClose : false,             // 点击遮罩关闭层
                area : [ '700px', '470px' ],
                content:addTK
            });
        })
    }
};
commonObj.init();


	