var oldInnerHTML = window.document.body.innerHTML;

var modifying = false;
var enabled = false;

var hideElements=[
	'_5gl-',//photobar
	'_32jt',//addfriend
	'share_root',//share
	'comment_link',//commentlink
	'UFIAddComment',//commentbox
	'UFILikeLink',//likelink
	'FriendRequestAdd',//friendrequest button
	'addButton',//friendrequest button
]

self.port.on('disabled',function(){
	creepModeOff();
});

self.port.on('enabled',function(){
	creepModeOn();
});

document.body.addEventListener("DOMSubtreeModified",function(){
	if(!modifying){
//		console.log('tree modified! '+new Date());
		hideStuff();
	}
},false);

function creepModeOff(){
	enabled = false;
	modifying=true;
	window.document.body.innerHTML=oldInnerHTML;
	modifying=false;
//	console.log("Creep Mode turned off");
}

function creepModeOn(){
	enabled = true;
	oldInnerHTML = window.document.body.innerHTML;
//	console.log("Creep Mode turned on");

	hideStuff();
}

function hideStuff(){
	if(enabled){
		modifying=true;
		for(var i=0;i<hideElements.length;++i){
//			console.log('hiding \''+hideElements[i]+'\'');
			hideClassElements(hideElements[i]);
		}
		modifying=false;
	}
}

function hideClassElements(className){
	var elements = document.getElementsByClassName(className);
	
	for(var i=0;i<elements.length;++i){
		elements[i].style.display="none";
	}
}
