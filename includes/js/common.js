// Regex replace - now with added count! 
function lpReplace(pre, post, elm, value) {
    if (!elm) elm = "textbox"; // Here for now, while MessToCSS is still in development
    if (!post) post = "";
    var repValue = getElm(elm).value;
    if (repValue == "") return false;
    var pattern = new RegExp(pre, "mgi"),
        post;
    var matches = repValue.match(new RegExp(pre, "mgi"), post);
    var newValue = repValue.replace(new RegExp(pre, "mgi"), post);
    document.getElementById(elm).value = newValue;
    return matches;
}

// Element getter (prevents JS errors/returns false when the element isn't found).
// To do: Make this handle all element types (classes/IDs/names etc.) not using querySelectorAll
function getElm(elm) {
    var element = document.getElementById(elm);
    if (element != null && element != "undefined") {
        return element;
    }
    if (element == null) {
        console.log("Element could not be found (" + elm + ").");
        return false;
    }
    if (element == "undefined") {
        console.log("There is more than one element with this ID (" + elm + ").");
        return false;
    }
}

function hideShow(elm) {
    elm = getElm(elm);
    if (elm.style.display=="block"|elm.style.display=="inline-block") {
        elm.style.display="none";
		return "hidden";
    } else {
        elm.style.display="block";
		return "shown";
    }
}

function lpSplit(elm){
	if (document.width<700){
		var height=elm.offsetHeight/2;
		elm.style.height=height+"px";
		elm.style.width="100%";
		return "h";
	}else{
		elm.style.width="49%";
		elm.style.display="inline-block";
		return "v";
	}
}