var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/20
 *
 * 实现可自行滚动的聊天文本框
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/HomeSceneSkin.exml";
        _this.sock = new egret.WebSocket();
        _this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, _this.onReceive, _this);
        _this.sock.addEventListener(egret.Event.CONNECT, _this.onSocketOpen, _this);
        //this.sock.connect("echo.websocket.org", 80);
        _this.sock.connect("23.105.213.196", 9502);
        return _this;
    }
    HomeScene.prototype.createChildren = function () {
        //this.okBtn.touchEnabled = true;
        //this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);
    };
    HomeScene.prototype.onSocketOpen = function () {
        console.log('socket已连接');
        var pdata = '你好';
        //this.sock.writeUTF(pdata);
        var obj = {
            "v": "run",
            "c": "fight",
            "data": { "name": "zhangsan" }
        };
        //console.log("send -->", JSON.stringify(obj))
        this.sock.writeUTF(JSON.stringify(obj));
    };
    HomeScene.prototype.onReceive = function () {
        var rdata = this.sock.readUTF();
        //console.log('接收到消息:' + rdata);
        this.showInfo(rdata);
    };
    //输出显示战斗信息
    HomeScene.prototype.showInfo = function (rdata) {
        if (rdata != "") {
            this.chatLabel.text += "\n" + rdata;
        }
        else {
            this.chatLabel.text += rdata;
        }
        //文本高度大于滚动容器高度时，将视口置于文本最后一行
        if (this.chatLabel.height > this.chatScroller.height) {
            this.chatScroller.viewport.scrollV = this.chatLabel.height - this.chatScroller.height;
        }
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
//# sourceMappingURL=HomeScene.js.map