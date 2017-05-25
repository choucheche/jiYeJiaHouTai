/**
 * auth : float
 *
 * desc: 文件检查: validationObj
 *       文件操作: FileUtils
 *       文件上传  FileUploadUtils
 * */
var fileModel={};
(function(windowModel){
    // 验证文件的合法性
    var validationObj={
        SIZE : 20,  //文件个数
        LENGTH : 2, // 文件大小(单位M)
        J : this.LENGTH * 1024 * 1024, // 单位(b)
        ptn:/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/, // 类型检查
        messages:['上传的文件必须是图片','上文件文件上限为','上传的文件大小不能超过 '],
        init:function(option){   // 初始化参数
            if("size" in option)this.SIZE=option.size;
            if("length" in option){
                this.LENGTH=option.length;
                this.J=this.LENGTH * 1024 * 1024;
            }
            if("ptn" in option) this.ptn=option.ptn;
            if("messages" in option) this.messages=option.messages;

        },
        valid: function(files) { //验证参数
            if(files.length>this.SIZE || this.queryFileModelLength()>this.SIZE || (this.queryFileModelLength()+files.length)>this.SIZE){
                alert(this.messages[1]);
                return false;
            }
            for (var i = 0; i < files.length; i++){
                if(files[i].size>this.J){
                    alert(this.messages[2]);
                    return false;
                }else if(!this.ptn.test(files[i].name)){
                    alert(this.messages[0]);
                    return false;
                }
            }
            return true;
        },
        queryFileModelLength:function(){ //获取文件缓存的数量
            var len=0;
            for(f in fileModel) len++;
            return len;
        }
    };
    // File 对象工具类
    var FileUtils = {
        tempHtml: function (f) {
        },  //单个文件预览片段
        insertElement: function (t, f) {
        },   //增加模板
        viewImages: function (fm) {
        }, //自定义出发预览方法
        batchFilesBefore: function (file) {
        },//缓存file对象之前对file预留操作
        asBaseUrlBeforeFunction: function (fileReader, file) {
        },//将图片转换成url之前的准备工作
        addAttrByFormData: function (option) {
        },//向formData元素增加元素(file 参数)
        init: function (option) {      //初始化
            if ("tempHtml" in option)  this.tempHtml = option.tempHtml;
            if ("insertElement" in option) this.insertElement = option.insertElement;
            if ("viewImages" in option) this.viewImages = option.viewImages;
            if ("batchFilesBefore" in option) this.batchFilesBefore = option.batchFilesBefore;
            if ("asBaseUrlBeforeFunction" in option) this.asBaseUrlBeforeFunction = option.asBaseUrlBeforeFunction;
            if ("addAttrByFormData" in option) this.addAttrByFormData = option.addAttrByFormData;
        },
        readerLoad: function (e) {   //事件自调用
            var temp = FileUtils.tempHtml(e.target);//todo
            FileUtils.insertElement(temp, e.target);
        },
        reader: function () {  //创建 reader对象
            var r = new FileReader();
            r.onload = this.readerLoad;
            return r;
        },
        asBaseUrl: function (file) {  //将文件转码base 64
            var fileTemp = this.reader();
            this.asBaseUrlBeforeFunction(fileTemp, file);
            fileTemp.readAsDataURL(file);
        },
        eachFileModelToFormData: function (formObj) { //转换成fromData 默认自带文件对象 formObj:form对象
           //if(formObj)
            var formData = new FormData(formObj);
            var fileMap = this.getFileModel();
            var index = 0;
            for (f in fileMap) {
                FileUtils.addAttrByFormData({
                    formData: formData,
                    index: index,
                    file: fileMap[f]
                });
                index++;
            }
            return formData;
        },
        batchFiles: function (files) {   //批量文件缓存对象
            for (var i = 0; i < files.length; i++) {
                var n = files[i];
                FileUtils.batchFilesBefore(n);
                if(!fileModel[n.name])
                    fileModel[n.name] = n;
            }
        },
        addFileModel: function (file) { //缓存单个file对象
            fileModel[file.name] = file;
        },
        deleteFileModel: function (fileName) {  //删除单个对象
            delete fileModel[fileName];
        },
        deleteAll:function(){
            fileModel = {};
        },
        getFileModel: function () {  //获取文件缓存对象
            return fileModel;
        },
        getFileByName: function (fileName){
           return this.getFileModel()[fileName];
        }
    };
    //文件上传对象
    var FileUploadUtils={
        url:"",
        dataType:"json",
        timeout: 10000,
        async:false,
        success:function(data){console.info("success")},
        uploadBefore:function(){},
        error:function(e){console.info("error")},
        loadEnd:function(){console.info("loadEnd")},
        progress:function(event){console.info("progress")},
        onFinally:function(){console.info("onFianlly")},
        init:function(option){
            if("url" in option) this.url=option.url;
            if("dataType" in option) this.dataType=option.dataType;
            if("uploadBefore" in option) this.uploadBefore=option.uploadBefore;
            if("success" in option) this.success =option.success;
            if("error" in option) this.error =option.error;
            if("loadEnd" in option) this.loadEnd=option.loadEnd;
            if("progress" in option) this.progress=option.progress;
            if("timeout" in option) this.timeout=option.timeout;
            if("onFinally" in option) this.onFinally=option.onFinally;
            if("async" in option) this.async=option.async;
        },
        upload:function(fromData){
            FileUploadUtils.uploadBefore();
            $.ajax({
                url: FileUploadUtils.url,
                data: fromData,
                dataType: FileUploadUtils.dataType,
                processData: false,
                contentType: false,
                type: 'POST',
                async: FileUploadUtils.async,
                timeout:FileUploadUtils.timeout,
                error:FileUploadUtils.error,
                complete:FileUploadUtils.onFinally,
                xhr:function(){
                    var xhr = jQuery.ajaxSettings.xhr();
                    xhr.upload.onload = FileUploadUtils.loadEnd;
                    xhr.upload.onprogress = FileUploadUtils.progress;
                    return xhr;
                },
                success: FileUploadUtils.success
            });
        }
    }
    window.validationObj=validationObj;
    window.FileUtils=FileUtils;
    window.FileUploadUtils = FileUploadUtils;
})(window);

