;(function() {
'use strict';                  

angular.module('gebo-client-performatives.conversationControl',
        ['gebo-client-performatives.request',
         'templates/server-reply-request.html',
         'templates/client-reply-request.html',
         'templates/server-propose-discharge-perform.html',
         'templates/client-propose-discharge-perform.html',
         'templates/server-reply-propose-discharge-perform.html',
         'templates/client-reply-propose-discharge-perform.html',
         'templates/server-perform.html']).
    directive('conversationControl', function ($templateCache, Request) {

    function _link(scope, element, attributes) {
        attributes.$observe('sc', function(newValue) {
            scope.sc = newValue;
          });

        attributes.$observe('email', function(newValue) {
            scope.email = newValue;
          });

        if (scope.sc && scope.email) {
            var directive = Request.getDirectiveName(scope.sc, scope.email);
            element.html($templateCache.get('templates/' + directive + '.html'));
        }
      };

    return {
            restrict: 'E',
            link: _link,
         };
      });
  }());

