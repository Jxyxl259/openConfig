/** 每页显示的条目数量 */
var itemNumPerPage;

/** 当前页码 */
var currentPage;

/** 加载自定义样式 */
layer.config({
    extend: 'skin/openSkin/style.css',
    skin: 'layer-ext-openSkin'
});



/** 数据初始化 */
$(function() {
    itemNumPerPage = parseInt($.trim($("#pageSizeVal").val()));
    currentPage = parseInt($.trim($("#currentPageNo").val()));
    loadList(itemNumPerPage,currentPage);
});


/** 全选/反选 */
var checkAll = function(ele){
    if (ele.checked){
        $("input[name='dataCheckBox']:checkbox").each(function(){
            $(this).prop("checked", true);
        });
    } else {
        $("input[name='dataCheckBox']:checkbox").each(function() {
            $(this).prop("checked", false);
        });
    }
};



/** 刷新每页显示的条目数 */
var updatePageSize = function(ele){

    var newPageSize = parseInt($(ele).children(":selected")[0].value);
    var oldPageSize = parseInt($.trim($("#pageSizeVal").val()));

    if(newPageSize != null && oldPageSize != newPageSize){
        $("#pageSizeVal").val(newPageSize);
        itemNumPerPage = newPageSize;
        loadList(newPageSize, 1);
    }
};


/** 翻页 */
var turnPage = function(targetPageNum){
    loadList(itemNumPerPage, targetPageNum);
};


/** 去指定页面 */
var gotoTargetPage = function(btn){
    itemNumPerPage = parseInt($.trim($("#pageSizeVal").val()));
    var targetPageNumber = parseInt($.trim($("#targetPage").val()));
    loadList(itemNumPerPage, targetPageNumber)
};



/** 分页信息*/
var paginationInfo = function(){
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
        pagenationContent += '<span class="endPage"><a class="paginate_button previous disabled" aria-controls="tableId" data-dt-idx="0" tabindex="0" id="tableId_first_page" href="javascript:void(0);" onclick="turnPage(1)"> 首页 </a></span>';
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
        pagenationContent += '<span class="endPage"><a class="paginate_button previous disabled" aria-controls="tableId" data-dt-idx="0" tabindex="0" id="tableId_last_page" href="javascript:void(0);" onclick="turnPage(' + pageTotal + ')"> 末页 </a></span>';
    }
    pagenationContent += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>跳转到第 <input type="text" id="targetPage"/> 页 <b><button id="goToTargetPage" onclick="gotoTargetPage(this)">Go</button>';

    if(0 === pageSize ){
        pagenationContent = "";
    }

    $("div[id='pagenationContainer']").html(pagenationContent);
};



/** 判空 */
isEmpty = function(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
};