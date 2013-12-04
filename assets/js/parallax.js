$(document).ready(function(){
    // Cache the Window object for performance reasons.
    $window = $(window);
    $('[data-scrollspeed]').each(function(){
      var $bgobj = $(this); // assigning the object
      $(window).scroll(function() {
        // Scroll the background at var speed
        // the yPos is a negative value because we're scrolling it UP! 
        var yPos = -($window.scrollTop() * $bgobj.data('scrollspeed')); 
        // Put together our final background position
        var coords = '50% '+ yPos + 'px';
        // Move the background
        $bgobj.css({ backgroundPosition: coords });
      }); // window scroll Ends
    });
});
