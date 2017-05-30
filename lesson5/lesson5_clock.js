window.onload = function(){
	var clock = new Clock();
	document.getElementsByClassName('start')[0].addEventListener('click', clock.start);
	document.getElementsByClassName('stop')[0].addEventListener('click', clock.stop);
};


function Clock() {
	var date = new Date();
	var time;
	if (date.getMinutes() >=0 && date.getMinutes() <= 9) {
		if (date.getSeconds() >=0 && date.getSeconds() <= 9) {
			time = date.getHours()+':0'+date.getMinutes()+':0'+date.getSeconds();
		} else {
			time = date.getHours()+':0'+date.getMinutes()+':'+date.getSeconds();
		}
	} else {
		if (date.getSeconds() >=0 && date.getSeconds() <= 9) {
			time = date.getHours()+':'+date.getMinutes()+':0'+date.getSeconds();
		} else {
			time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
		}
	}	
	
	document.getElementsByTagName('div')[0].innerHTML = time;
	window.setTimeout(arguments.callee, 1000);
	
	this.start = function() {
		//
	}
	
	this.stop = function() {
		//
	}
}
