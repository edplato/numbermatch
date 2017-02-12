//future version maybe counting game with number word in clouds area and actual random numbers
//on lines that randomize and must be clicked in order to continue!

//different modes: 1-10,  10-1,  odds,  evens

//big success - above 'future version' has been realized as of 2/7. next things to think about:
//more animations/more kid friendly?
//reset without reloading browser is very important

var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

var floatingNum = document.getElementById("floating-num");
var randomNum = randomNumFloat();

floatingNum.innerHTML = randomNum;

var numLines = 10;
var colors = [];
var pickedColor;
var lines = document.querySelectorAll(".line");
var counter = 0;

reset();
init();

function init(){
	setLines();
	randomNumFloat();
}

function reload(){
	location.reload();
}

function newNums(){
	if(counter === 9){
		floatingNum.innerHTML = "Well Done!";
		setTimeout(reload, 1700);
	}
}

function setLines(){
	for(var i = 0; i < lines.length; i++){
		//add mouseover listeners to lines
		lines[i].addEventListener("mouseover", function(){
		//grab color of mouseover line
		dpickColor(i);
	  });
	}
} 

$( ".line" ).click(function() {
	newNums();
	if(counter !== 10){
		if(this.innerHTML == randomNum){
		$( this ).addClass("line-gone", 2000, "easeInBack");
		  counter++;
		  var x = nums.indexOf(randomNum);
		  nums.splice(x, 1);
		  randomNumFloat();
		}
	} else {
		$(lines).removeClass("line-gone", 2000, "easeInBack");
		reset();
		init();
	}
})

function reset(){
	counter = 0;
	//generate all new colors
	colors = generateRandomColors(numLines);
	//pick new random color form array
	pickedColor = pickColor();
	for(var i = 0; i < lines.length; i++){
		if(colors[i]){
		lines[i].style.display = "block";
		lines[i].style.background = colors[i];
		} else {
		lines[i].style.display = "none";
		}
	}
}

function dpickColor() { 
	colors = generateRandomColors(numLines);
	for(var i = 0; i < lines.length; i++){
		if(colors[i]){
		lines[i].style.background = colors[i];
		}
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make array
	var arr = [];
	//repeat "num" times
	for(i=0;i<num;i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	//return that array at end
	return arr;
}

function randomColor(){
	//SET UP FOR PRIMARILY BLUE AND GREEN
	//pick a red from 0-255
	var r = Math.floor(Math.random() * 10);
	//pick a green from 0-255
	var g = Math.floor(Math.random() * 215);
	//pick a blue from 0-255
	var b = Math.floor(Math.random() * 255);
	return "rgb(" + r + "," + " " + g + "," + " " + b + ")";
}

//Random floating number selected from available indexes and converted to a word
function randomNumFloat(){
	var tempNums = nums;
	while(counter !== 10) {
	var i = Math.floor(Math.random()*tempNums.length);
	randomNum = tempNums[i];
	floatingNum.innerHTML = randomNum;
	convertNumsToWord();
	return randomNum;
	}
}

//converts nums to a word
function convertNumsToWord() {
	if(randomNum === 1){
		floatingNum.innerHTML = "one";
	} else if(randomNum === 2) {
		floatingNum.innerHTML = "two";
	} else if(randomNum === 3) {
		floatingNum.innerHTML = "three";
	} else if(randomNum === 4) {
		floatingNum.innerHTML = "four";
	} else if(randomNum === 5) {
		floatingNum.innerHTML = "five";
	} else if(randomNum === 6) {
		floatingNum.innerHTML = "six";
	} else if(randomNum === 7) {
		floatingNum.innerHTML = "seven";
	} else if(randomNum === 8) {
		floatingNum.innerHTML = "eight";
	} else if(randomNum === 9) {
		floatingNum.innerHTML = "nine";
	} else if(randomNum === 10) {
		floatingNum.innerHTML = "ten";
	}
}

//shuffles random numbers
var x = document.getElementsByClassName("line");
shuffle(nums);
for (var i = 0; i < x.length; i++) {
    x[i].innerHTML = nums[i];
}

//Fisher-Yates shuffle algorithm
function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}