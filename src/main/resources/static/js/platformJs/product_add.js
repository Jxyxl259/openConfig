$(function(){


});

/** 添加产品详情 */
function addProductInfo(){
    var formData = new FormData(document.getElementById("addProductForm"));
    $.ajax({
        url:"/product/addProductInfo",
        async:false,
        type:"POST",
        data:formData,
        processData:false,
        contentType:false,
        // 添加成功关闭添加弹层，添加失败显示错误信息保留弹层
        success:function(resultMsg){
            if(resultMsg.success){
                // 当新增产品数据成功之后，关闭当前layer
                // 先得到当前iframe层的索引
                var index = parent.layer.getFrameIndex(window.name);
                parent.loadList(10,1);
                // 关闭layer弹层
                parent.layer.close(index);
            }else{
                // 提示操作返回结果
                alert(res.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
        }
    });


    return false;
}