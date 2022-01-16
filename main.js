/* gogofp */


/*      search module            */
let labels = document.querySelectorAll('div.searchLabel label');
let searchForm = document.querySelector('.searchForm');
let inputName = document.querySelector('.search-bar');

let actions=['https://www.baidu.com/s',
'https://www.dogedoge.com/results',
'https://www.zhihu.com/search',
'https://cn.bing.com/search',
'https://www.google.com/search',
'https://mijisou.com/'];
let names = ['wd','q','q','q','q','q'];

for(let i=0;i<labels.length;i++){
    labels[i].onclick = function(){
        searchForm.action = actions[i];
        inputName.name = names[i];
    }
}

/*       open in new tab          */
// let links = document.querySelectorAll('table.links a');
// for(let i=0;i<links.length;i++){
//     links[i].target = "_blank"
// };

//       显示日期               
let myDate = new Date();
let day = myDate.getDate();
let week = myDate.getDay();

let dayLeft = parseInt(day/10);
let dayRight = day%10;

let numList = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
let date = document.querySelectorAll('ul.date li');
//日期
date[0].textContent = '🈷️'+numList[dayLeft]+numList[dayRight];
//星期
date[1].textContent = '🔯'+numList[week];


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
//XHR2.open('get', 'WeatherSample.json',true);
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
	let tqnumList = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
	let weather = document.querySelectorAll('ul.weather li');
	
	//温度
	//console.log(tempMax+'~'+tempMin);
	if (tempMin >= 0) {
		weather[0].textContent = '🌈'+tqnumList[parseInt(tempMax/10)]+tqnumList[tempMax%10]+
	'⏩'+tqnumList[parseInt(tempMin/10)]+tqnumList[tempMin%10];
	}else{
		weather[0].textContent = '🌈'+tqnumList[parseInt(tempMax/10)]+tqnumList[tempMax%10]+
	'⏩'+'*️⃣'+tqnumList[(-1*tempMin)%10];
	}

	
	
	//天气
	weather[1].textContent = '☀️'+textDay+'⏩'+textNight;
	
	//湿度
	weather[2].textContent = `💧 ${humidity}%`;
	
	//预警
	weather[3].textContent = '✅';
	
	  //高温
	if(parseInt(tempMax) >= 37){
		weather[3].textContent = '🥵';
	}
	  //大风
	if(parseInt(windSpeedDay)>19 || parseInt(windSpeedNight)>19 ){
		weather[3].textContent = '🌀';
	}
	
	//预报日期
	weather[4].textContent = '💤 '+fxDate;

}







