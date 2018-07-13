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
        success:function(res){
            if(0 === parseInt(res.resultCode)){

                // TODO 判断一下插入数据的条目数显示一下图标与提示语
                // 当新增产品数据成功之后，关闭当前layer
                // 先得到当前iframe层的索引
                var index = parent.layer.getFrameIndex(window.name);
                // 关闭layer弹层
                parent.layer.close(index);
            }
            //console.log("over..");
        },
        error:function(e){
            alert("错误！！");
        }
    });
}