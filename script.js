var x;
var gridDrawn = false;
var hex;
var showdrop = false;
var rows;
var col;
var roo = false;
var gridBox;
var gridBackground = document.getElementById("gridContainor");
var scaleDisplay = document.getElementById("myCheck").checked;
var rulerdisp = $('.ruler').css("display");
var  rulerElement;
var rotateTriggerCount = 0;
var wid= 0;
var barWidth = 0;
var finalWidth = 0;
var scaleDrag = false;
var rememberDictonary;
var firstTime = true;
var bucketUsed = 0;
var totalBuckets = 50;
var gridsPainted = 0;
var arr1=[];
var arr2=[];
var arr3=[];
var el = 0 ;
var p2 = false;
var starting = false;
var count = 0;
var pos1 
var pos2 
var pos3 
var pos4 
var flag5;
var flag6;
var flag7;
var flag8;
var flag9;
var flag10;
var flag11;
var flag12;
var secondPage=false;
rows = 6;
col = 6;
var gridOptions = {
  market: {
    small: {
      gridCount: 5.2,
    },
    medium: {
      gridCount: 20.8,
    },
    large: {
      gridCount: 46.8
      ,
    },
    gridWidth: 1.1,
    gridHeight: 1,
    bucketRequired: 1.3,
    width: 99,
    height: 90,
  },
  jazz: {
    small: {
      gridCount: 3.6,
    },
    medium: {
      gridCount: 14.4,
    },
    large: {
      gridCount: 32.4,
    },
    gridWidth: 0.9,
    gridHeight: 0.81,
    bucketRequired: 0.9,
    width: 83,
    height: 78,
  },

  fiddle: {
    small: {
      gridCount: 4,
    },
    medium: {
      gridCount: 16,
    },
    large: {
      gridCount: 36,
    },
    gridWidth: 1,
    gridHeight: 0.84,
    bucketRequired: 1,
    width: 92,
    height: 76,
  },
  you: {
    small: {
      gridCount: 2.8,
    },
    medium: {
      gridCount: 11.2,
    },
    large: {
      gridCount: 25.2,
    },
    gridWidth: 0.75,
    gridHeight: 0.75,
    bucketRequired: 0.7,
    width: 69,
    height: 69,

  },
};

var zoomSize = {
  small: "200%",
  medium: "400%",
  large: "600%",
};
var gridSize = "large";
var canvasType = "jazz";

// gridOptions[canvasType][gridSize].gridCount

$(document).ready(function () {
  addAccessibility();
  gridDrawn = false;
  drawGrid(null);
  $(document).on('dragend', function() {
    document.body.style.cursor = 'default';
  });
  $(document).on('dragover', function() {
    document.body.style.cursor = 'none';
  });
});




function changePage(x) {
  document.querySelector('.intro1').style.backgroundImage = "url('./Images/Mural_bg1.png')";
  document.getElementById("page-1").style.display = "none";
  document.getElementById("page-2").style.display = "none";
  document.getElementById("page-" + x).style.display = "block";
  pageLayout(x);
}

function pageLayout(x) {
  if (x == 1) {
    grid2(null,"large","jazz");
    $('.help').css("top","691px");
    document.getElementById("hint").innerHTML = "Watch here for hints and instructions.";
//   gridSize = "large";
//  canvasType = "jazz";
//  grid2(null , "large" , "jazz");
    p2 = false;
  }
  if (x == 2) {
    stop();
    count = 0;
    p2 =true;
    hideBox();
    resetBack();

    document.getElementById("hint").innerHTML = "Watch here for hints and instructions.";
    $('.draggable1').css({ top: "660px" });
     document.getElementById("checkAnswer").src = "./Images/Check_Btn.png";
    console.log(canvasType);
    el=50
    grid2(null,"small","fiddle");
    if(showdrop){
      document.getElementById("dropp2").classList.remove("hidden");
    }
    document.getElementById("myCheck").checked = true;
    rulerElement = document.getElementById("draggable")
    $(".coupon_question").click(function () {
      if ($(this).is(":checked")) {
        rulerElement = document.getElementById("draggable")
        $(".ruler").show();
      } else {
        $(".ruler").hide();
      }
    });
  }
  // drawGrid(null);
}



function drawGrid(value) {
  grid1(value);
}

//webcam 
var stop = function() {
  if (starting){
    var stream = video.srcObject;
    var tracks = stream.getTracks();
  
    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      track.stop();
    }
  
    video.srcObject = null;
  }
}

var start = function(){
  starting = true
	var video = document.getElementById('video'),
	 vendorUrl = window.URL || window.webkitURL;

	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: true })
		.then(function (stream) {
		  video.srcObject = stream;
		}).catch(function (error) {
		  console.log("Something went wrong!");
		});
	}
}


function resetErase() {
  // stop();
 if (el && document.querySelector('.compareBox').style.display == 'block' && secondPage){
  el = document.getElementById("text3").value;
  var a = gridSize
  var b = canvasType
  bucketUsed = el;
  totalBuckets = 50;
  document.getElementById("bucketValueDetailed").innerHTML = el + " buckets left out of 50";
  var data = document.getElementById("grid_0_0").className;
  var value = data.replace("boxTransparent", "").replace("default", "").trim();
  count=0;
  drawGrid(value);
  totalBuckets = el;
  bucketUsed = 0;
  grid2(null,a,b);
 }
 else if(el == 0 && secondPage == false){
  var a = gridSize
  var b = canvasType
  bucketUsed = 0;
  totalBuckets = 50;
  document.getElementById("bucketValueDetailed").innerHTML =  "50 buckets left out of 50";
  var data = document.getElementById("grid_0_0").className;
  var value = data.replace("boxTransparent", "").replace("default", "").trim();
  bucketUsed = 0;
  totalBuckets = 50;
  drawGrid(value);
   grid2(null,a,b); 
 }
 else if(el == 0){
  
}
 else{
  secondPage=true;
  var a = gridSize
  var b = canvasType
  bucketUsed = 0;
  totalBuckets = 50;
  document.getElementById("bucketValueDetailed").innerHTML =  "50 buckets left out of 50";
  var data = document.getElementById("grid_0_0").className;
  var value = data.replace("boxTransparent", "").replace("default", "").trim();
  bucketUsed = 0;
  totalBuckets = 50;
  drawGrid(value);
   grid2(null,a,b); 
 }
  

}
function resetBack(){
  // grid2(null,"small",b);
  closeCal();
  document.getElementById("compareF").style.visibility = "hidden";
  document.getElementById("compareJ").style.visibility = "hidden";
  document.getElementById("compareM").style.visibility = "hidden";
 
  document
    .getElementById("checkAnswer")
    .setAttribute("onclick", "check_answer()");
     bucketUsed = 0;
    totalBuckets = 50;
  document.getElementById("bucketValueDetailed").innerHTML =  "50 buckets left out of 50";
  document.getElementById("newLeft").innerHTML = `   <div class="leftPara1">
  <span id="heading">
    What happens to the amount of paint needed as the painting&#39;s
    dimensions increase proportionately? Start small to find out. </span
  ><br />
  <div class="leftLowerPara">
  <span id="para1">
    1. Use the paintbrush to color in the grid and reveal the painting. </span
  ><br />
  <div class="checkBox" id="new_div" style="display: none">
    <img id="check" src="./Images/Check_B.png" class="" style="position: relative;
    top: 10px;"
     />
    <div>
      <input
        value=""
        maxlength="5"
        id="textbox"
        type="text"
      />
    </div>
    <div>
      <input
        value=""
        maxlength="5"
        id="textbox1"
        type="text"
      />
    </div>
  </div>

  <div
    id="border1"
    style="border-top: dotted; left: 0px; width: 100%; margin-top: 10px "
  >
    <span id="para2" style="    position: relative; top: 10px;">
      2. Use the ruler to measure the mural's dimensions (height x
      width). (Hint: Is this a square grid?)
    </span>
    <br />
  </div>
  <div class="checkBox">
    <img id="check1" src="./Images/Check_B.png" class="" style="    position: relative; top: 15px;" />
    <span
      id="high"
      >H:</span
    >
    <div>
      <input
        value
        class = "boxNew"
        maxlength="5"
        id="text1"
        type="text"
      /><span id="high-dim">m x</span>
    </div>
    <div>
      <span id="wide">W:</span>
      <input
        value
        class = "boxNew1"
        maxlength="5"
        id="text2"
        type="text"
      /><span id="wide-dim">m</span>
    </div>
  </div>

  <div
    style="border-top: dotted;
    left: 0px;
    width: 100%;
    margin-top: 62px;
    margin-bottom: 15px;"
  >
    <span id="para3" style="position: relative; top: 10px;"> 3. What is the area of the painting? </span>
    <br/>
  </div>
  <div class="checkBox">
    <img id="check2" src="./Images/Check_B.png" class="" />
    <div>
      <input
        value
        maxlength="5"
        id="text3"
        type="text"
      /><span id="paint-dim">m<sup>2</sup></span>
    </div>
  </div>

  <div
    style="border-top: dotted;
    left: 0px;
    width: 100%;
    margin-top: 60px;
    
"
  >
    <span id="para4" style="position: relative; top: 10px;
">
      4. Look at the Paint-o-Meter. How much paint did you use?
    </span>
    <br />
  </div>
  <img id="get_paint" onclick="getPaint()" src="./Images/Gpaint_btn.png" tabindex="5" />
  <div class="checkBox">
    <img id="check3" src="./Images/Check_B.png" class="" />
    <div>
      <input
        value
        maxlength="5"
        id="text4"
        type="text"
      /><span id="bucket-dim">buckets</span>
    </div>
  </div>
</div>
</div>`
}

function toggleVisibility() {
  if(canvasType == "fiddle"){
    var el = document.getElementById("compareF");
  }
  else if(canvasType == "jazz"){
    var el = document.getElementById("compareJ");
  }
  else if(canvasType == "market"){
    var el = document.getElementById("compareM");
  }
  else if(canvasType == "you"){
    var el = document.getElementById("compareJ");
  }

   
  if (el.style.visibility=="visible") { 
         el.style.visibility="hidden";
    }
    else {
         el.style.visibility="visible";
    }
}

function showBox(){
  var el = document.querySelector(".compareBox");
     el.style.display = "block";
     secondPage=true;
}
function hideBox(){
  var el = document.querySelector(".compareBox");
  el.style.display = "none";
  secondPage=false;
}


function startDrag(e) {
  // alert("start")
  // setDragCursor(true);
  let element =  e.target;
  element.classList.add('hide1');
  e.dataTransfer.dropEffect = 'none'
  e.dataTransfer.effectAllowed = 'none'
}

function endDrag(e) {
  // alert("end")
  // setDragCursor(false);
  let element =  e.target;
  element.classList.remove('hide1');
  e.dataTransfer.dropEffect = 'default'
e.dataTransfer.effectAllowed = 'default'
}

function grid1(value) {

  container = document.getElementById("gridContainor");
  container.innerHTML = "";
  totalBuckets = 50;
  bucketUsed = 0;
  wid = 0;
  $('#bob').css('width', "350");

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      gridBox = document.createElement("div");
      gridBox.setAttribute("id", "grid_" + i + "_" + j);
      gridBox.classList.add("boxTransparent");
      if (value === null || firstTime) {
        gridBox.classList.add("default");
      } else {
        gridBox.classList.add(value);
      }
      if(canvasType == "you"){
        gridBox.style.backgroundImage = "url(./Images/"+ gridSize[0] + i + j +".jpg)"
        document.getElementById("videoBooth").setAttribute('class', gridSize);
      }
      gridBox.addEventListener(
        "dragover",
        function (e) {
          
          e.preventDefault();
          e.stopPropagation();
          var element = e.target;
          var xPos = j * -1 * gridOptions[canvasType].width + "px";
          var yPos = i * -1 * gridOptions[canvasType].height + "px";
          var zoomFactor = zoomSize[gridSize];
          if(canvasType != "you"){
            var style =
            "background-image: url(./Images/" +
            canvasType +
            ".png); background-size: " +
            zoomFactor +
            ";" +
            "background-position: " +
            xPos +
            " " +
            yPos;
          element.setAttribute("style", style);
          if(!element.getAttribute("painted")){
           
            element.setAttribute("painted",true);
            bucketUsed += gridOptions[canvasType].bucketRequired;
            bucketUsed = parseFloat(bucketUsed.toFixed(1));
            totalBuckets -= gridOptions[canvasType].bucketRequired;
            totalBuckets = parseFloat(totalBuckets.toFixed(1));
            wid = gridOptions[canvasType].bucketRequired * 7;
            console.log(wid);
            var hey = document.getElementById("bob");
            barWidth = hey.offsetWidth;
            finalWidth = barWidth - wid;
            console.log(finalWidth);
            $('#bob').css('width', finalWidth);
            console.log("used",bucketUsed , "total -->", totalBuckets);

          }
        }
          else if (canvasType == "you"){

            var style =
            "background-image: none";
          element.setAttribute("style", style);
          if(!element.getAttribute("painted")){
            element.setAttribute("painted",true);
            bucketUsed += gridOptions[canvasType].bucketRequired;
            bucketUsed = parseFloat(bucketUsed.toFixed(1));
            totalBuckets -= gridOptions[canvasType].bucketRequired;
            totalBuckets = parseFloat(totalBuckets.toFixed(1));
            wid = gridOptions[canvasType].bucketRequired * 7;
            console.log(wid);
            var hey = document.getElementById("bob");
            barWidth = hey.offsetWidth;
            finalWidth = barWidth - wid;
            console.log(finalWidth);
            $('#bob').css('width', finalWidth);
            console.log("used",bucketUsed , "total -->", totalBuckets);
          }
          }
          
         
          
          // document.getElementsByClassName("brush").style.opacity = 1;
        },
        false
      );
      container.appendChild(gridBox);
    }

    if (i + 1 < rows) {
      var breakLine = document.createElement("br");
      container.appendChild(breakLine);
    }
  }
  gridDrawn = true;
}

function grid2(value,gridS,canType) {
  container = document.getElementById("gridContainor1");
  container.innerHTML = "";
  canvasType = canType;
  gridSize = gridS;
  // grid2(null,a,b);
  console.log('el=========' ,el)
  var zz = el * 7;
  // console.log(zz);

  if(el>0){
    if(el>50){
      zz=0;
      $('#paintColor').css('width', zz);
    }
    else{
      $('#paintColor').css('width', zz);
    }
    
  }
  else{
    $('#paintColor').css('width', "350");
  }
  
  // 
  if(gridS == "small"){
    rows = 2;
  col = 2;
  }
  else if(gridS == "medium"){
    rows = 4;
  col = 4;
  }
  else if(gridS == "large"){
    rows = 6;
  col = 6;
  }
  


  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      gridBox = document.createElement("div");
      gridBox.setAttribute("id", "grid_" + i + "_" + j);
      gridBox.classList.add("boxTransparent");
      gridBox.classList.add(canType);

if(totalBuckets !== 0 ){
  gridBox.addEventListener(
        "dragover",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          if(canvasType != "you"){
            var element = e.target;
            var xPos = j * -1 * gridOptions[canvasType].width + "px";
            var yPos = i * -1 * gridOptions[canvasType].height + "px";
            var zoomFactor = zoomSize[gridSize];
            var style =
              "background-image: url(./Images/" +
              canvasType +
              ".png); background-size: " +
              zoomFactor +
              ";" +
              "background-position: " +
              xPos +
              " " +
              yPos;
            element.setAttribute("style", style);
            if(!element.getAttribute("painted")){
              count ++;
              console.log("count--->",count);
              element.setAttribute("painted",true);
              bucketUsed += gridOptions[canvasType].bucketRequired;
              bucketUsed = parseFloat(bucketUsed.toFixed(1));
              totalBuckets -= gridOptions[canvasType].bucketRequired;
              totalBuckets = parseFloat(totalBuckets.toFixed(1));
              document.getElementById("bucketValueDetailed").innerHTML =  totalBuckets + " buckets left out of 50";
              wid = gridOptions[canvasType].bucketRequired * 7;
              var hey = document.getElementById("paintColor");
              barWidth = hey.offsetWidth;
              finalWidth = barWidth - wid;
              console.log("finall",finalWidth);
              $('#paintColor').css('width', finalWidth);
              if(gridSize == "medium"){
                if(flag5 == true && flag7 == true && flag8 == true && count == 16 ){
                  document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
                  document
                    .getElementById("checkAnswer")
                    .setAttribute("onclick", "next_page2()");
                }
              }
               if(gridSize == "large"){
                if (flag9 == true && flag11 == true && flag12 == true && count == 36) {
                  showdrop = true;
                  document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
                  document
                    .getElementById("checkAnswer")
                    .setAttribute("onclick", "changePage(2)");
                }
              }
              console.log("used",bucketUsed , "total -->", totalBuckets);
            }
          }
          else if(canvasType == "you"){
            var element = e.target;
            var xPos = j * -1 * gridOptions[canvasType].width + "px";
            var yPos = i * -1 * gridOptions[canvasType].height + "px";
            var zoomFactor = zoomSize[gridSize];
            var style = "background-image: none";
            element.setAttribute("style", style);
            if(!element.getAttribute("painted")){
              element.setAttribute("painted",true);
              bucketUsed += gridOptions[canvasType].bucketRequired;
              bucketUsed = parseFloat(bucketUsed.toFixed(1));
              totalBuckets -= gridOptions[canvasType].bucketRequired;
              totalBuckets = parseFloat(totalBuckets.toFixed(1));
              document.getElementById("bucketValueDetailed").innerHTML =  totalBuckets + " buckets left out of 50";
              wid = gridOptions[canvasType].bucketRequired * 7;
              console.log(wid);
              var hey = document.getElementById("paintColor");
              barWidth = hey.offsetWidth;
              finalWidth = barWidth - wid;
              console.log("finalll",finalWidth);
              $('#paintColor').css('width', finalWidth);
              if(gridSize == "medium"){
                if(flag5 == true && flag7 == true && flag8 == true && count == 16 ){
                  document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
                  document
                    .getElementById("checkAnswer")
                    .setAttribute("onclick", "next_page2()");
                }
              }
               else if(gridSize == "large"){
                if (flag9 == true && flag11 == true && flag12 == true && totalBuckets == 0 && count == 36) {
                  showdrop = true;
                  document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
                  document
                    .getElementById("checkAnswer")
                    .setAttribute("onclick", "changePage(2)");
                }
              }
              console.log("used",bucketUsed , "total -->", totalBuckets);
            }
          }
        },
        false
      );
}
      container.appendChild(gridBox);
    }

    if (i + 1 < rows) {
      var breakLine = document.createElement("br");
      container.appendChild(breakLine);
    }
  }
  gridDrawn = true;
}


function clickIns() {
  document.getElementById('overlay_abs').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
  document.querySelector('#page-1').style.backgroundColor = ' rgba(0,0,0,0.7)';
}

function overlayClose() {
  document.getElementById("overlay_abs").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.querySelector('#page-1').style.backgroundColor = 'transparent';
}

function clickIns1() {
  document.getElementById('overlay_abs1').style.display = 'block';
  document.getElementById('overlay1').style.display = 'block';
  document.querySelector('#page-2').style.backgroundColor = ' rgba(0,0,0,0.7)';
}

function overlayClose1() {
  document.getElementById('overlay_abs1').style.display = 'none';
  document.getElementById("overlay1").style.display = "none";
  document.querySelector('#page-2').style.backgroundColor = 'transparent';
}

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
// console.log(x)
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      var y, i, k, s, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      hex = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          hex.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");

          yl = y.length;

          changeGrid();
          // if(p2 == true){
          //   changePage(2);
          // }
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }

      hex.click();
      firstTime = false;
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    // this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

function changeGrid() {
  if (hex.innerHTML === "Small") {
    rows = 2;
    col = 2;
    gridSize = "small";
    drawGrid(null);
    resetBack();
  } else if (hex.innerHTML === "Medium") {
    rows = 4;
    col = 4;
    gridSize = "medium";
    drawGrid(null);
    resetBack();
  } else if (hex.innerHTML === "Large") {
    rows = 6;
    col = 6;
    gridSize = "large";
    drawGrid(null);
    resetBack();
  } else if (hex.innerHTML === "Jazz") {
    canvasType = "jazz";
    drawGrid(null);
    stop();
    resetBack();
    // gridBackground.style.backgroundImage = "url(./Images/jazz.png)";
  } else if (hex.innerHTML === "Market") {
    canvasType = "market";
    drawGrid(null);
    stop();
    resetBack();
    // gridBackground.style.backgroundImage = "url(./Images/market.png)";
  } else if (hex.innerHTML === "Fiddle") {
    canvasType = "fiddle";
    drawGrid(null);
    stop();
    resetBack();
    // gridBackground.style.backgroundImage = "url(./Images/fiddle.png)";
  } else if (hex.innerHTML === "You") {
    canvasType = "you";
    drawGrid(null);
    start();
    resetBack();
    
    // gridBackground.style.backgroundImage = "none";
  }

  $(".boxTransparent").removeClass("jazz");
  $(".boxTransparent").removeClass("fiddle");
  $(".boxTransparent").removeClass("market");
  $(".boxTransparent").removeClass("you");
  $(".boxTransparent").addClass(canvasType);
}

//calculator
dragElement(document.querySelector(".dragable-cal"),'drag');
document.getElementById("result-display").value = "0";
function dragElement(elmnt,id) {
    pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(id).onmousedown = dragMouseDown;
    document.getElementById(id).ontouchstart = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;
  }
}

function dragMouseDown(e) {
  e = e || window.event;
  if(!e.touches){
    e.preventDefault();
  }
  // get the mouse cursor position at startup:
  pos3 = e.clientX || e.touches[0].clientX;
  pos4 = e.clientY || e.touches[0].clientY;

  document.onmouseup = closeDragElement;
  document.ontouchend = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;
  document.ontouchmove = elementDrag;
}


function elementDrag(e) {
  var clientX = e.clientX || e.touches[0].clientX;
  var clientY = e.clientY || e.touches[0].clientY;
  e = e || window.event;
  var elmnt = document.querySelector(".dragable-cal")
  if(!e.touches){
    e.preventDefault();
  }
  
  // calculate the new cursor position:
  pos1 = pos3 - clientX;
  pos2 = pos4 - clientY;
  pos3 = clientX;
  pos4 = clientY;
  // set the element's new position:
  elmnt.style.top = elmnt.offsetTop - pos2 + "px";
  elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
}


function closeDragElement() {
  /* stop moving when mouse button is released:*/
  $('#wrapper').css('cursor', 'default');
  console.log('close Drag element')
  document.onmouseup = null;
  document.onmousemove = null;
}


function calculatorValue(e) {
  var arithmatic = e.target.innerHTML;
  if (arithmatic == "x") {
    arithmatic = "*";
  }
  if (
    arr1.length < 14 &&
    arithmatic !== "M" &&
    arithmatic !== "MC" &&
    arithmatic !== "C" &&
    arithmatic !== "+" &&
    arithmatic !== "-" &&
    arithmatic !== "*" &&
    arithmatic !== "/" &&
    arithmatic !== "%" &&
    arr2.length < 1 &&
    arithmatic !== "=" &&
    arithmatic !== "√"
  ) {
    arr1.push(arithmatic);
    document.getElementById("result-display").value = arr1.join("");
  } else if (
    arr2.length < 2 &&
    (arithmatic == "M" ||
      arithmatic == "MC" ||
      arithmatic == "C" ||
      arithmatic == "+" ||
      arithmatic == "-" ||
      arithmatic == "*" ||
      arithmatic == "/" ||
      arithmatic == "%")
  ) {
    arr2.splice(0, 1, arithmatic);
     document.getElementById("result-display").value = "";
  } else if (
    arr2.length > 0 &&
    arr1.length < 14 &&
    arithmatic !== "M" &&
    arithmatic !== "MC" &&
    arithmatic !== "C" &&
    arithmatic !== "+" &&
    arithmatic !== "-" &&
    arithmatic !== "*" &&
    arithmatic !== "/" &&
    arithmatic !== "%" &&
    arithmatic !== "="
  ) {
    arr3.push(arithmatic);
    document.getElementById("result-display").value = arr3.join("");
  }
  if (arithmatic == "=") {
    input1 = arr1.join("");
    input2 = arr3.join("");
    if (input1.length > 0 && input2.length > 0) {
      output = eval("(" + input1 + ")" + arr2[0] + "(" + input2 + ")");
    } else {
      output = "0";
    }
    document.getElementById("result-display").value =
      Math.round((output + Number.EPSILON) * 100000) / 100000;
    arr1 = [];
    arr2 = [];
    arr3 = [];
  }
  if (arithmatic == "C") {
    arr1 = [];
    arr2 = [];
    arr3 = [];
    document.getElementById("result-display").value = "0";
  }
  if (arithmatic == "√") {
    input1 = arr1.join("");
    output = Math.sqrt(input1);
    document.getElementById("result-display").value = output;
    arr1 = [];
  }
  // if (arithmatic == "M") {
  //   document.getElementById("result-display").value = arr1.join("");
  //   document.getElementById("mtext").value = "M";
  // }
  // else{
    
  //   document.getElementById("mtext").value = "";
  // }
  // if (arithmatic == "MC") {
 
  //   document.getElementById("mtext").value = "";
  // }
}

function closeCal() {
  document.querySelector(".dragable-cal").style.display = "none";
}

function openCal() {
  document.querySelector(".dragable-cal").style.display = "block";
}

function addAccessibility() {
  $(document).on("mousedown", () => {
    thisRef.mouseFlag = true;
  });

  $(document).on("mouseup", () => {
    thisRef.mouseFlag = false;
  });

  $("[tabindex]").focus((e) => {
    thisRef.focusElement = e.target;
    if (thisRef.mouseFlag == true) {
      $(thisRef.focusElement).css({
        outline: "none",
      });
      return;
    }
    $(thisRef.focusElement).css({
      "outline-color": "yellow",
      "outline-style": "solid",
      "outline-width": "4px",
    });
    $(thisRef.focusElement).keypress(function (event) {
      if (event.key === "Enter" || event.keyCode === 13) {
        $(thisRef.focusElement).trigger("click");
        handleSpecialCases(event);
      }
    });
  });
  $("[tabindex]").focusout((e) => {
    $(e.target).off("keypress");
    $(thisRef.focusElement).css({
      outline: "none",
    });
  });
}

function handleSpecialCases(event) {
  if (event.target.innerText === "Open Instructions") {
    onSpecialCase(event.target, event.target.nextElementSibling);
  } else if (event.target.innerText === "Close Instructions") {
    onSpecialCase(event.target, event.target.previousElementSibling);
  }
}

//handling special cases of accessibility
function onSpecialCase(target, sibling) {
  setTimeout(() => {
    $(sibling).trigger("focus");
  }, 500);
  if (target == null) return;
  $(target).attr("tabindex", "-1");
  $(target).css({
    outline: "none",
  });
  $(sibling).attr("tabindex", "0");
  if (!thisRef.mouseFlag)
    $(sibling).css({
      "outline-color": "yellow",
      "outline-style": "solid",
      "outline-width": "4px",
    });
}

function getPaint(){
  el = document.getElementById("text3").value;
  if(el){
    var a = gridSize
    var b = canvasType
    document.getElementById("hint").innerHTML = "Watch here for hints and instructions.";  
    document.getElementById("bucketValueDetailed").innerHTML = el + " buckets left out of 50";
    totalBuckets = el;
    bucketUsed = 0;
    grid2(null,a,b);  
  }
  else{
    console.log('nothiin going to be paint')
  }

}


//small
function check_answer() {
  console.log(canvasType);
  if(canvasType == "fiddle"){
    if (document.getElementById("text1").value != "" && document.getElementById("text2").value != "") {
      if (
        document.getElementById("text1").value >= "1.52" &&
        document.getElementById("text1").value <= "1.84" && document.getElementById("text2").value >= "1.85" &&
        document.getElementById("text2").value <= "2.05"
      ) {
        var flag1 = true;
        document.getElementById("text1").value = "1.68";
        document.getElementById("text2").value = "2";
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "3.1" &&
        document.getElementById("text3").value <= "3.6"
      ) {
        var flag3 = true;
        document.getElementById("text3").value = "3.36";
  
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text4").value != "") {
      if (document.getElementById("text4").value == "4" && gridOptions[canvasType][gridSize].gridCount == bucketUsed) {
        var flag4 = true;
        document.getElementById("check3").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check3").src = "./Images/Check_W.png";
      }
    }
  
    if (flag1 == true && flag3 == true && flag4 == true ) {
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "next_page1()");
    }
  } 
  else if(canvasType == "market"){
    if (document.getElementById("text1").value != "" && document.getElementById("text2").value != "") {
      if (
        document.getElementById("text1").value >= "1.82" &&
        document.getElementById("text1").value <= "2.1" &&  document.getElementById("text2").value >= "1.9" &&
        document.getElementById("text2").value <= "2.3"
      ) {
        var flag1 = true;
        document.getElementById("text1").value = "1.97";
        document.getElementById("text2").value = "2.15";
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "3.9" &&
        document.getElementById("text3").value <= "4.5"
      ) {
        var flag3 = true;
        document.getElementById("text3").value = "4.23";
  
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text4").value != "") {
      if (document.getElementById("text4").value == "5.2" && gridOptions[canvasType][gridSize].gridCount == parseFloat(bucketUsed.toFixed(1))) {
        var flag4 = true;
        document.getElementById("check3").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check3").src = "./Images/Check_W.png";
      }
    }
  
    if (flag1 == true && flag3 == true && flag4 == true ) {
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "next_page1()");
    }
  }
  else if(canvasType == "jazz"){
    if (document.getElementById("text1").value != "" && document.getElementById("text2").value != "") {
      if (
        document.getElementById("text1").value >= "1.52" &&
        document.getElementById("text1").value <= "1.65" && document.getElementById("text2").value >= "1.7" &&
        document.getElementById("text2").value <= "1.85"
      ) {
        var flag1 = true;
        document.getElementById("text1").value = "1.62";
        document.getElementById("text2").value = "1.8";
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "2.7" &&
        document.getElementById("text3").value <= "3.1"
      ) {
        var flag3 = true;
        document.getElementById("text3").value = "2.92";
  
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text4").value != "") {
      if (document.getElementById("text4").value == "3.6" && gridOptions[canvasType][gridSize].gridCount == parseFloat(bucketUsed.toFixed(1))) {
        var flag4 = true;
        document.getElementById("check3").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check3").src = "./Images/Check_W.png";
      }
    }
  
    if (flag1 == true && flag3 == true && flag4 == true) {
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "next_page1()");
    }
  }
  else if(canvasType == "you"){
    if (document.getElementById("text1").value != "" && document.getElementById("text2").value != "") {
      if (
        document.getElementById("text1").value >= "1.4" &&
        document.getElementById("text1").value <= "1.6" && document.getElementById("text2").value >= "1.4" &&
        document.getElementById("text2").value <= "1.6"
      ) {
        var flag1 = true;
        document.getElementById("text1").value = "1.5";
        document.getElementById("text2").value = "1.5";
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "2.1" &&
        document.getElementById("text3").value <= "2.35"
      ) {
        var flag3 = true;
        document.getElementById("text3").value = "2.25";
  
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text4").value != "") {
      if (document.getElementById("text4").value == "2.8" && gridOptions[canvasType][gridSize].gridCount == parseFloat(bucketUsed.toFixed(1))) {
        var flag4 = true;
        document.getElementById("check3").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check3").src = "./Images/Check_W.png";
      }
    }
  
    if (flag1 == true && flag3 == true && flag4 == true) {
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "next_page1()");
    }
  }
}

function next_page1() {
  count = 0;
  el = 0;
  bucketUsed = 0;
  totalBuckets = el;
  showBox()
   
  if(canvasType == "fiddle"){
    grid2(null,"medium",canvasType);
  }
  else if(canvasType == "market"){
    grid2(null,"medium",canvasType);
  }
  else if(canvasType == "jazz"){
    grid2(null,"medium",canvasType);
  }
  else if(canvasType == "you"){
    grid2(null,"medium",canvasType);
  }
  // grid2(null,"medium","fiddle");
  $('.draggable1').css({ top: "625px" });
  $('#paintColor').css('width', "0");
  $(".boxNew").css({ width: "85px" , left: "45px" });
  $(".leftLowerPara").css({ top: "25px" , width: "279px" });
  $("#bucket-dim").css({ top: "-145px" });
  $("#paint-dim").css({ top: "-125px" });
  $("#paint-dim").css({ left: "120px" });
  $("#high").css({ top: "-60px" });
  $("#high-dim").css({ top: "-60px" });
  $("#wide").css({ top: "-60px", left: "195px" });
  $("#wide-dim").css({ top: "-60px" });
  document.getElementById("heading").innerHTML =
    "Time to paint a larger version!";
  document.getElementById("para1").innerHTML =
    "1. What are the dimensions of the new grid (height x width)?";
  document.getElementById("para2").innerHTML =
    "2. What is the area of the grid?";
  document.getElementById("para3").innerHTML =
    "3. It took 4 buckets to paint the 2x2 grid. How many buckets are needed for this grid?";
  document.getElementById("para4").innerHTML =
    "4. Use Get Paint to fill the Paint-o-Meter and then paint the grid. Click Check Answers to see if you're ready to move on to the next page.";
  document.getElementById("text1").value = "";
  document.getElementById("text2").style.display = "none";
  document.getElementById("text3").value = "";
  document.getElementById("text4").style.display = "none";
  document.getElementById("check1").src = "./Images/Check_B.png";
  document.getElementById("check2").src = "./Images/Check_B.png";
  document.getElementById("check3").style.display = "none";
  document.getElementById("new_div").style.display = "block";
  document.getElementById("border1").style.marginTop = "50px";
  document.getElementById("get_paint").style.display = "block";
  document.getElementById("checkAnswer").src = "./Images/Check_Btn.png";
  document.getElementById("dropp2").classList.add("hidden");
  document.getElementById("bucketValueDetailed").innerHTML =  totalBuckets + " buckets left out of 50";
  document
    .getElementById("checkAnswer")
    .setAttribute("onclick", "check_answer1()");
    if(canvasType == "fiddle"){
      var el = document.getElementById("compareF");
    }
    else if(canvasType == "jazz"){
      var el = document.getElementById("compareJ");
    }
    else if(canvasType == "market"){
      var el = document.getElementById("compareM");
    }
    el.style.visibility="hidden";  
    document.getElementById("checkCompare").checked = false;
  }

//medium
function check_answer1() {
  if(canvasType == "fiddle"){
    if (document.getElementById("textbox").value != "" && document.getElementById("textbox1").value != "") {
      if (
        document.getElementById("textbox").value >= "3.03" &&
        document.getElementById("textbox").value <= "3.69" && document.getElementById("textbox1").value >= "3.6" &&
        document.getElementById("textbox1").value <= "4.3"
      ) {
       flag5 = true;
        document.getElementById("textbox").value = "3.36";
        document.getElementById("textbox1").value = "4";
        document.getElementById("check").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text1").value != "") {
      if (
        document.getElementById("text1").value >= "12.1" &&
        document.getElementById("text1").value <= "14.7"
      ) {
        flag7 = true;
        document.getElementById("text1").value = "13.44";
  
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "15" &&
        document.getElementById("text3").value <= "17" 
      ) {
        flag8 = true;
        document.getElementById("text3").value = "16";
        document.getElementById("hint").innerHTML = "That's the right amount of paint!";
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
        document.getElementById("hint").innerHTML = "Oops, not enough paint!";
      }
    }
    // if(gridOptions[canvasType][gridSize].gridCount == count){
    //   var f = true;
    // }
    if (flag5 == true && flag7 == true && flag8 == true && totalBuckets == 0 && count == 16) {
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "next_page2()");
    }
  }
  else if(canvasType == "market"){
    if (document.getElementById("textbox").value != "" && document.getElementById("textbox1").value != "") {
      if (
        document.getElementById("textbox").value >= "3" &&
        document.getElementById("textbox").value <= "4.69" && document.getElementById("textbox1").value >= "3.6" &&
        document.getElementById("textbox1").value <= "4.9"
      ) {
        flag5 = true;
        document.getElementById("textbox").value = "3.94";
        document.getElementById("textbox1").value = "4.3";
        document.getElementById("check").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text1").value != "") {
      if (
        document.getElementById("text1").value >= "15.8" &&
        document.getElementById("text1").value <= "17.5"
      ) {
        flag7 = true;
        document.getElementById("text1").value = "16.94";
  
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "20" &&
        document.getElementById("text3").value <= "21" 
      ) {
        flag8 = true;
        document.getElementById("text3").value = "20.8";
        document.getElementById("hint").innerHTML = "That's the right amount of paint!";
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
        document.getElementById("hint").innerHTML = "Oops, not enough paint!";
      }
    }
  
    if (flag5 == true && flag7 == true && flag8 == true && totalBuckets == 0 && count == 16) {
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "next_page2()");
    }
  }
  else if(canvasType == "jazz"){
    if (document.getElementById("textbox").value != "" && document.getElementById("textbox1").value != "") {
      if (
        document.getElementById("textbox").value >= "3" &&
        document.getElementById("textbox").value <= "4" &&  document.getElementById("textbox1").value >= "3" &&
        document.getElementById("textbox1").value <= "4"
      ) {
        flag5 = true;
        document.getElementById("textbox").value = "3.24";
        document.getElementById("textbox1").value = "3.6";
        document.getElementById("check").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text1").value != "") {
      if (
        document.getElementById("text1").value >= "10.5" &&
        document.getElementById("text1").value <= "12.1"
      ) {
        flag7 = true;
        document.getElementById("text1").value = "11.66";
  
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "14.4" &&
        document.getElementById("text3").value <= "14.4" 
      ) {
        flag8 = true;
        document.getElementById("text3").value = "14.4";
        document.getElementById("hint").innerHTML = "That's the right amount of paint!";
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
        document.getElementById("hint").innerHTML = "Oops, not enough paint!";
      }
    }
  
    if (flag5 == true && flag7 == true && flag8 == true && totalBuckets == 0 && count == 16) {
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "next_page2()");
    }
  }
  else if(canvasType == "you"){
    if (document.getElementById("textbox").value != "" && document.getElementById("textbox1").value != "") {
      if (
        document.getElementById("textbox").value >= "2.8" &&
        document.getElementById("textbox").value <= "3.1" && document.getElementById("textbox1").value >= "2.8" &&
        document.getElementById("textbox1").value <= "3.1"
      ) {
        flag5 = true;
        document.getElementById("textbox").value = "3";
        document.getElementById("textbox1").value = "3";
        document.getElementById("check").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text1").value != "") {
      if (
        document.getElementById("text1").value >= "8.8" &&
        document.getElementById("text1").value <= "9.2"
      ) {
        flag7 = true;
        document.getElementById("text1").value = "9";
  
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "11.2" &&
        document.getElementById("text3").value <= "11.2" 
      ) {
        flag8 = true;
        document.getElementById("text3").value = "11.2";
        document.getElementById("hint").innerHTML = "That's the right amount of paint!";
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
        document.getElementById("hint").innerHTML = "Oops, not enough paint!";
      }
    }
  
    if (flag5 == true && flag7 == true && flag8 == true && totalBuckets == 0 && count == 16) {
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "next_page2()");
    }
  }
  
}


function next_page2() {
  count = 0;
  el = 0;
  bucketUsed = 0;
  totalBuckets = el;
  document.getElementById("hint").innerHTML = "Watch here for hints and instructions.";
  document.getElementById("bucketValueDetailed").innerHTML =  totalBuckets + " buckets left out of 50";
  grid2(null,"large","fiddle");
  $('#paintColor').css('width', "0");
  document.getElementById("heading").innerHTML =
    "Time to paint a larger version!";
  document.getElementById("para1").innerHTML =
    "1. What are the dimensions of the new grid (height x width)?";
  document.getElementById("para2").innerHTML =
    "2. What is the area of the grid?";
  document.getElementById("para3").innerHTML =
    "3. It took 4 buckets to paint the 2x2 grid. How many buckets are needed for this grid?";
  document.getElementById("para4").innerHTML =
    "4. Use Get Paint to fill the Paint-o-Meter and then paint the grid. Click Check Answers to see if you're ready to move on to the next page.";
  document.getElementById("textbox").value = "";
  document.getElementById("textbox1").value = "";
  document.getElementById("text1").value = "";
  document.getElementById("text2").style.display = "none";
  document.getElementById("text3").value = "";
  document.getElementById("text4").style.display = "none";
  document.getElementById("check").src = "./Images/Check_B.png";
  document.getElementById("check1").src = "./Images/Check_B.png";
  document.getElementById("check2").src = "./Images/Check_B.png";
  document.getElementById("check3").style.display = "none";
  document.getElementById("new_div").style.display = "block";
  document.getElementById("border1").style.marginTop = "50px";
  document.getElementById("get_paint").style.display = "block";
  document.getElementById("checkAnswer").src = "./Images/Check_Btn.png";
  document
    .getElementById("checkAnswer")
    .setAttribute("onclick", "check_answer2()");
    if(canvasType == "fiddle"){
      var el = document.getElementById("compareF");
    }
    else if(canvasType == "jazz"){
      var el = document.getElementById("compareJ");
    }
    else if(canvasType == "market"){
      var el = document.getElementById("compareM");
    }
    el.style.visibility="hidden";  
    document.getElementById("checkCompare").checked = false;
}

//large
function check_answer2() {
  if(canvasType == "fiddle"){
    if (document.getElementById("textbox").value != "" && document.getElementById("textbox1").value != "") {
      if (
        document.getElementById("textbox").value >= "4.6" &&
        document.getElementById("textbox").value <= "5.5" && document.getElementById("textbox1").value >= "5.4" &&
        document.getElementById("textbox1").value <= "6.6"
      ) {
        flag9 = true;
        document.getElementById("textbox").value = "5.04";
        document.getElementById("textbox1").value = "6";
        document.getElementById("check").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check").src = "./Images/Check_W.png";
      }
    }
  
    // if (document.getElementById("textbox1").value != "") {
    //   if (
    //     document.getElementById("textbox1").value >= "5.4" &&
    //     document.getElementById("textbox1").value <= "6.6"
    //   ) {
    //     var flag10 = true;
    //     document.getElementById("textbox1").value = "6";
    //     document.getElementById("check").src = "./Images/Check_R.png";
    //   } else {
    //     document.getElementById("check").src = "./Images/Check_W.png";
    //   }
    // }
  
    if (document.getElementById("text1").value != "") {
      if (
        document.getElementById("text1").value >= "27.3" &&
        document.getElementById("text1").value <= "33.2"
      ) {
        flag11 = true;
        document.getElementById("text1").value = "30.24";
  
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "33" &&
        document.getElementById("text3").value <= "39" 
      ) {
        flag12 = true;
        document.getElementById("text3").value = "36";
        document.getElementById("hint").innerHTML = "That's the right amount of paint!";
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
        document.getElementById("hint").innerHTML = "Oops, not enough paint!";
      }
    }
  
    if (flag9 == true && flag11 == true && flag12 == true && totalBuckets == 0 && count == 36) {
      showdrop = true;
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "changePage(2)");
    }
  }
  else if(canvasType == "market"){
    if (document.getElementById("textbox").value != "" && document.getElementById("textbox1").value != "") {
      if (
        document.getElementById("textbox").value >= "5.6" &&
        document.getElementById("textbox").value <= "6.3" &&  document.getElementById("textbox1").value >= "5.5" &&
        document.getElementById("textbox1").value <= "6.9"
      ) {
        flag9 = true;
        document.getElementById("textbox").value = "5.91";
        document.getElementById("textbox1").value = "6.45";
        document.getElementById("check").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check").src = "./Images/Check_W.png";
      }
    }
  
    // if (document.getElementById("textbox1").value != "") {
    //   if (
    //     document.getElementById("textbox1").value >= "5.5" &&
    //     document.getElementById("textbox1").value <= "6.9"
    //   ) {
    //     var flag10 = true;
    //     document.getElementById("textbox1").value = "6.45";
    //     document.getElementById("check").src = "./Images/Check_R.png";
    //   } else {
    //     document.getElementById("check").src = "./Images/Check_W.png";
    //   }
    // }
  
    if (document.getElementById("text1").value != "") {
      if (
        document.getElementById("text1").value >= "37.1" &&
        document.getElementById("text1").value <= "39.2"
      ) {
        flag11 = true;
        document.getElementById("text1").value = "38.12";
  
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "46.8" &&
        document.getElementById("text3").value <= "46.8" 
      ) {
        flag12 = true;
        document.getElementById("text3").value = "46.8";
        document.getElementById("hint").innerHTML = "That's the right amount of paint!";
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
        document.getElementById("hint").innerHTML = "Oops, not enough paint!";
      }
    }
  
    if (flag9 == true && flag11 == true && flag12 == true && totalBuckets == 0 && count == 36) {
      showdrop = true;
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "changePage(2)");
    }
  }
  else if(canvasType == "jazz"){

    if (document.getElementById("textbox").value != "" && document.getElementById("textbox1").value != "") {
      if (
        document.getElementById("textbox").value >= "4" &&
        document.getElementById("textbox").value <= "5.3" && document.getElementById("textbox1").value >= "4.8" &&
        document.getElementById("textbox1").value <= "6"
      ) {
        flag9 = true;
        document.getElementById("textbox").value = "4.86";
        document.getElementById("textbox1").value = "5.4";
        document.getElementById("check").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check").src = "./Images/Check_W.png";
      }
    }
  
    // if (document.getElementById("textbox1").value != "") {
    //   if (
    //     document.getElementById("textbox1").value >= "4.8" &&
    //     document.getElementById("textbox1").value <= "6"
    //   ) {
    //     var flag10 = true;
    //     document.getElementById("textbox1").value = "5.4";
    //     document.getElementById("check").src = "./Images/Check_R.png";
    //   } else {
    //     document.getElementById("check").src = "./Images/Check_W.png";
    //   }
    // }
  
    if (document.getElementById("text1").value != "") {
      if (
        document.getElementById("text1").value >= "24" &&
        document.getElementById("text1").value <= "28"
      ) {
        flag11 = true;
        document.getElementById("text1").value = "26.24";
  
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "30" &&
        document.getElementById("text3").value <= "34" 
      ) {
        flag12 = true;
        document.getElementById("text3").value = "32.4";
        document.getElementById("hint").innerHTML = "That's the right amount of paint!";
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
        document.getElementById("hint").innerHTML = "Oops, not enough paint!";
      }
    }
  
    if (flag9 == true && flag11 == true && flag12 == true && totalBuckets == 0 && count == 36) {
      showdrop = true;
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "changePage(2)");
    }
  }
  else if(canvasType == "you"){
    if (document.getElementById("textbox").value != "" && document.getElementById("textbox1").value != "") {
      if (
        document.getElementById("textbox").value >= "4.4" &&
        document.getElementById("textbox").value <= "4.6" &&   document.getElementById("textbox1").value >= "4.4" &&
        document.getElementById("textbox1").value <= "4.6"
      ) {
        flag9 = true;
        document.getElementById("textbox").value = "4.5";
        document.getElementById("textbox1").value = "4.5";
        document.getElementById("check").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check").src = "./Images/Check_W.png";
      }
    }
  
    // if (document.getElementById("textbox1").value != "") {
    //   if (
    //     document.getElementById("textbox1").value >= "4.4" &&
    //     document.getElementById("textbox1").value <= "4.6"
    //   ) {
    //     var flag10 = true;
    //     document.getElementById("textbox1").value = "4.5";
    //     document.getElementById("check").src = "./Images/Check_R.png";
    //   } else {
    //     document.getElementById("check").src = "./Images/Check_W.png";
    //   }
    // }
  
    if (document.getElementById("text1").value != "") {
      if (
        document.getElementById("text1").value >= "19" &&
        document.getElementById("text1").value <= "22"
      ) {
        flag11 = true;
        document.getElementById("text1").value = "20.25";
  
        document.getElementById("check1").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check1").src = "./Images/Check_W.png";
      }
    }
  
    if (document.getElementById("text3").value != "") {
      if (
        document.getElementById("text3").value >= "23" &&
        document.getElementById("text3").value <= "27" 
      ) {
        flag12 = true;
        document.getElementById("text3").value = "25.2";
        document.getElementById("hint").innerHTML = "That's the right amount of paint!";
        document.getElementById("check2").src = "./Images/Check_R.png";
      } else {
        document.getElementById("check2").src = "./Images/Check_W.png";
        document.getElementById("hint").innerHTML = "Oops, not enough paint!";
      }
    }
  
    if (flag9 == true && flag11 == true && flag12 == true && totalBuckets == 0 && count == 36) {
      showdrop = true;
      document.getElementById("checkAnswer").src = "./Images/Next_btn.png";
      document
        .getElementById("checkAnswer")
        .setAttribute("onclick", "changePage(2)");
    }
  }
}



///////////////////////////////
// --------  drag  --------- //
///////////////////////////////


///////////////////////////////
// -------  rotate  -------- //
///////////////////////////////
var angle = 0;
(function() {
  var init, rotate, start, stop,
    active = false,
    // angle = 0,
    rotation = 0,
    startAngle = 0,
    center = {
      x: 0,
      y: 0
    },
    R2D = 180 / Math.PI,
    rot = document.getElementById('rotate');

  init = function() {
    rot.addEventListener("mousedown", start, false);
    rot.addEventListener("touchstart", start, false);
    $(document).bind('mousemove', function(event) {
      if (active === true) {
        event.preventDefault();
        rotate(event);
      }
    });
    $(document).bind('touchmove', function(event) {
      if (active === true) {
        event.preventDefault();
        rotate(event);
      }
    });
    $(document).bind('mouseup', function(event) {
      event.preventDefault();
      stop(event);
    });
    $(document).bind('touchmove', function(event) {
      event.preventDefault();
      stop(event);
    });
  };
  // var startedOnce = false;
  start = function(e) {
    e.preventDefault();
    roo = true;
    var clientX = e.clientX || e.touches[0].clientX;
    var clientY = e.clientY || e.touches[0].clientY;
    var bb = rulerElement.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x, y;
    center = {
      x: l,
      y: t + h
    };
    x = clientX - center.x;
    y = clientY - center.y;
    // if(!startedOnce){
      startAngle = R2D * Math.atan2(y, x);
    //   startedOnce = true;
    // }
    
    console.log('start angle after start ', startAngle);
    return active = true;
  };

  rotate = function(e) {
    var clientX = e.clientX || e.touches[0].clientX;
    var clientY = e.clientY || e.touches[0].clientY;
   if(!e.touches){
    e.preventDefault();
   }
    var x = clientX - center.x,
      y = clientY - center.y,
      d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
     rulerElement.style.transformOrigin = "center left";
    //  var addAngleValue = -1 * angle
     console.log(angle,rotation)
    return rulerElement.style.webkitTransform = "rotate(" + ((angle) + (rotation)) + "deg)";
    
  };

  stop = function() {
    roo = false;
    angle += rotation;
    console.log('value of angle after stop', angle);
    return active = false;
  };

  init();

}).call(this);


dragElement1(document.getElementById("compareF"));
dragElement1(document.getElementById("compareM"));
dragElement1(document.getElementById("compareJ"));

  dragElement1(document.getElementById("draggable"));



function dragElement1(ell) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(ell.id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(ell.id).onmousedown = dragMouseDown1;
    document.getElementById(ell.id).ontouchstart = dragMouseDown1;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    ell.onmousedown = dragMouseDown1;
    ell.ontouchstart = dragMouseDown1;
  }

  function dragMouseDown1(em) {
  if(roo == false){
    
    $('#wrapper').css('cursor', 'pointer');
    em = em || window.event;
    if(!em.touches){
      em.preventDefault();
    }
    // get the mouse cursor position at startup:
    pos3 = em.clientX || em.touches[0].clientX;
    pos4 = em.clientY || em.touches[0].clientX;
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag1;
    document.ontouchmove = elementDrag1;
  }
  }

  function elementDrag1(em) {
    
    em = em || window.event;
    var clientX = em.clientX || em.touches[0].clientX;
    var clientY = em.clientY || em.touches[0].clientY;
    if(!em.touches){
      em.preventDefault();
    }
    // calculate the new cursor position:
    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;
    // set the element's new position:
    ell.style.top = (ell.offsetTop - pos2) + "px";
    ell.style.left = (ell.offsetLeft - pos1) + "px";
  }
}
