function removeDuplicates(ref,comp){
	var start = new Date().getTime();
	var refCSS = parseCSS(ref);
	var compCSS = parseCSS(comp);
	for (b in refCSS){
		for (a in compCSS){
			if (xMatch(refCSS[b][0],compCSS[a][0])){
				console.log("A selector was matched." + refCSS[b][0] + compCSS[a][0]);
				for (c in compCSS[a][1]){
					var a = compCSS[a][1].length;
					while (a>-1){
						if (xMatch(refCSS[b][1][a],compCSS[a][1][c])){
							console.log("A property was matched and removed.");
							compCSS[a][1].splice([c],1);
							console.log(compCSS[a][1][c]);
							a = a-1;
						}
					}
				}
			}
		}
	}
	var end = new Date().getTime();
	var time = end - start;
	console.log(time + "ms");
	var outputCSS = cssArrayToString(compCSS);
	comp = document.getElementById(comp);
	comp.value = outputCSS;
	return true;
}

// Couple of hacky things just to get it working for now, so I can use it at work.
// Splice on removeDuplicates was causing issues, so I'm trying something, and the
// getProperties regex is matching selectors with pseudo states, this just
// accounts for the messy array caused by both issues.
function cssArrayToString(compCSS){
	var cssString = "";
		for (a in compCSS){
			cssString = cssString + compCSS[a][0].toString() + "{";
			for (b in compCSS[a][1]){
				if (compCSS[a][1][b] != "empty" && !compCSS[a][1][b].match("\{")){
					cssString = cssString + compCSS[a][1][b].toString() + ";";
				}
			}
			cssString = cssString + "}";
		}
	return cssString;
}

function xMatch(ref,comp){
	if (ref != "" && comp != "" && ref.length == comp.length && ref==comp){
		return true;
	}else{
		return false;
	}
}


function parseCSS(elm,value){
	stripDown(elm); // This needs to do this on the string, rather than affecting the textboxes directly, so that the reference CSS doesn't change (this might confuse some people).
	var declarations = getDeclarations(elm),CSS = [];
	for (x in declarations){
			var declaration = declarations[x].lpReplace(new RegExp("\\/\\*.*?\\*\\/", "mgi"), "")
			CSS[x] = [getSelector(declaration),getProperties(declaration)];
		}
	return CSS;
}

function getDeclarations(elm,value){
	if (!elm) elm = "textbox";
	if (!value) value = getElm(elm).value;
	var declarations = value.match(new RegExp("[^\/\}]*?\{.*?\}", "mgi"));
	if (declarations!=null && declarations.length>0){
		console.log(declarations.length + " declarations.");
		return declarations;
	}else{
		console.log("No declarations found.");
		return false;
	}
}

function getSelector(declaration){
	var selector = declaration.match(new RegExp("^[^\{\\t]*","mgi"))[0];
	selector = selector.lpReplace(new RegExp("^ *","mgi"),"");
	return selector;
}

function getProperties(declaration){
	var properties = declaration.match(new RegExp("[^\{\; ][^\{\;]*:[^\}\;]*[^\}\; ]","mgi"));
	return properties;
}

function stripDown(elm){
	//To do:
	//add reducing down bold to 700 and black to #000, for example.
	//look into conversions from rgb to hex
	//handle media queries better (double indenting?)
	//add own presets (html5 localstorage? login system?)
	lpReplace("\\t","",elm); // Remove tabs
	lpReplace("[\\r\\n]*","",elm); // Remove line breaks
	lpReplace("\\s*([\;\{\}\(\)\:\>\~!,])\\s*","$1",elm); // Remove unnecessary whitespace
	lpReplace("  "," ",elm); // Remove double spaces

	var remsemicolons = getElm("remsemicolons").checked;
	var remunitzero = getElm("remunitzero").checked;
	var reducehex = getElm("reducehex").checked;
	var remempties = getElm("remempties").checked;
	var remcomments = getElm("remcomments").checked;

	if (remsemicolons) {lpReplace("\;\}","}",elm);} // Remove trailing semicolons
	if (remunitzero) {lpReplace("([\:\ ])0px", "$10",elm);} // Remove units on zero values
	if (reducehex) {lpReplace("\#([0-9a-fA-F])\\1([0-9a-fA-F])\\2([0-9a-fA-F])\\3","#$1$2$3",elm);} //Reduce down hex codes where possible
	if (remempties) {lpReplace("[^\}\/]*\{\\s*?\}","",elm);} //Remove empty properties
	if (remcomments) {lpReplace("\\/\\*.*?\\*\\/","",elm);} // Remove comments
}

function prettify(elm){
	var linebreaks = getElm("linebreaks").checked;
	var clsbraceownline = getElm("clsbraceownline").checked;
	var blankseparator = getElm("blankseparator").checked;
	var indentprops = getElm("indentprops").checked;
	var commaspace = getElm("commaspace").checked;
	var colonspace = getElm("colonspace").checked;
	var openspace = getElm("openspace").checked;
	var commentline = getElm("commentline").checked;
	var specialspaces = getElm("specialspaces").checked;
	var bgie7fix = getElm("bgie7fix").checked;

	if (linebreaks) {lpReplace("([\;\{])", "$1\n",elm);} // Line break after each property and after selectors
	if (clsbraceownline) {lpReplace("\}", "\n}",elm);} // Closing brace on it's own line
	if (blankseparator) {lpReplace("\}", "}\n\n",elm);} // Blank line after declaration
	if (indentprops) {lpReplace("(.*?:.*[^\{]\\n)","\t$1",elm);} // Indent properties
	if (commaspace) {lpReplace(",",", ",elm);} // Add spaces after commas
	if (colonspace) {lpReplace("(.*?:)(.*[^\{]\\n)","$1 $2",elm);} // Add spaces after colons
	if (specialspaces) {lpReplace("([\>\~])"," $1 ",elm);} // Add spaces either side of special operators on selectors
	if (openspace) {lpReplace("\{"," {",elm);} // Add spaces before opening braces
	if (commentline) {lpReplace("(\\/\\*.*?\\*\\/)","\n$1\n",elm);} // Put comments on their own line
	if (bgie7fix) {lpReplace("\\bbackground\\b([^\\:])*\\:([^\\burl\\b\\bURL\\b]*)url\\(([^)]*)\\)([^\\}; ])","background$1:$2url($3) $4",elm);} // Preserve/fix background property for IE7
};

function remProps(elm,props){
if (!props) props = (getElm("props").value.toString()).split(" ");
	for (x in props) {
		try {
				lpReplace("([\\n;{])\\b"+props[x]+"\\b:[^;\}]*;?(}?)","$1$2",elm);
			}catch(error){
				console.log("One of the entered properties has caused an invalid regex ("+error.message+").");
		}
	}
}

function messToCSS() {
	// Clean first, to make it easier to work with.
	stripDown("textbox"); //Strip formatting
	remProps("textbox"); // Remove properties as requested.
	var remdupes = getElm("remdupes").checked;
	if (remdupes) {removeDuplicates("textbox2","textbox");stripDown("textbox2");} // Remove duplicates
	// Then clean again, so it looks nice + pretty.
	stripDown("textbox"); //Strip formatting
	prettify("textbox"); // Now make it pretty!
};

function setOpts(preset) {
	var opts = document.getElementsByTagName("input");
	var props = "";
	for (x in opts){
		if (opts[x].type=="checkbox"){
			opts[x].checked = false;
		}
	}
	
	switch (preset) {
		case "human":
			opts=["remsemicolons","remunitzero","reducehex","remempties","linebreaks","clsbraceownline","blankseparator","indentprops","commentline"];
			break;
		case "structure":
			opts=["remsemicolons","remunitzero","reducehex","remempties","remcomments","linebreaks","blankseparator","commentline"];
			props="background background-attachment background-clip background-color background-image background-origin background-position background-repeat background-size border-bottom-left-radius border-bottom-right-radius border-top-right-radius border-top-left-radius border border-left border-right border-top border-bottom border-style border-bottom-color border-color border-left-color border-right-color border-top-color color column-rule-color outline-color outline-offset outline-style outline-width line-height";
			break;
		case "machine":
			opts=["remsemicolons","remunitzero","reducehex","remempties","remcomments"];
			break;
		case "balanced":
			opts=["remsemicolons","remunitzero","reducehex","remempties","linebreaks","blankseparator","indentprops","remcomments","bgie7fix"];
			break;
		default:
			console.log("No preset was specified. String supplied was: \""+preset+"\".");
			return false;
			break;
	}
	
	for (x in opts){
		(getElm(opts[x])).checked = true;
	}
	
	getElm("props").value = props;
	var elm = getElm("textbox2");
	if (getElm("remdupes").checked==true){
		elm.style.display="block";
	}else{
		elm.style.display="none";
	}
	return true;
}

function showCompBox(){
	if (hideShow('textbox2')=="shown"){
		var elm=getElm('textbox');
		if (lpSplit(elm)=="v") elm.style.float="left";
		elm=getElm('textbox2');
		if (lpSplit(elm)=="v") elm.style.float="right";
	}else{
		var elm=getElm('textbox');
		elm.style.width="100%";
	}		
}


