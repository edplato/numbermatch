var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
var floatingNum = document.getElementById("floating-num");
var randomNum = randomNumFloat();
var numLines = 11;
var colors = [];
var pickedColor;
var lines = document.querySelectorAll(".line");
var counter = 0;

reset();
init();

function init(){
	floatingNum.innerHTML = randomNum;
	// $("#pictureframe").css("margin-top", randomBirdHeight());
	$("#pictureframe").css("margin-top", "-200px");
	setLines();
	randomNumFloat();
}

function reload(){
	location.reload();
}

function reset(){
	counter = 0;
	//generate all new colors
	colors = generateRandomColors(numLines);
	//pick new random color form array
	pickedColor = pickColor();
	for(var i = 0; i < lines.length; i++){
		if(colors[i]){
		lines[i].style.display = "block";
		//standard color mode
		// lines[i].style.background = colors[i];
		//gradient color mode
		lines[i].style.background = "-webkit-gradient(linear, left top, left bottom, from(" + colors[i] + "), to(white))";
		floatingNum.style.color = colors[i];
		} else {
		lines[i].style.display = "none";
		}
	}
}

function newNums(){
	if(counter === 9){
		$("#floating-num").animate({lineHeight: "1.6em"}, 2000);
		floatingNum.innerHTML = "Well Done!";
		setTimeout(reload, 2200);
		$("#floating-num").animate({fontSize: "160vh"}, 1250);
	}
}

function setLines(){
	for(var i = 0; i < lines.length; i++){
		//add mouseover listeners to lines
		lines[i].addEventListener("click", function(){
		//grab color of mouseover line
		dpickColor(i);
	  });
	}
} 

$( ".line" ).click(function() {
	newNums();
	if(counter !== 10){
		// fontSizeIncrease();
		if(this.innerHTML == randomNum){
		  $( this ).animate({fontSize: "0px"}, 100);
		  $( this ).addClass("line-gone", 1800, "easeInBack"); 
		  $( this ).removeClass("marker", 2000, "easeInBack"); 
		  counter++;
		  var x = nums.indexOf(randomNum);
		  nums.splice(x, 1);
		  $("#floating-num").animate({fontSize: "20vh"}, 400);
		  randomNumFloat();
		  fontSizeIncrease();
		}
		
	} else {
		$(lines).removeClass("line-gone", 2000, "easeInBack");
		reset();
		init();
	}
})



function dpickColor() { 
	colors = generateRandomColors(numLines);
	for(var i = 0; i < lines.length; i++){
		if(colors[i]){
		//standard color mode
		// lines[i].style.background = colors[i];

		//gradient color mode
		lines[i].style.background = "-webkit-gradient(linear, left top, left bottom, from(" + colors[i] + "), to(white))";
		
		floatingNum.style.color = colors[i];
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
	//SET UP FOR PRIMARILY PINK AND SOME BLUE
	//pick a red from 0-255
	var r = Math.floor(Math.random() * 255);
	//pick a green from 0-255
	var g = 20;
	//pick a blue from 0-255
	var b = 110;
	return "rgb(" + r + "," + " " + g + "," + " " + b + ")";
}

function randomBirdHeight(){
	var height = Math.floor(Math.random() * 7) *(-1);
	return height + "em";
}

//Random floating number selected from available indexes and converted to a word
function randomNumFloat(){
	$("#floating-num").animate({fontSize: "15vh"}, 400);
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

//increase font size as lines decrease
function fontSizeIncrease(){
	if(counter == 4){
		$(".marker").animate({fontSize: "12vh"}, 1350);
	}
	else if(counter == 6){
		$(".marker").animate({fontSize: "16vh"}, 1400);
	}
	else if(counter == 9){
		$(".marker").animate({fontSize: "24vh"}, 1450);
	}
}


