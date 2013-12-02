;(function() {
'use strict';                  

angular.module('gebo-client-performatives.requestControl',
        ['gebo-client-performatives.request',
         'templates/request-control.html']).
    directive('requestControl', function ($templateCache, Request, $compile) {

    var _link = function(scope, element, attributes) {
        if (scope.sender && scope.receiver && scope.action && scope.gebo) {
            element.html($templateCache.get('templates/request-control.html'));
            $compile(element.contents())(scope);
        }
      };

    /**
     * Controller
     */
    var _controller = function($scope, $element, $attrs, $transclude) {

            $attrs.$observe('sender', function(newValue) {
                $scope.sender = newValue;
              });
    
            $attrs.$observe('receiver', function(newValue) {
                $scope.receiver = newValue;
              });
    
            $attrs.$observe('action', function(newValue) {
                $scope.action = newValue;
              });

            $attrs.$observe('gebo', function(newValue) {
                $scope.gebo = newValue;
              });


            /**
             * request
             */
            $scope.request = function() {
                    Request.request($scope.sender, $scope.receiver, $scope.action, $scope.gebo);
                };
      };

    return {
            restrict: 'E',
            scope: true,
            link: _link,
            controller: _controller,
         };
      });
  }());

