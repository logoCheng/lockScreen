//引入模块
const { app, BrowserWindow, ipcMain, Menu, dialog, globalShortcut } = require("electron");
const path = require("path");
//菜单模块
//窗口实例对象
let mainWindow;
//关闭窗口状态为
let closeTip = false;
//创建窗口的函数
function r_createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        alwaysOnTop: true,
        //让其html5页面支持node
        webPreferences: {
            nodeIntegration: true
        }
    })
    // mainWindow.webContents.openDevTools();
    //窗口加载文件
    //第一种方法
    // mainWindow.loadFile("index.html");
    //第二种方法
    mainWindow.loadURL(path.join(__dirname) + "\\index.html");
    //关闭窗口
    mainWindow.on("close", function () {
        // mainWindow = null;
        //设置标志位 判断是否可以关闭窗口
        if (!closeTip) {
            r_createWindow();
        } else {
            mainWindow = null;
        }
    })

    //接受模块
    ipcMain.on("msg-a", function (event, msg) {
        if (msg == "shutdown") {
            closeTip = true;
            mainWindow.destroy();
        }
    })
}
//引入菜单
Menu.setApplicationMenu(null);
//启动时
app.on("ready", r_createWindow);







