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
    directive('conversationControl', function ($templateCache, Request, $compile) {

    var _link = function(scope, element, attributes) {
        attributes.$observe('sc', function(newValue) {
            scope.sc = newValue;
            _compileWhenReady(scope, element);
          });
    
        attributes.$observe('email', function(newValue) {
            scope.email = newValue;
            _compileWhenReady(scope, element);
          });
    
        attributes.$observe('conversationId', function(newValue) {
            scope.conversationId = newValue;
            _compileWhenReady(scope, element);
          });
      };

    var _compileWhenReady = function(scope, element) {
        if (scope.sc && scope.email && scope.conversationId) {
            var directive = Request.getDirectiveName(JSON.parse(scope.sc), scope.email);
            element.html($templateCache.get('templates/' + directive + '.html'));
            $compile(element.contents())(scope);
        }
      };

    /**
     * Controller
     */
    var _controller = function($scope, $element, $attrs, $transclude) {

            /**
             * agree
             */
            $scope.agree = function() {
                    Request.agree(JSON.parse($scope.sc), $scope.email, $scope.conversationId);
                };

            /**
             * notUnderstood
             */
            $scope.notUnderstood = function() {
                    Request.notUnderstood(JSON.parse($scope.sc), $scope.email, $scope.conversationId);
                };

            /**
             * refuse
             */
            $scope.refuse = function() {
                    Request.refuse(JSON.parse($scope.sc), $scope.email, $scope.conversationId);
                };

            /**
             * timeout
             */
            $scope.timeout = function() {
                    Request.timeout(JSON.parse($scope.sc), $scope.email, $scope.conversationId);
                };

            /**
             * failure
             */
            $scope.failure = function() {
                    Request.failure(JSON.parse($scope.sc), $scope.email, $scope.conversationId);
                };

            /**
             * proposeDischarge
             */
            $scope.proposeDischarge = function() {
                    Request.proposeDischarge(JSON.parse($scope.sc), $scope.email, $scope.conversationId);
                };

            /**
             * cancel
             */
            $scope.cancel = function() {
                    Request.cancel(JSON.parse($scope.sc), $scope.email, $scope.conversationId);
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

