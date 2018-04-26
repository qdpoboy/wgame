//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        /*
        let sky = this.createBitmapByName("bg2_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMaskHeight = 100;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, topMaskHeight);
        topMask.graphics.endFill();
        this.addChild(topMask);

        //中间横线
        let line1 = new egret.Shape();
        line1.graphics.lineStyle(2, 0xcccccc);
        line1.graphics.moveTo(0, (stageH - topMaskHeight) / 2 + topMaskHeight );
        line1.graphics.lineTo(stageW, (stageH - topMaskHeight) / 2 + topMaskHeight);
        line1.graphics.endFill();
        this.addChild(line1);

        //中间竖线
        let line2 = new egret.Shape();
        line2.graphics.lineStyle(2, 0xcccccc);
        line2.graphics.moveTo(0, 0);
        line2.graphics.lineTo(0, (stageH - topMaskHeight) / 2 - 1);
        line2.graphics.endFill();
        line2.x = stageW / 2;
        line2.y = topMaskHeight + 1;
        this.addChild(line2);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0x000000;
        textfield.x = 0;
        textfield.y = 50;
        this.textfield = textfield;

        //用户名
        let username = new egret.TextField();
        username.textColor = 0x000000;
        username.width = stageW / 2;
        username.textAlign = "left";
        username.text = "疯狂的肉夹馍";
        username.size = 30;
        username.x = 60;
        username.y = topMaskHeight + 50;
        this.addChild(username);

        //血量
        let hp = new egret.TextField();
        hp.textColor = 0x000000;
        hp.width = stageW / 4;
        hp.textAlign = "left";
        hp.text = "HP : 100";
        hp.size = 24;
        hp.x = 30;
        hp.y = topMaskHeight + 120;
        this.addChild(hp);

        //法力
        let mp = new egret.TextField();
        mp.textColor = 0x000000;
        mp.width = stageW / 4;
        mp.textAlign = "right";
        mp.text = "MP : 100";
        mp.size = 24;
        mp.x = 130;
        mp.y = topMaskHeight + 120;
        this.addChild(mp);

        //攻击
        let attack = new egret.TextField();
        attack.textColor = 0x000000;
        attack.width = stageW / 4;
        attack.textAlign = "left";
        attack.text = "攻击力 : 100";
        attack.size = 24;
        attack.x = 30;
        attack.y = topMaskHeight + 120 + 50;
        this.addChild(attack);

        //战斗信息
        let figthInfo = new egret.TextField();
        figthInfo.textColor = 0x000000;
        figthInfo.width = stageW;
        figthInfo.textAlign = "left";
        figthInfo.text = "你对 火狐狸 发动了攻击，造成100点伤害。";
        figthInfo.size = 22;
        figthInfo.x = 30;
        figthInfo.y = (stageH - topMaskHeight) / 2 + topMaskHeight + 30;
        this.addChild(figthInfo);
        let figthInfo1 = new egret.TextField();
        figthInfo1.textColor = 0x000000;
        figthInfo1.width = stageW;
        figthInfo1.textAlign = "left";
        figthInfo1.text = "火狐狸 对你发动了攻击，造成10点伤害。";
        figthInfo1.size = 22;
        figthInfo1.x = 30;
        figthInfo1.y = (stageH - topMaskHeight) / 2 + topMaskHeight + 60;
        this.addChild(figthInfo1);

        let label : eui.Label = new eui.Label();
        label.text = "eui Label test";
        label.x = 0;
        label.y = 500;
        label.width = 400;//设置宽度
        label.height = 300;//设置高度
        label.fontFamily = "Tahoma";//设置字体
        label.textColor = 0xFF0000;//设置颜色
        label.size = 35;//设置文本字号
        label.bold = true;//设置是否加粗
        label.italic = true;//设置是否斜体
        label.textAlign = "right";//设置水平对齐方式
        label.verticalAlign = "middle";//设置垂直对齐方式
        this.addChild(label);

        let group = new eui.Group();
        let img = new eui.Image("bg_jpg");
        group.addChild(img);
        //创建一个Scroller
        let myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.width = 200;
        myScroller.height = 200;
        //设置viewport
        myScroller.viewport = group;
        this.addChild(myScroller);
        */
        this.addChild(new HomeScene());


        /**
        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        */
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}
