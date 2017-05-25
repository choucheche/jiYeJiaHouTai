//全选全不选
function checkBoxAll(obj){
    var flag = $(obj).is(':checked');
    $("input[name='checkName']").each(function() {
        $(this).attr("checked", flag);
    })
}
//layer提示
function layerAlert(c,t,i){
    layer.alert(c, {
        title:t,
        icon: i,
        skin: 'layer-ext-moon',
        offset: '100px',
        closeBtn: 0
    })
}
jQuery.cookie=function(name,value,options){
    if(typeof value!='undefined'){
        options=options||{};
        if(value===null){
            value='';
            options.expires=-1;
        }
        var expires='';
        if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){
            var date;
            if(typeof options.expires=='number'){
                date=new Date();
                date.setTime(date.getTime()+(options.expires * 24 * 60 * 60 * 1000));
            }else{
                date=options.expires;
            }
            expires=';expires='+date.toUTCString();
        }
        var path=options.path?';path='+options.path:'';
        var domain=options.domain?';domain='+options.domain:'';
        var secure=options.secure?';secure':'';
        document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');
    }else{
        var cookieValue=null;
        if(document.cookie&&document.cookie!=''){
            var cookies=document.cookie.split(';');
            for(var i=0;i<cookies.length;i++){
                var cookie=jQuery.trim(cookies[i]);
                if(cookie.substring(0,name.length+1)==(name+'=')){
                    cookieValue=decodeURIComponent(cookie.substring(name.length+1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
$(function(){
    //劵码加密
    $("#sample-table-2 td[class='couponCode']").each(function(){
        var codeEncrypt=getCodeEncrypt($.trim($(this).html()));
        $(this).html(codeEncrypt);
    });
});

function getCodeEncrypt(code){
    var codePwd = "";
    if(code.length>6){
        codePwd = code.substring(0,4)+code.substring(4,code.length-2).replace(/./g,'*')+code.substring(code.length-2,code.length)
    }else{
        codePwd = code;
    }
    return codePwd;
}