// Add a class of cleardefault to an elements that you want to clear the defaults onChange,
// include this file, and this'll attach resetField to clear the field's defaults onfocus,
// then remove the cleardefault class from each element.

window.onload = function() {
  addResets();
}

function addResets() {
    try {
		// Use query selector all because it returns a static list, and put elms.length into a variable so we're not checking the length of elms every loop 
        var elms = document.querySelectorAll(".cleardefault"),len = elms.length;
        for (var x = 0; x<len; x++) {
            elms[x].setAttribute("onfocus", "resetField(this,'" + elms[x].value + "')");
            elms[x].className.replace(new RegExp("\bcleardefault\b", "mgi"), "");
            elms[x].classList.remove('cleardefault');
        }
    } catch (error) {
        console.log("Reset could not be added (" + error.message + ").");
    }
    return true;
}

// Compare a given field to it's supplied default, and clear it if it matches.
function resetField(field, defaultvalue){
    if (field.value == defaultvalue) {
        field.value = "";
    }
}