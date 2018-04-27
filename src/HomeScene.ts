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

        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);

        this.sock = new egret.WebSocket();
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
        this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //this.sock.connect("echo.websocket.org", 80);
        this.sock.connect("23.105.213.196", 9502);
        // this.okBtn.label = 'xxxx萨达';
    }

    public createChildren() {
        //this.okBtn.touchEnabled = true;
        //this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);
    }

    private onSocketOpen():void {
        console.log('socker已连接');
        let pdata = '你好';
        this.sock.writeUTF(pdata);
    }

    private onReceive():void {
        let rdata = this.sock.readUTF();
        console.log('接收到消息:' + rdata);
    }

    private onOkTouch() {
        //显示聊天记录
        console.log(this.chatLabel.text);
        if (this.chatLabel.text != "") {
            this.chatLabel.text += "\n" + this.inputLabel.text;
        } else {
            this.chatLabel.text += this.inputLabel.text;
        }

        //文本高度大于滚动容器高度时，将视口置于文本最后一行
        if (this.chatLabel.height > this.chatScroller.height) {
            this.chatScroller.viewport.scrollV = this.chatLabel.height - this.chatScroller.height;
        }
        //清空输入文本
        this.inputLabel.text = "";
    }
}