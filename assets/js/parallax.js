$(document).ready(function(){
    // Cache the Window object for performance reasons.
    $window = $(window);
    var scrollElms = document.querySelectorAll("[data-scrollspeed]");
    console.log(scrollElms.length);
      for (var x = 0; x < scrollElms.length; x++) {
      var currentElm = this; // assigning the object
      $(window).scroll(function() {
        // Scroll the background at var speed
        // the yPos is a negative value because we're scrolling it UP! 
        var yPos = -($window.scrollTop() * currentElm.data('scrollspeed')); 
        // Put together our final background position
        var coords = '50% '+ yPos + 'px';
        // Move the background
        $bgobj.style.backgroundPosition = coords;
      }); // window scroll Ends
    });
});
