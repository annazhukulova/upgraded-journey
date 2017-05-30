var number;
var vote = document.getElementsByClassName('vote')[0];
	
function voterUp() {
	number = +vote.innerHTML;
	vote.innerHTML = ++number;
}

function voterDown() {
	number = +vote.innerHTML;
	vote.innerHTML = --number;
}	
	
document.getElementsByClassName('down')[0].addEventListener('click', voterDown);
document.getElementsByClassName('up')[0].addEventListener('click', voterUp);	