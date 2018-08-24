/** 表单封装 */
$.fn.formData = function(fromId) {
    var o = {};
    var a = $("#" + fromId).serializeArray();
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

$("#login_btn").click(function(){
    var data = $.fn.formData("loginForm");
    console.log(data);
    if(data.username === "") {
        layer.alert('用户名不能为空');
        return;
    }
    if(data.password === ""){
        layer.alert('密码不能为空');
        return;
    }
    $.ajax({
        url:"/doLogin",
        async:false,
        type:"POST",
        data:data,
        success:function(result){
            console.log(result);
            if(!result.success){
                layer.msg(result.message, {time: 2000, icon:5});
            }else{
                window.location.href=result.data;
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            layer.alert(XMLHttpRequest.status+XMLHttpRequest.readyState+" "+textStatus+" "+errorThrown);
        }
    });
});