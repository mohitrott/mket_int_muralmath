var scale = {
    x: 1,
    y: 1
},
    zoomFactor = 1,
    stageLeft = 0,
    config = {
        'stageWidth': 1024,
        'stageHeight': 768
    };

function scaleStage() {
    console.log("scaling....")
    var rootElem = document.getElementById("wrapper");
    scale.x = ((window.innerWidth) / config['stageWidth']);
    scale.y = ((window.innerHeight) / config['stageHeight']);
    // scale.x = 1;
    // scale.y = 1;
    let newScale = scale.x + ', ' + scale.y;
    if (scale.x < scale.y) {
        zoomFactor = scale.x;
        newScale = scale.x + ', ' + scale.x;
    } else {
        zoomFactor = scale.y;
        newScale = scale.y + ', ' + scale.y;
    }
    let newWidth = Number(newScale.split(',')[0]) * config['stageWidth'];
    let newHeight = Number(newScale.split(',')[1]) * config['stageHeight'];
    let leftPos = (window.innerWidth - newWidth) / 2;
    // let topPos = (window.innerHeight - newHeight) / 2;
    // let leftPos = 0;
    let topPos = 0;
    stageLeft = leftPos;
    window.rootLeftElmPos = stageLeft;
    var styleObj = {};
    styleObj = {
        '-webkit-transform': 'scale(' + newScale + ')',
        '-moz-transform': 'scale(' + newScale + ')',
        '-ms-transform': 'scale(' + newScale + ')',
        '-o-transform': 'scale(' + newScale + ')',
        'transform': 'scale(' + newScale + ')',
        '-webkit-transform-origin': 'left top',
        '-moz-transform-origin': 'left top',
        '-ms-transform-origin': 'left top',
        '-o-transform-origin': 'left top',
        'transform-origin': 'left top',
        'position': 'relative',
        'top': '0px',
        'left': leftPos + 'px',
        'overflow': 'hidden',
        'width': config['stageWidth'] + 'px',
        'height': config['stageHeight'] + 'px',
    };
    for (var key in styleObj) {
        if (styleObj.hasOwnProperty(key)) {
            rootElem.style[key] = styleObj[key]
        }
    }
    window.zoomFactor = zoomFactor
};
window.onload = scaleStage;
window.addEventListener("resize", scaleStage)