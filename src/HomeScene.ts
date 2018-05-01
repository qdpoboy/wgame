/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/20
 * 
 * 实现可自行滚动的聊天文本框
 */
class HomeScene extends eui.Component {
    private chatLabel: eui.Label;          //聊天记录
    private inputLabel: eui.EditableText;  //输入文本
    private okBtn: eui.Button;              //确定
    private chatScroller: eui.Scroller;    //聊天记录滚动容器
    private sock: egret.WebSocket;
    public constructor() {
        super();
        this.skinName = "src/HomeSceneSkin.exml";
        this.sock = new egret.WebSocket();
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
        this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //this.sock.connect("echo.websocket.org", 80);
        this.sock.connect("23.105.213.196", 9502);
    }

    public createChildren() {
        //this.okBtn.touchEnabled = true;
        //this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);
    }

    private onSocketOpen():void {
        console.log('socket已连接');
        let pdata = '你好';
        //this.sock.writeUTF(pdata);
        var obj: Object = {
            "c": "run",
            "m": "fight",
            "data": {"name": "zhangsan"}
        };
        //console.log("send -->", JSON.stringify(obj))
        this.sock.writeUTF(JSON.stringify(obj));
    }

    private onReceive():void {
        let rdata = this.sock.readUTF();
        //console.log('接收到消息:' + rdata);
        this.showInfo(rdata);
    }
    
    //输出显示战斗信息
    private showInfo(rdata){
        if (rdata != "") {
            this.chatLabel.text += "\n" + rdata;
        } else {
            this.chatLabel.text += rdata;
        }

        //文本高度大于滚动容器高度时，将视口置于文本最后一行
        if (this.chatLabel.height > this.chatScroller.height) {
            this.chatScroller.viewport.scrollV = this.chatLabel.height - this.chatScroller.height;
        }
    }
}