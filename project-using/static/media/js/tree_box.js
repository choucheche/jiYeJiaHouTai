var setting = {

    view: {
        selectedMulti: false,
        showLine: false,
        showTitle: true
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        key: {
    			  title: "t"
            // 设置的 t 变为 title属性，写入a标签里
    		},
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove,
        onClick: zTreeOnClick
    }
};

var zNodes = [{
        id: 4,
        //这个元素的id
        pId: 0,
        //他的父节点是 id几，0为根目录
        name: "子节点 4",
        //文件名
        url: "http://www.baby666.cn",
				target: "_blank",
        t:"data-page4"
        // 利用 title 来添加想要的自定义属性
    },
    {
        id: 1,
        pId: 0,
        name: "父节点 1",
        open: true,
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page1"
    },
    {
        id: 14,
        pId: 1,
        name: "123二级元素",
        open: true,
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page14"
    },
    {
        id: 141,
        pId: 14,
        name: "123的子元素1",
        url:"http://g.cn",
				target: "_blank",
        t:"data-page141"
    },
    {
        id: 142,
        pId: 14,
        name: "123的子元素2",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page142"
    },
    {
        id: 11,
        pId: 1,
        name: "叶子节点 1-1",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page11"
    },
    {
        id: 12,
        pId: 1,
        name: "叶子节点 1-2",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page12"
    },
    {
        id: 13,
        pId: 1,
        name: "叶子节点 1-3",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page13"
    },
    {
        id: 2,
        pId: 0,
        name: "父节点 2",
        open: true,
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page2"
    },
    {
        id: 21,
        pId: 2,
        name: "叶子节点 2-1",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page7"
    },
    {
        id: 22,
        pId: 2,
        name: "叶子节点 2-2",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page22"
    },
    {
        id: 23,
        pId: 2,
        name: "叶子节点 2-3",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page23"
    },
    {
        id: 3,
        pId: 0,
        name: "父节点 3",
        open: true,
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page3"
    },
    {
        id: 31,
        pId: 3,
        name: "叶子节点 3-1",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page31"
    },
    {
        id: 32,
        pId: 3,
        name: "叶子节点 3-2",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page32"
    },
    {
        id: 33,
        pId: 3,
        name: "叶子节点 3-3",
        url: "http://www.sina.com",
				target: "_blank",
        t:"data-page33"
    }
];
var log, className = "dark";

function beforeDrag(treeId, treeNodes) {
    return false;
}

function beforeRemove(treeId, treeNode) {
    className = (className === "dark" ? "" : "dark");
    //showLog("[ " + getTime() + " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}

function onRemove(e, treeId, treeNode) {
    //showLog("[ " + getTime() + " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
}

function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        alert("节点名称不能为空.");
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        setTimeout(function() {
            zTree.editName(treeNode)
        }, 10);
        return false;
    }
    return true;
}

// function showLog(str) {
//     if (!log) log = $("#log");
//     log.append("<li class='" + className + "'>" + str + "</li>");
//     if (log.children("li").length > 8) {
//         log.get(0).removeChild(log.children("li")[0]);
//     }
// }

function getTime() {
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
}

var newCount = 1;

function add(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        isParent = e.data.isParent,
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (treeNode) {
        treeNode = zTree.addNodes(treeNode, {
            id: (100 + newCount),
            pId: treeNode.id,
            isParent: isParent,
            name: "new node" + (newCount++)
        });
    } else {
        treeNode = zTree.addNodes(null, {
            id: (100 + newCount),
            pId: 0,
            isParent: isParent,
            name: "new node" + (newCount++)
        });
    }
    if (treeNode) {
        zTree.editName(treeNode[0]);
    } else {
        alert("叶子节点被锁定，无法增加子节点");
    }
}

function edit() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
    }
    zTree.editName(treeNode);
}

function remove(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
    }
    var callbackFlag = $("#callbackTrigger").attr("checked");
    zTree.removeNode(treeNode, callbackFlag);
}

function clearChildren(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0 || !nodes[0].isParent) {
        alert("请先选择一个父节点");
        return;
    }
    zTree.removeChildNodes(treeNode);
}

$(document).ready(function() {
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    $("#addParent").bind("click", {
        isParent: true
    }, add);
    $("#addLeaf").bind("click", {
        isParent: false
    }, add);
    $("#edit").bind("click", edit);
    $("#remove").bind("click", remove);
    $("#clearChildren").bind("click", clearChildren);

});
function zTreeOnClick(event, treeId, treeNode) {
    console.log(treeNode.tId + ", " + treeNode.name+ ", " + treeNode.url+ ", " + treeNode.t);
}
