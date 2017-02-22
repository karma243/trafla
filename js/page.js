//currently using this to keep all the scripts. not in use actively
function setH1 () {
	var myHeading = document.querySelector('h1');
	myHeading.textContent = 'Tower of Hanoi';
}

function setHeader (value) {
	var myHeading = document.querySelector('h1');
	myHeading.textContent = value;
}

function fillCanvas (a) {
	var depth = 490; var leftMost = 100; var rightMost = 1000; var height = 300; var unitLen = (rightMost - leftMost) / 14;
	var ctx = document.getElementById("animation").getContext("2d");
	ctx.beginPath();
	ctx.lineWidth = 5;
	drawTower(ctx, leftMost, rightMost, height, depth);
	ctx.stroke();
	ctx.closePath();
	positionWeights(ctx, a);
}

function clearCanvas () {
	var ctx = document.getElementById("animation").getContext("2d");
	ctx.clearRect(0,0,1000,500)
}


/**
Draws three towers to shift the weights
*/
function drawTower (ctx, hor1, hor2, height, frameDepth) {
	var depth = 490; var leftMost = 100; var rightMost = 1000; var height = 300; var unitLen = (rightMost - leftMost) / 14;
	var h1 = hor1; h2 = h1+3*unitLen;
	for (var i = 0; i < 3; i++) {
		ctx.moveTo(h1, frameDepth); ctx.lineTo(h2, frameDepth);
		var middlePoint = (h1 + h2) / 2;
		ctx.moveTo(middlePoint, frameDepth); ctx.lineTo(middlePoint, frameDepth - height);
		h1 = h2 + unitLen; h2 = h1+3*unitLen;
	}
}

/*
	reads position (index of tower) for each weight and locates each weight accordingly. 0th index is largest weight and last element
	will be smallest weight
*/
function positionWeights (ctx, positions) {
	var depth = 490; var leftMost = 100; var rightMost = 1000; var height = 300; var unitLen = (rightMost - leftMost) / 14;
	var firstMid = leftMost + 1.5*unitLen;
	var xMids = [firstMid, firstMid + 4*unitLen, firstMid + 8*unitLen];
	var depths = [depth, depth, depth];
	var width = 2 * unitLen; var h = 10;
	for (var i = 0; i < positions.length; i++) {
		var pos = positions[i];
		ctx.rect(xMids[pos] - width / 2, depths[pos] - h, width, h);
		width = 0.6 * width;
		depths[pos] = depths[pos] - h;
	};
	ctx.stroke();
}

/**
how to do hanoi??
1. Write a func which takes an array for position of each weight
2. put the weights in that position
3. take next version of array and do the same

will be using a queue. as soon as the user hits start, will start polling from queue
*/

function resetCanvas (a) {
	clearCanvas();
	fillCanvas(a);
}

/*to change the text of button*/
function startExecution (el) {
	if (el.innerHTML == 'Start') {
		var count = readDropdown();
		var zeros = zeroArray(count)
		resetCanvas(zeros);
		//startAnimation
		hanoi(count, 0, 2, 1, new Queue(), zeros);
		el.innerHTML = 'Pause';
	} else if (el.innerHTML == 'Pause') {
		//resume animation
		el.innerHTML = 'Resume';
	} else {
		//pause the animation
		el.innerHTML = 'Pause';
	}
}

function zeroArray (length) {
	var a = new Array(length);
	for (var i = 0; i < a.length; i++) {
		a[i] = 0;
	};
	return a;
}

function readDropdown(argument) {
	var e = document.getElementById("dropdown");
	var entry = e.options[e.selectedIndex].value;
	return parseInt(entry);
}

function hanoi (count, src, target, via, queue, a) {
	console.log(a);
	if (count == 0) return;
	hanoi(count - 1, src, via, target, queue, a);
	swap(src, target, a, queue);
	hanoi(count - 1, via, target, src, queue, a);
}

function swap(src, target, a, queue) {
	var millisecondsToWait = 500;
	for (var i = a.length - 1; i >= 0; i--) {
		if (a[i] == src) { //it means that the element is in src column
			a[i] = target;
			setTimeout(function() {
    			resetCanvas(a.slice());
			}, 2000);
			queue.enqueue(a.slice());
			break;
		}
	}
}