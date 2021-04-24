/* gogofp */


/*      search module            */
let labels = document.querySelectorAll('div.banner-1 label');
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
let links = document.querySelectorAll('table.links a');
for(let i=0;i<links.length;i++){
    links[i].target = "_blank"
};

//       显示日期               
let myDate = new Date();
let day = myDate.getDate();
let week = myDate.getDay();

let dayLeft = parseInt(day/10);
let dayRight = day%10;

let numList = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
let date = document.querySelectorAll('div.date p');
//日期
date[0].textContent = '🈷️👉'+numList[dayLeft]+numList[dayRight];
//星期
date[1].textContent = '🔯👉'+numList[week];


//		显示天气
// Haidian = 101010200
// Dongcheng = 101011600
//		请求天气
let XHR = new XMLHttpRequest();
XHR.onreadystatechange = function() {
	//请求成功
	if (this.readyState == 4 && this.status == 200) {
		let jsonWeather = JSON.parse(this.responseText);
		//解析返回的json
		
		//气温
		let tempMax = jsonWeather.daily[1].tempMax;
		let tempMin = jsonWeather.daily[1].tempMin;
		//天气
		let textDay = jsonWeather.daily[1].textDay;
		let textNight = jsonWeather.daily[1].textNight;
		//风速
		let windSpeedDay = jsonWeather.daily[1].windSpeedDay;
		let windSpeedNight = jsonWeather.daily[1].windSpeedNight;
		//湿度
		let humidity = jsonWeather.daily[1].humidity;
		//更新时间
		let updateTime = jsonWeather.updateTime;

		console.log(tempMax,tempMin,textDay,textNight,windSpeedDay,windSpeedNight,updateTime);
				
		//显示到信息栏
		let tqnumList = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
		let weather = document.querySelectorAll('div.weather p');
		
		//温度
		weather[0].textContent = '⛱️👉'+tqnumList[parseInt(tempMax/10)]+tqnumList[tempMax%10]+
		'⏩'+tqnumList[parseInt(tempMin/10)]+tqnumList[tempMin%10];
		
		//天气
		weather[1].textContent = '☀️👉'+textDay+'⏩'+textNight;
		
		
		//预警
		weather[2].textContent = '😉';
		//湿度
		//if(parseInt(humidity) >= 60){
		//	weather[2].textContent = weather[2].textContent+ '🥵';
		//}
		//高温
		if(parseInt(tempMax) >= 37){
			weather[2].textContent = weather[2].textContent + '🌡️';
		}
		//大风
		if(parseInt(windSpeedDay)>19 || parseInt(windSpeedNight)>19 ){
			weather[2].textContent = weather[2].textContent + '🌀';
		}
	}
}
XHR.open('get', 'https://devapi.qweather.com/v7/weather/3d?location=101011600&key=93154022920b4c4db83874db33b724d3',true);
//XHR.open('get', 'WeatherSample.json',true);
XHR.send();






