//引入ipcranderer 作用 渲染进程向主进程发送数据
const { dialog } = require("electron").remote;
const { ipcRenderer,shell } = require("electron");
//文件加载模块
const fs=require('fs')


//主线程
let pwd = document.querySelector("#mypwd");
pwd.focus();
window.addEventListener("keydown",function(e){
    if(e.keyCode == 13){
        if(pwd.value == "1230."){
            ipcRenderer.send("msg-a","shutdown");
        }else{
            // dialog.showErrorBox("提示","密码错误！！！");
            pwd.value = "";
            pwd.focus();
        }
    }
})
//音频模块
//加载本地列表
//播放歌曲名字
var playList = [];
loadMusicList();
	function loadMusicList(){
		fs.readdir(__dirname+"/music_list/",function(err,files){
			if(err){
				console.log(err);
			}
			console.log(files);
			files.forEach( function (file){
				playList.push(file);
				create_list(file);
				// console.log( file );
			});
		})
	}
	//歌曲列表
	function create_list(fileName){
		var temLi = document.createElement("li");
		temLi.innerHTML = substrFileName(fileName);
		document.getElementById("lis-con").append(temLi);
	}

	//对歌曲名字进行处理
	function substrFileName(fileName){
		// console.log(fileName.lastIndexOf("."));
		if(fileName.length >=25){
			return fileName.slice(0,25);
		}else{
			return fileName.slice(0,fileName.lastIndexOf("."));
		}
	
	}
setTimeout(function(){
var all = document.getElementsByTagName("li");
var myaud = document.getElementById("myaud");
for(var index=0;index<playList.length;index++){
	setAttr(index);
}
function setAttr(index){
	all[index].addEventListener("dblclick",function(){
	updateStyleList(index);
	myaud.setAttribute("src",__dirname+"/music_list/"+playList[index]);	
})
}
function updateStyleList(index){
	console.log(index);
	all[index].style.color = "yellow";
	for(var i = 0;i<all.length;i++){
	if(i == index){
	continue;
}
	all[i].style.color = "white";
}	
}
},1000)

//添加文件模块 由于浏览器原因 这个模块放弃
// var addMusic = document.getElementById("add");
// var upfileCon = document.getElementById("upfile");
// addMusic.addEventListener("click",function(){
// 	upfileCon.click();
// })
// upfileCon.onchange = function(){
// 	console.log(this.files);
// }
