(function(){
    //为上面提供各个JS验证方法提供.trim()属性
    String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
   var FormValidUtils={
       //alert('对不起，文本框不能为空或者为空格!');
       msgStyle:function(obj,flag,msg){
           if(!flag){
               jQuery(obj).parent().parent().removeClass("success");
               jQuery(obj).parent().parent().addClass("error");
               jQuery(obj).next().removeClass("valid");
               jQuery(obj).next().html(msg);
               return 1;
           }else{
               jQuery(obj).parent().parent().removeClass("error");
               jQuery(obj).parent().parent().addClass("success");
               jQuery(obj).next().addClass("valid");
               jQuery(obj).next().html("");

           }2
           return 0;
       },
       req:function(){
           var str=this.trim();
           if(str.length==0 ) return false;
           return true;
        },
       isDate :function(){
            var str = this.trim();
            if(str.length ==0) true;
            var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
            if(str.match(reg)==null) return false;
            return true;
       },
       isDateTime:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
           if(str.match(reg)==null) return false;
           return true;
       },
       isTime:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg=/^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/;
           if(!reg.test(str)) return false;
           return true;
       },
       isLetter:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg=/^[a-zA-Z]+$/;
           if(!reg.test(str)) return false;
           return true;
       },
       isInteger:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg=/^[-+]?\d*$/;
           if(!reg.test(str)) return false;
           var iStr = parseInt(str);
           if(iStr<=0) return false;
           return true;
       },
       isDouble:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg=/^[-\+]?\d+(\.\d+)?$/;
           if(!reg.test(str)) return false;
           return true;
       },
       isString:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg=/^[a-zA-Z0-9_]+$/;
           if(!reg.test(str)) return false
           return true;
       },
       isChinese:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg=/^[\u0391-\uFFE5]+$/;
           if(!reg.test(str)) return false;
           return true;
       },
       isEmail:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
           if(!reg.test(str)) return false;
           return true;
       },
       isMaxLength:function(val){
           var str=this.trim();
           if(str.length ==0) return true;
           if(str.length>val) return false;
           return true;
       },
       isMaxValue:function(val){
           var str=this.trim();
           if(str.length ==0) return true;
           if(str>parseInt(val)) return false;
           return true;
       },
       isMinValue:function(val){
           var str=this.trim();
           if(str.length ==0) return true;
           if(str<parseInt(val)) return false;
           return true;
       },
       isMinLength:function(val){
           var str=this.trim();
           if(str.length ==0) return true;
           if(str.length<parseInt(val)) return false;
           return true;
       },
       isPhone:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           if(str.length !=11) return false;
           return true;

       },
       isCard:function(){
           var str=this.trim();
           if(str.length ==0) return true;
           var reg= /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
           if(!reg.test(str)) return false;
           return true;
       },
       isEqual:function(val){
           var str=this.trim();
           if(str.length ==0) return false;
           if(str==val) return true;
           return false;
       },
       isRepeat:function(name,val,param){
    	   var params=param.split(",");
          var flag=false;
           jQuery.ajax({
               async:false,
               data:{name:name,"value":val,other:params[1]},
               dataType:"json",
               type:"POST",
               url:params[0],
               success:function(data){
                   flag=data.flag;
               }
           });
           return flag;
       },
       validForm:function(formObj){
           var falseCount=0;
           for(var i=0;i<formObj.length;i++){
               var obj=formObj.elements[i];
               var validStr=jQuery(obj).attr("validKey");
               var messages=jQuery(obj).attr("messages");
               var validKeys=(validStr==null||validStr=="")?[]:validStr.split(",");
               var messageArray=(messages==null||messages=="")?[]:messages.split(",");
               for(var k=0;k<validKeys.length;k++){
                   var  paramter=jQuery(obj).attr(validKeys[k]+"Param");
                   var flag =false;
                   if(paramter){
                       if(validKeys[k]=="isRepeat"){
                           flag=FormValidUtils[validKeys[k]].call(jQuery(obj).val(),jQuery(obj).attr("name"),jQuery(obj).val(),paramter);
                       }
                       else{
                           flag=FormValidUtils[validKeys[k]].call(jQuery(obj).val(),paramter);
                       }
                   }
                   else{
                       flag =FormValidUtils[validKeys[k]].call(jQuery(obj).val());
                   }
                   falseCount+=FormValidUtils.msgStyle(obj,flag,messageArray[k]);
                   if(!flag) break;
               }
           }
           if(falseCount>0)return false;
           return true;
       }
   }
   window.FormValidUtils=FormValidUtils;
})();
