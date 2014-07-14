var utils = (function() {
  'use strict';
  return {
    getAJAX: function(args) {

      if (!args.url) {
        return;
      }

      var logToConsole = function(data) {
        console.log(data);
      };

      args.onServerError = args.onServerError || logToConsole;
      args.onRequestError = args.onRequestError || logToConsole;
      args.onSuccess = args.onSuccess || logToConsole;

      var request = new XMLHttpRequest();
      request.open('GET', args.url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400){
          // Success!
          var data = JSON.parse(request.responseText);
          args.onSuccess(data);
        } else {
          // We reached our target server, but it returned an error
          args.onServerError(request);
        }
      };

      request.onerror = function() {
        args.onRequestError(request);
      };

      request.send();
    },

    extend: function(out) {
      out = out || {};

      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i])
          continue;

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key))
            out[key] = arguments[i][key];
        }
      }

      return out;
    },

    onReady: function(func) {
      document.addEventListener('DOMContentLoaded', function(){
        func();
      });
    },

    each: function(array, func, maxLoopLength) {
      var index;
      maxLoopLength > array.length ? maxLoopLength = array.length;
      maxLoopLength = maxLoopLength || array.length;
      for (index = 0; index < maxLoopLength; index += 1) {
        func(array[index]);
      }
    }
  };
})();
