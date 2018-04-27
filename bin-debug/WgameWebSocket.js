var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WgameWebSocket = (function () {
    function WgameWebSocket() {
        this.handler = {};
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        //this.socket.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketData, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    }
    WgameWebSocket.prototype.setConnectHandler = function (_func, _obj) {
        this.cbConnect = [_obj, _func];
    };
    WgameWebSocket.prototype.setCloseHandler = function (_func, _obj) {
        this.cbClose = [_obj, _func];
    };
    WgameWebSocket.prototype.setErrorHandler = function (_func, _obj) {
        this.cbError = [_obj, _func];
    };
    WgameWebSocket.prototype.connect = function (_host, _port) {
        this.state = 0;
        this.host = _host;
        this.port = _port;
        this.socket.connect(_host, _port);
    };
    WgameWebSocket.prototype.reconnect = function () {
        this.connect(this.host, this.port);
    };
    WgameWebSocket.prototype.bind = function (name, func, obj) {
        this.handler[name] = [obj, func];
    };
    WgameWebSocket.prototype.send = function (c, m, data) {
        var obj = {
            "c": c,
            "m": m,
            "data": data
        };
        console.log("send -->", JSON.stringify(obj));
        this.socket.writeUTF(JSON.stringify(obj));
    };
    WgameWebSocket.prototype.isConnected = function () {
        return this.state == 1;
    };
    WgameWebSocket.prototype.onSocketOpen = function () {
        console.log("websocket connected");
        if (this.cbConnect.length > 0) {
            var obj = this.cbConnect[0];
            var func = this.cbConnect[1];
            func.call(obj);
        }
        this.state = 1;
    };
    WgameWebSocket.prototype.onSocketClose = function () {
        console.log("websocket closed");
        if (this.cbClose.length > 0) {
            var obj = this.cbClose[0];
            var func = this.cbClose[1];
            func.call(obj);
        }
    };
    WgameWebSocket.prototype.onSocketError = function () {
        console.log("websocket error");
        if (this.cbError.length > 0) {
            var obj = this.cbError[0];
            var func = this.cbError[1];
            func.call(obj);
        }
    };
    WgameWebSocket.prototype.onSocketData = function (e) {
        var bytes = this.socket.readUTF();
        console.log("recv -->", bytes);
        var packet = JSON.parse(bytes);
        this.dispatch(packet);
    };
    WgameWebSocket.prototype.dispatch = function (msg) {
        //data handler
        var error = msg["err"];
        var name = error ? "Error" : msg["c"] + "." + msg["m"];
        var cb = this.handler[name];
        if (cb) {
            var obj = cb[0];
            var func = cb[1];
            func.call(obj, msg["data"]);
        }
        else {
            console.log("not found handler --> " + name);
        }
    };
    return WgameWebSocket;
}());
__reflect(WgameWebSocket.prototype, "WgameWebSocket");
//# sourceMappingURL=WgameWebSocket.js.map