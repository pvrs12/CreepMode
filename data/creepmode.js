var oldInnerHTML = window.document.body.innerHTML;

self.port.on('disabled',function(){
	creepModeOff();
});

self.port.on('enabled',function(){
	creepModeOn();
});

function creepModeOff(){
	window.document.body.innerHTML=oldInnerHTML;
	console.log("Creep Mode turned off");
}

function creepModeOn(){
	oldInnerHTML = window.document.body.innerHTML;
	console.log("Creep Mode turned on");

	hideLikes();
	hideCommentBox();
	hideCommentLink();
	hideShare();
}

function hideLikes(){
	hideClassElements('UFILikeLink');
}

function hideCommentBox(){
	hideClassElements('UFIAddComment');
}

function hideCommentLink(){
	hideClassElements('comment_link');
}

function hideShare(){
	hideClassElements('share_root');
}

function hideClassElements(className){
	var elements = document.getElementsByClassName(className);
	
	for(var i=0;i<elements.length;++i){
		elements[i].style.display="none";
	}

}
