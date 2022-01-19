/*   搜索组件         */

//为每个按钮绑定方法
let searchBtnList = document.querySelectorAll(".searchBtnList li a");

for (let i = 0; i < searchBtnList.length; i++) {
	searchBtnList[i].addEventListener("click",function(e){
		let id = e.target.getAttribute('id');
		//另一种:$(this).attr("id")

		//回调函数如果带参数，则须通过此种形式调用
		setFormAttr(id);
		setPrimaryBtn(id);
	});	
}

//函数用于设置form属性
function setFormAttr(engineName){
	const searchEngineDic = {
		"baidu":{
			action:"https://www.baidu.com/s",
			name:"wd"
		},
		"bing":{
			action:"https://cn.bing.com/search",
			 name:"q"
		},
		"google":{
			action:"https://www.google.com/search",
			 name:"q"
		},
		"zhihu":{
			action:"https://www.baidu.com/s",
			 name:"q"
		}
	}
	console.log(`${engineName} is clicked`);
	//设置action属性
	let searchForm = document.querySelector('form.searchForm');
	searchForm.action = searchEngineDic[engineName].action;
	
	//设置name属性
	let inputName = document.querySelector('input.searchBar');
    inputName.name = searchEngineDic[engineName].name;
};

//设置被点击li的class为active
function setPrimaryBtn(btnName){
	for (let i = 0; i < searchBtnList.length; i++) {
		if (searchBtnList[i].id == btnName) {
			searchBtnList[i].parentNode.classList.add("active");
		}else{
			searchBtnList[i].parentNode.classList.remove("active");
		};
	}
}

//清除keyword
document.querySelector('button.clearKwd').addEventListener('click',clearKwd);
function clearKwd(){
	document.querySelector('input.searchBar').value = '';
}

//       显示日期               
let myDate = new Date();
let day = myDate.getDate();
let month = myDate.getMonth();
let week = myDate.getDay();

//
let weekArray = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

let dateList = document.querySelector('.dateList');

dateList.innerHTML += `${month+1}月${day}日<br>${weekArray[week]}<br>`;


//		显示天气
// Haidian = 101010200
// Dongcheng = 101011600
//		请求天气
let XHR2 = new XMLHttpRequest();

//      请求url
let url1 = 'https://devapi.qrpher.com/v7/rpher/3d';//rp->weat
let url2 = '?location=101011600';
let url3 = '&index=93154022920b4c4db83874db33b724d3';//index->key

XHR2.onreadystatechange = function() {
	//请求成功
	if (this.readyState == 4 && this.status == 200) {
		let jsonWthr = JSON.parse(this.responseText);
		console.log(jsonWthr);
		//解析返回的json
		renderWthr(jsonWthr);	
	}
}

url1 = url1.replace(/rp/g,'weat');
url3 = url3.replace(/index/,'key');
url = url1+url2+url3;

XHR2.open('get',url,true);
XHR2.send();

//渲染json
function renderWthr(jsonObj){
	//气温
	let tempMax = jsonObj.daily[1].tempMax;
	let tempMin = jsonObj.daily[1].tempMin;
	//天气
	let textDay = jsonObj.daily[1].textDay;
	let textNight = jsonObj.daily[1].textNight;
	//风速
	let windSpeedDay = jsonObj.daily[1].windSpeedDay;
	let windSpeedNight = jsonObj.daily[1].windSpeedNight;
	console.log(`Fengsu day-night: ${windSpeedDay} - ${windSpeedNight}`);
	//湿度
	let humidity = jsonObj.daily[1].humidity;
	//更新时间
	let updateTime = jsonObj.updateTime;
	console.log(`update at :${updateTime}`);
	//预报日期
	let fxDate = jsonObj.daily[1].fxDate;
	console.log(`Yubao Riqi: ${fxDate}`);
	
	//显示到信息栏
	let weatherList = document.querySelector('.weatherList');
	
	//温度
	weatherList.innerHTML += `温度: ${tempMax} - ${tempMin}<br>`;
	//天气
	weatherList.innerHTML += `天气: ${textDay} - ${textNight}<br>`;
	//湿度
	weatherList.innerHTML += `湿度: ${humidity}%<br>`;
	//风力
	weatherList.innerHTML += `风速: ${windSpeedDay} - ${windSpeedNight}<br>`;
	  //高温
	if(parseInt(tempMax) >= 37){
		weatherList.innerHTML += '🥵'+'<br>';
	}
	  //大风
	if(parseInt(windSpeedDay)>19 || parseInt(windSpeedNight)>19 ){
		weatherList.innerHTML += '🌀'+'<br>';
	}
	//预报日期
	weatherList.innerHTML += `预报: ${fxDate}<br>`;

}







