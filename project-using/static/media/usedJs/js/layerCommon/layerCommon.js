//layer弹出提示 例如 ： layerAlert('提示信息',"提示",5);
function layerAlert(c,t,i){
    layer.alert(c, {
        title:t,
        icon: i,
        skin: 'layer-ext-moon',
        offset: '100px',
        closeBtn: 0
    })
}
//layer弹出提示 自动关闭 t1：提示信息 t2：弹出持续时间
function layerMsg(t1,t2){
    layer.msg(t1, {
        offset: '100px',
        time:t2
    });
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