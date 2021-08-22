//使用auto.js 4.0.1 版本 编写&运行 by 一斤清凉油
var config = storages.create("clxcaiji_config");

function getPosInteractive(promptText) {
    let confirmed = false;
    //提示和确认按钮的框
    let confirmWindow = floaty.rawWindow(
        <frame gravity="left|top">
            <vertical bg="#7fffff7f">
                <text id="promptText" text="" textSize="14sp" />
                {/* <button id= "up" style="Widget.AppCompat.Button.Colored" text="↑"/>
            <button id= "down" style="Widget.AppCompat.Button.Colored" text="↓"/>
            <button id= "left" style="Widget.AppCompat.Button.Colored" text="←"/>
            <button id= "right" style="Widget.AppCompat.Button.Colored" text="→"/> */}
            
            </vertical>
        </frame>
    );
    confirmWindow.setTouchable(true);
    ui.run(function(){
        confirmWindow.promptText.setText("请将箭头左上端移到 " + promptText + " 的右侧不远处，10s后会点击测试取点是否正确");
        // confirmWindow.confirmBtn.click(()=>{
        //     confirmed = true;
        //});
    });

    //只有一个箭头的框，用来获取坐标
    let selectorWindow = floaty.window(
        <frame gravity="left|top">
            <img src="data:image/jpg;base64,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"/>
        </frame>);
        selectorWindow.setAdjustEnabled(true);
        while(!confirmed) { for(let i=0;i<200;i++){sleep(50);};
            press(selectorWindow.getX(),selectorWindow.getY(),300);
            sleep(2000);
            if(dialogs.confirm("点击是否正确！是/否")){
                confirmed = true;
            };
        };
        confirmWindow.close();
        selectorWindow.close();
        return {
            "x": selectorWindow.getX(),
            "y": selectorWindow.getY()
        };
}

let cmp = (x, y) => {
    // If both x and y are null or undefined and exactly the same
    if (x === y) {
        return true;
    }

    // If they are not strictly equal, they both need to be Objects
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }

    //They must have the exact same prototype chain,the closest we can do is
    //test the constructor.
    if (x.constructor !== y.constructor) {
        return false;
    }
    for (var p in x) {
        //Inherited properties were tested using x.constructor === y.constructor
        if (x.hasOwnProperty(p)) {
            // Allows comparing x[ p ] and y[ p ] when set to undefined
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            // If they have the same strict value or identity then they are equal
            if (x[p] === y[p]) {
                continue;
            }
            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (typeof(x[p]) !== "object") {
                return false;
            }
            // Objects and Arrays must be tested recursively
            if (!Object.equals(x[p], y[p])) {
                return false;
            }
        }
    }

    for (p in y) {
        // allows x[ p ] to be set to undefined
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
};

function setConfigSafe(key, val) {
    config.put(key, val);
    let tmp = config.get(key);
    if (cmp(tmp, val)) {
        toast("设置保存成功");
    } else {
        toast("设置保存失败！");
    };
};


//用户设置
function runSetup() {
    //设置自定义坐标
    let caiji = [0,0];
    let gongju = [0,0];
    let xianpoint = [0,0];
    let fistxian = [0,0];
    let xiannums = 1;
    pos = getPosInteractive("采集按钮的位置");
    caiji = [ pos.x , pos.y ];
    // press( caiji[0] , caiji[1] , 1000 );
    pos = getPosInteractive("采集按钮上方的工具位置");
    gongju = [ pos.x , pos.y ];
    pos = getPosInteractive("右上角地图旁边换线的位置");
    xianpoint = [ pos.x , pos.y ];
    // press( xianpoint[0] , xianpoint[1] , 100 );
    // press( xianpoint[0] , xianpoint[1] , 100 );
    pos = getPosInteractive("1线的位置");
    fistxian = [ pos.x , pos.y ];
    xiannums = dialogs.input("一共有多少线", "1");

    setConfigSafe("caiji",caiji);
    setConfigSafe("gongju",gongju);
    setConfigSafe("xianpoint",xianpoint);
    setConfigSafe("fistxian",fistxian);
    setConfigSafe("xiannums",xiannums);
    dialogs.alert("","设置完成");
}

function huanxian(xianId,xianpoint,fistxian,xiannums) {
    press( xianpoint[0] , xianpoint[1] , 500 );
    sleep(1500);
    if( xianId<=8 ){
        press( fistxian[0],0.05185*device.width + xianId* 0.11*device.width- 0.055*device.width, 500 );
    }else{
        swipe( fistxian[0], 0.9*device.width, fistxian[0], 0.1*device.width, 2000);
        press( fistxian[0],(1-0.05185)*device.width - 0.055*device.width- (xiannums-xianId)* 0.11*device.width, 500 );
    };
    sleep(3000);
}

//主函数
if (dialogs.select("第一次运行请先设置", ["开始采集", "更新设置"])) { //进入设置
    let endSetup = 0;
    while (!endSetup) {
        runSetup();
        endSetup = dialogs.select("设置好了吗？", ["继续设置", "退出，开始采集"]);
    };
};
sleep(5000);
var caiji = config.get("caiji");
var gongju = config.get("gongju");
var xianpoint = config.get("xianpoint");
var fistxian = config.get("fistxian");
var xiannums = config.get("xiannums");

while(true){
    for( let xianId =1;xianId<=xiannums;xianId++ ){
        huanxian( xianId, xianpoint, fistxian, xiannums );

        press( caiji[0] , caiji[1] , 1000 );
        press( gongju[0] , gongju[1] , 500 );
        // press( caiji[0] , caiji[1] , 500 );
        sleep(8000);
    };
}
