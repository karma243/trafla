//currently using this to keep all the scripts. not in use actively
function setH1 () {
	var myHeading = document.querySelector('h1');
	myHeading.textContent = 'Tower of Hanoi';
}

function readDropdown (argument) {
	var e = document.getElementById("form1");
	var count = e.options[e.selectedIndex].text;
	var myHeading1 = document.querySelector('h2');
	myHeading1.textContent = count;
}

var myHeading = document.querySelector('h1');
myHeading.textContent = 'Tower of Hanoi';

fillCanvas();

function fillCanvas () {
	var ctx = document.getElementById("animation").getContext("2d");
	ctx.beginPath();
	ctx.lineWidth = 5;
	var depth = 490; var leftMost = 100; var rightMost = 1000; var height = 300;
	drawTower(ctx, leftMost, rightMost, height, depth);
	ctx.stroke();
	ctx.closePath();
}

function clearCanvas () {
	var ctx = document.getElementById("animation").getContext("2d");
	ctx.clearRect(0,0,1000,500)
}

function drawTower (ctx, hor1, hor2, height, frameDepth) {
	var x = (hor2 - hor1) / 14;
	var h1 = hor1; h2 = h1+3*x;
	for (var i = 0; i < 3; i++) {
		ctx.moveTo(h1, frameDepth); ctx.lineTo(h2, frameDepth);
		var middlePoint = (h1 + h2) / 2;
		ctx.moveTo(middlePoint, frameDepth); ctx.lineTo(middlePoint, frameDepth - height);
		h1 = h2 + x; h2 = h1+3*x;
	}
}

function startExecution (el) {
	if (el.innerHTML == 'Start') {
		el.innerHTML = 'Pause';
	} else if (el.innerHTML == 'Pause') {
		el.innerHTML = 'Resume';
	} else {
		fillCanvas();
		el.innerHTML = 'Pause';
	}
}
