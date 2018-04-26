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
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        _this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOkTouch, _this);
        return _this;
        // this.okBtn.label = 'xxxx萨达';
    }
    HomeScene.prototype.createChildren = function () {
        //this.okBtn.touchEnabled = true;
        //this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOkTouch, this);
    };
    HomeScene.prototype.onOkTouch = function () {
        //显示聊天记录
        console.log(this.chatLabel.text);
        if (this.chatLabel.text != "") {
            this.chatLabel.text += "\n" + this.inputLabel.text;
        }
        else {
            this.chatLabel.text += this.inputLabel.text;
        }
        //文本高度大于滚动容器高度时，将视口置于文本最后一行
        if (this.chatLabel.height > this.chatScroller.height) {
            this.chatScroller.viewport.scrollV = this.chatLabel.height - this.chatScroller.height;
        }
        //清空输入文本
        this.inputLabel.text = "";
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
//# sourceMappingURL=HomeScene.js.map