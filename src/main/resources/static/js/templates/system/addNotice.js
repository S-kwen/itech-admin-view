var form = layui.form;
form.render();
var upload = layui.upload,
    element = layui.element;
element.init();
function post() {
    const title = $("#title").val();
    const top = $("#top").val();
    const selectTime = $("#selectTime").val();
    const layText = $("#layText").val();
    const jumpType = $("#jumpType").val();
    const url = $("#url").val();
    const content = $("#content").val();
    if (title === '') {
        showTip("標題不能為空");
        return false;
    }
    if (top==='' || top===null || top===undefined) {
        showTip("請先選擇置頂狀態");
        return false;
    }
    if (selectTime==='') {
        showTip("展示時間不能為空");
        return false;
    }
    let times = selectTime.split(" - ");
    let startTime="";
    let endTime="";
    if (times.length === 2) {
         startTime = times[0];
         endTime = times[1];
    }else{
        showTip("展示時間輸入有誤");
        return false;
    }
    if (startTime==='' || endTime===''){
        showTip("展示時間格式有誤");
        return false;
    }
    if (layText==='' && jumpType===1) {
        showTip("內部標題不能為空");
        return false;
    }
    if (jumpType==='' || jumpType===null || jumpType===undefined) {
        showTip("請先選擇跳轉類型");
        return false;
    }
    if (url==='') {
        showTip("url不能為空");
        return false;
    }
    if (content==='') {
        showTip("內容不能為空");
        return false;
    }
    if (content.length>255) {
        showTip("內容長度不能大於255");
        return false;
    }
    $.ajax({
        url: "//itech-admin-api.iskwen.com/api/system/addNotice",
        type: "post",
        dataType: "json",
        headers: {'Authorization': getCookie("token")},
        data: "title=" + title + "&top=" + top +"&startTime=" + startTime+"&endTime="+endTime+"&layText="+layText+"&jumpType="+jumpType+"&url="+url+"&content="+content,
        success: function (msg) {
            if (msg.status === 0) {
                layer.msg('新增成功', {icon: 1, time: 1000}, function () {
                    if (getUrlValue("byUrl") !== '') {
                        if (parent.$('#LAY_app_tabsheader>li[lay-id="' + getUrlValue("byUrl") + '"] ').length === 1) {
                            parent.layui.admin.events.changeThisTabsByRefresh(getUrlValue("byUrl"), decodeURI(getUrlValue("byText")), true);
                        } else {
                            parent.layui.admin.events.closeThisTabs();
                        }
                    } else {
                        parent.layui.admin.events.closeThisTabs();
                    }
                });
            } else {
                showTip(msg.tip);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showErrorMsg("系統在開小差，請稍候再試");
        }
    });
}
function getLaydateLang() {
    switch (getLangByRequest()) {
        case "zh-TW":
            return "en";
        case "zh-CN":
            return "cn";
        case "en":
            return "en";
        default:
            return "en";
    }
}