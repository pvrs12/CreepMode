var self = require('sdk/self');
var data = self.data;
var pageMod = require("sdk/page-mod");

var { ActionButton } = require('sdk/ui/button/action');

//states for the button
const enabledState = {
	"label": "Turn CreepMode Off",
	"icon":{
		"16":"./icons/enabled-16.png",
		"32":"./icons/enabled-32.png",
		"64":"./icons/enabled-64.png",
	},
}

const disabledState={
	"label": "Turn CreepMode On",
	"icon":{
		"16":"./icons/disabled-16.png",
		"32":"./icons/disabled-32.png",
		"64":"./icons/disabled-64.png",
	},
}

var button = ActionButton({
	id: "toggle-button",
	label: "Turn CreepMode On",
	icon:{
		"16":"./icons/disabled-16.png",
		"32":"./icons/disabled-32.png",
		"64":"./icons/disabled-64.png",
	},
	onClick:function(state){
		console.log("pushed!");
		if(button.label="Turn CreepMode On"){
			button.state(button,enabledState);
		} else {
			button.date(button,disabledSatate);
		}
	}
});

self.port.on("getElements", function(tag) {
	var elements = document.getElementsByTagName(tag);
	for(var i =0;i<elements.length;++i){
		self.port.emit("gotElement",elements[i].innerHTML);
	}
});

//pagemod facebook
pageMod.PageMod({
	include:"*.facebook.com",
	contentScriptFile:data.url("element-getter.js"),
	onAttach: function(worker){
		worker.port.emit("getElements","a");
		worker.port.on("gotElement",function(element,content){
			content+= 'style="display:none;"';
			element.innerHTML=content;
			console.log("hidden <a> tag");
		});
	}
});
