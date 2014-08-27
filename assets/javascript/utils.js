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
          var data = JSON.parse(request.responseText);
          args.onSuccess(data);
        } else {
          args.onServerError(request);
        }
      };

      request.onerror = function() {
        args.onRequestError(request);
      };

      request.send();
    },

    post: function(args) {

      if (!args.url) {
        return;
      }

      var logToConsole = function(data) {
        console.log(data);
      };

      args.onServerError = args.onServerError || logToConsole;
      args.onRequestError = args.onRequestError || logToConsole;
      args.onSuccess = args.onSuccess || logToConsole;

      if (typeof args.data === 'object') {
        args.data = utils.urlEncode(args.data);
      };

      var request = new XMLHttpRequest();
      request.open('POST', args.url, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      request.onload = function() {
        if (request.status >= 200 && request.status < 400){
          var data = JSON.parse(request.responseText);
          args.onSuccess(data);
        } else {
          args.onServerError(request);
        }
      };

      request.onerror = function() {
        args.onRequestError(request);
      };

      request.send(args.data);
    },

    fieldsToArray: function(fields) {
      var array = {};
      utils.each(fields, function(field) {
        array[field.name] = field.value;
      });

      return array;
    },

    urlEncode: function(obj) {
      var str = [];
      for(var p in obj){
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      }
      return str.join("&");
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
      if (maxLoopLength > array.length) {
        maxLoopLength = array.length;
      } else {
        maxLoopLength = maxLoopLength || array.length;
      }
      for (index = 0; index < maxLoopLength; index += 1) {
        func(array[index]);
      }
    }
  };
})();
