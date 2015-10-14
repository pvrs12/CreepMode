var self = require('sdk/self');

var { ActionButton } = require('sdk/ui/button/action');

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
