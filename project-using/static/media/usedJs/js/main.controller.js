LOADADDRESS="#page_view_content";
LOGIN_TOKEN="32617b3267bvv27bcn328xn83728x";
MODAL_CONTROLLER="#modal_view_controller";
FRAME_WINDOW_ID="#page_frame_window";
var localPath = window.location;
var HOST_PATH = localPath.protocol+"//"+localPath.host;
frameObj=jQuery(FRAME_WINDOW_ID);
//jQuery(".controller_a").on("click",function(){
//    var liObj=jQuery(this).parent();
//    var className=jQuery(liObj).attr("class");
//    if(!className){
//        var url=jQuery(this).attr("mainUrl");
//        if(url)requestForHtmlByLoadAddress(url,{});
//    }
//    //createGuide(jQuery(this).attr("mainLevel"),jQuery(this).attr("mainTitle"));
//    return true;
//});

var guides=[];

function appendURL(url,option){
   if(option){
       url += "?";
       for(keyStr in option){
           url+=keyStr+"="+option[keyStr]+"&";
       }
       url=url.substring(0, url.length - 1);
   }
    return url;
}
function createGuide(index,title,icon){
    jQuery("#guide_home").html("");
    guides[index]=title;
    for(var i=0;i<=index;i++){
        jQuery("#guide_home").append("<li class='active'>"+guides[i]+"</li>");
    }
}

var ROOT_PATH;
function getProjectRootPath(){
    if(ROOT_PATH) return ROOT_PATH;
    var path=window.document.location.pathname;
    var noRootPath=path.substring(1);
    var index=noRootPath.indexOf("/");
    ROOT_PATH=path.substring(0,index+1+1);
    return ROOT_PATH;
}

function requestForHtmlByLoadAddress(url,optionsData){
    $.blockUI({message:"<img src='"+getProjectRootPath()+"static/media/image/loading2.gif' />"});
    url=appendURL(url,optionsData);
    if(frameObj!=null && frameObj.length>0){
        jQuery(frameObj).attr("src",url);
    }else{
    	window.location.href=url;
    }
    //jQuery.ajax({
    //    url:url,
    //    timeout:100000,
    //    data:optionsData,
    //    type:"POST",
    //    dataType:"html",
    //    async:true,
    //    success:function(data){
    //        $.unblockUI();
    //        if(data.indexOf(LOGIN_TOKEN)>1)jQuery("body").html(data);
    //
    //        jQuery(LOADADDRESS).html(data);
    //    }
    //});
    $.unblockUI();
}

//function requestPostByValidation(formObj,url,dataType,isValid,successFun,data){
//    $.blockUI({message:"<img src='"+getProjectRootPath()+"assets/css/images/loading2.gif' />"});
//    if(isValid){
//        var flag=FormValidUtils.validForm(formObj);
//        if(!flag) $.unblockUI();
//    }
//    if(flag){
//        jQuery.ajax({
//            url : url,
//            type : "post",
//            async:true,
//            data:data,
//            contentType:false,
//            processData:false,
//            timeout:100000,
//            dataType : dataType,
//            success : function(data) {
//                $.unblockUI();
//                successFun(data);
//                jQuery("#modal_content").html("");
//            }
//        });
//    }
//}
//formObj:表单对象 url: 请求地址 dataType: html or json  isValid: 是否验证 successFun 执行方法
function requestFormByValidation(formObj,url,dataType,isValid,successFun,data){
    jQuery(formObj).ajaxSubmit({
        url : url,
        type : "post",
        async:true,
        data:data,
        timeout:99999999,
        dataType : dataType,
        beforeSubmit:function(){
            $.blockUI({message:"<img src='"+getProjectRootPath()+"static/media/image/loading2.gif' />"});
            setTimeout(function () {
                $.unblockUI();
            },5000);
            if(isValid){
                var flag=FormValidUtils.validForm(formObj);
                if(!flag) $.unblockUI();
                return flag;
            }
            return true;
        },
        success : function(sdata) {
            $.unblockUI();
            successFun(sdata);
            // jQuery("#modal_content").html("");
        }
    });
}

var subFunction=null;
function viewModalWithRequest(title,url,submitFun){
    jQuery("#modal_content").html("");
    jQuery("#modal_content").load(url);
    jQuery("#modal_title").html(title);
    jQuery(MODAL_CONTROLLER).modal("show");
    jQuery("#modal_submit").show();
    if(!submitFun) jQuery("#modal_submit").hide();
    subFunction=submitFun;
}


onerror=function(msg,url,l){
    var txt="message :"+msg+" \n";
    txt+=" url : "+url+" \n";
    txt+=" lineNumber: "+l;
    console.log(txt);
}
