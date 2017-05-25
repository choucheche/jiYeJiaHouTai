$(function () {
    $("#checkBoxAll").bind("click", function () {
    	// 全选
    	if($(this).is(":checked")){
    		$("input[name='checkBoxOne']").each(function () {
    			if(!$(this).is(":checked")){
    				$(this).click();
    			}
            });
    	} else {
    		// 全不选
    		$("input[name='checkBoxOne']").each(function () {
    			if($(this).is(":checked")){
    				$(this).click();
    			}
            });
    	}
    });
});      

function getCheckIds(){
	var ids = '';
	$("input[name='checkBoxOne']").each(function () {
		if($(this).is(":checked")){
			ids = ids + $(this).val() + ",";
		}
    });
	if(ids.length > 0){
		ids = ids.substring(0, ids.length - 1);
	}
	return ids;
}