var self = require('sdk/self');
var data = self.data;
var pageMod = require('sdk/page-mod');

var { ToggleButton } = require('sdk/ui/button/toggle');

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

var button = ToggleButton({
	id: "toggle-button",
	label: "Turn CreepMode On",
	icon:{
		"16":"./icons/disabled-16.png",
		"32":"./icons/disabled-32.png",
		"64":"./icons/disabled-64.png",
	},
	onChange:function(state){
		console.log("Button State=",state.checked);
		if(state.checked){
			button.state(button,enabledState);
			emitAllWorkers(workers,'enabled');
		} else {
			button.state(button,disabledState);
			emitAllWorkers(workers,'disabled');
		}
	}
});

var workers = [];

function detachWorker(worker, workerArray){
	var index = workerArray.indexOf(worker);
	if(index != -1){
		workerArray.splice(index,1);
	}
}

function emitAllWorkers(workerArray, func){
	console.log("emitting '"+func+"' to all workers");
	console.log("there are "+workerArray.length+" workers");
	for(var i = 0; i< workerArray.length;++i){
		workerArray[i].port.emit(func);
	}
}

//pagemod facebook
pageMod.PageMod({
	include:'*.facebook.com',
	contentScriptFile:'./creepmode.js',
	onAttach: function(worker){
		workers.push(worker);
		worker.on('detach',function(){
			detachWorker(this,workers);
		});

		if(button.checked){
			worker.port.emit('enabled');
		} 
	}
});

