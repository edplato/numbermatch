var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var numLines = 10;
var counter = 0;
var colors = [];
var pickedColor;
var floatingNum = document.getElementById("floatingNum");
var lines = document.querySelectorAll(".line");
var randomNum = randomNumFloat();
reset();
init();

function init() {
  floatingNum.innerHTML = randomNum;
  setLines();
  shuffleLines(nums);
  randomNumFloat();
};

function pageReload() {
  location.reload();
};

function reset() {
  counter = 0;
  colors = pushRandomColorArray(numLines);
  pickedColor = pickColor();
  for (var i = 0; i < lines.length; i++) {
    if (colors[i]) {
      lines[i].style.display = "block";
      lines[i].style.background = "-webkit-gradient(linear, left top, left bottom, from(" + colors[i] + "), to(white))";
      floatingNum.style.color = colors[i];
    } else {
      lines[i].style.display = "none";
    }
  }
};

function newGameCounterCheck() {
  if (counter > 9 && nums.length == 0) {
    $("#floatingNum").animate({
      lineHeight: "1.6em"
    }, 2000);
    floatingNum.innerHTML = "Well Done!";
    setTimeout(pageReload, 3500);
    $("#floatingNum").animate({
      fontSize: "18vh"
    }, 3750);
  }
};

function setLines() {
  for (var i = 0; i < lines.length; i++) {
    lines[i].addEventListener("click", function() {
      lineColor(i);
    });
  }
};
$(".line").click(function() {
  // newGameCounterCheck();
  if (counter !== 10) {
    if (this.innerHTML == randomNum) {
      $(this).animate({
        fontSize: "0px"
      }, 100);
      $(this).animate({
        opacity: "0"
      }, 250);
      $(this).addClass("lineGone", 1800, "easeInBack");
      $(this).removeClass("marker", 2000, "easeInBack");
      counter++;
      var x = nums.indexOf(randomNum);
      nums.splice(x, 1);
      $("#floatingNum").animate({
        fontSize: "16vh"
      }, 800, "swing");
      randomNumFloat();
      fontSizeIncrease();
      newGameCounterCheck();
    }
  } else {
    $(lines).removeClass("lineGone", 2000, "easeInBack");
    reset();
    init();
  }
});

function fontSizeIncrease() {
  if (counter === 4) {
    $(".marker").animate({
      fontSize: "11vh"
    }, 1350);
  } else if (counter === 6) {
    $(".marker").animate({
      fontSize: "15vh"
    }, 1200);
  } else if (counter === 8) {
    $(".marker").animate({
      fontSize: "20vh"
    }, 1050);
  }
};

function lineColor() {
  colors = pushRandomColorArray(numLines);
  for (var i = 0; i < lines.length; i++) {
    if (colors[i]) {
      lines[i].style.background = "-webkit-gradient(linear, left top, left bottom, from(" + colors[i] + "), to(white))";
      floatingNum.style.color = colors[i];
    }
  }
};

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

function pushRandomColorArray(num) {
  var arr = [];
  for (i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
};

function randomColor() {
  var r = Math.floor(Math.random() * 255);
  var g = 20;
  var b = 110;
  return "rgb(" + r + "," + " " + g + "," + " " + b + ")";
};

function randomNumFloat() {
  $("#floatingNum").animate({
    fontSize: "13vh"
  }, 400);
  var tempNums = nums;
  while (counter !== 10) {
    var i = Math.floor(Math.random() * tempNums.length);
    randomNum = tempNums[i];
    floatingNum.innerHTML = randomNum;
    convertNumsToWord();
    return randomNum;
  }
};

function convertNumsToWord() {
  if (randomNum === 1) {
    floatingNum.innerHTML = "one";
  } else if (randomNum === 2) {
    floatingNum.innerHTML = "two";
  } else if (randomNum === 3) {
    floatingNum.innerHTML = "three";
  } else if (randomNum === 4) {
    floatingNum.innerHTML = "four";
  } else if (randomNum === 5) {
    floatingNum.innerHTML = "five";
  } else if (randomNum === 6) {
    floatingNum.innerHTML = "six";
  } else if (randomNum === 7) {
    floatingNum.innerHTML = "seven";
  } else if (randomNum === 8) {
    floatingNum.innerHTML = "eight";
  } else if (randomNum === 9) {
    floatingNum.innerHTML = "nine";
  } else if (randomNum === 10) {
    floatingNum.innerHTML = "ten";
  }
};

function shuffleLines(nums) {
  var x = document.getElementsByClassName("line");
  shuffle(nums);
  for (var i = 0; i < x.length; i++) {
    x[i].innerHTML = nums[i];
  }
};
//Fisher-Yates shuffle algorithm
function shuffle(array) {
  var m = array.length,
    t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};