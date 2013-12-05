;(function() {
'use strict';                  

angular.module('gebo-client-performatives.requestControl',
        ['gebo-client-performatives.request',
         'templates/request-control.html']).
    directive('requestControl', function ($templateCache, Request, $compile) {

    var _link = function(scope, element, attributes) {
        attributes.$observe('sender', function(newValue) {
            scope.sender = newValue;
            _compileWhenReady(scope, element);
          });

        attributes.$observe('receiver', function(newValue) {
            scope.receiver = newValue;
            _compileWhenReady(scope, element);
          });

        attributes.$observe('action', function(newValue) {
            scope.action = newValue;
            _compileWhenReady(scope, element);
          });

        attributes.$observe('gebo', function(newValue) {
            scope.gebo = newValue;
            _compileWhenReady(scope, element);
          });

        attributes.$observe('content', function(newValue) {
            scope.content = newValue;
            _compileWhenReady(scope, element);
          });
      };

    var _compileWhenReady = function(scope, element) {
        element.html($templateCache.get('templates/request-control.html'));
        $compile(element.contents())(scope);
      };

    return {
            restrict: 'E',
            scope: true,
            link: _link,
         };
      });
  }());

