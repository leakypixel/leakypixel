$(document).ready(function(){
    $window = $(window);
    var scrollElms = document.querySelectorAll("[data-scrollspeed]");
    console.log(scrollElms.length);
      for (var x = 0; x < scrollElms.length; x++) {
      var currentElm = this; 
      $(window).scroll(function() {
        var yPos = -($window.scrollTop() * currentElm.data('scrollspeed'));
        var coords = '50% '+ yPos + 'px';
        $bgobj.style.backgroundPosition = coords;
      });
    });
});
