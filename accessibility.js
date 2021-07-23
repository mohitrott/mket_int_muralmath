var thisRef = {
    mouseFlag: false,
    focusElement: {}
  }

function addAccessibility() {
    $(document).on('mousedown', () => {
    thisRef.mouseFlag = true;
    });
    
    $(document).on('mouseup', () => {
    thisRef.mouseFlag = false;
    });
    
    $('[tabindex]').focus((e) => {
    thisRef.focusElement = e.target;
    if (thisRef.mouseFlag == true) {
    $(thisRef.focusElement).css({
    'outline': 'none'
    });
    return;
    }
    $(thisRef.focusElement).css({
    'outline-color': 'yellow',
    'outline-style': 'solid',
    'outline-width': '100px'
    });
    $(thisRef.focusElement).keypress(function (event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
    $(thisRef.focusElement).trigger("click");
    handleSpecialCases(event);
    }
    });
    });
    $('[tabindex]').focusout((e) => {
    $(e.target).off('keypress');
    $(thisRef.focusElement).css({
    'outline': 'none'
    });
    });
    };
    
    function handleSpecialCases(event) {
    if (event.target.innerText === 'Open Instructions') {
    onSpecialCase(event.target, event.target.nextElementSibling);
    } else if (event.target.innerText === 'Close Instructions') {
    onSpecialCase(event.target, event.target.previousElementSibling);
    }
    }
    
    //handling special cases of accessibility
    function onSpecialCase(target, sibling) {
    setTimeout(() => {
    $(sibling).trigger('focus');
    }, 500);
    if (target == null) return;
    $(target).attr('tabindex', '-1');
    $(target).css({
    'outline': 'none'
    });
    $(sibling).attr('tabindex', '0');
    if (!thisRef.mouseFlag) $(sibling).css({
    'outline-color': 'yellow',
    'outline-style': 'solid',
    'outline-width': '100px'
    });
    }
    
    $(document).ready(function () {
    addAccessibility();
    });