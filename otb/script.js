function whoAmI(){
  var summary = "Not yet populated.";
  if (navigator.userAgent.toLowerCase().indexOf("mobile")!=-1) {
      summary = ("<h1>Mobile</h1>" + "Specifically: " + navigator.userAgent);
    }else{
      summary = ("<h1>Not mobile</h1>" + "Specifically: " + navigator.userAgent);
    }
  document.getElementById("display").innerHTML = summary;
  }
