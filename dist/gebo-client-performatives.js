angular.module("gebo-client-performatives", ["gebo-client-performatives.conversationControl","gebo-client-performatives.requestControl","gebo-client-performatives.request"]);
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
        if (scope.sc && scope.email && scope.conversationId) {
            var directive = Request.getDirectiveName(scope.sc, scope.email);
            element.html($templateCache.get('templates/' + directive + '.html'));
            $compile(element.contents())(scope);
        }
      };

    /**
     * Controller
     */
    var _controller = function($scope, $element, $attrs, $transclude) {

            $attrs.$observe('sc', function(newValue) {
                $scope.sc = newValue;
              });
    
            $attrs.$observe('email', function(newValue) {
                $scope.email = newValue;
              });
    
            $attrs.$observe('conversationId', function(newValue) {
                $scope.conversationId = newValue;
              });

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


angular.module("templates/client-propose-discharge-perform.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/client-propose-discharge-perform.html",
    "<button class=\"btn btn-small\" ng-click=\"cancel()\">\n" +
    "    <span class=\"glyphicon glyphicon-remove\"></span></button>\n" +
    "");
}]);

angular.module("templates/client-reply-propose-discharge-perform.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/client-reply-propose-discharge-perform.html",
    "<button class=\"btn btn-small\" ng-click=\"notUnderstood()\">\n" +
    "    <span class=\"glyphicon glyphicon-question-sign\"></span></button>\n" +
    "<button class=\"btn btn-small\" ng-click=\"refuse()\">\n" +
    "    <span class=\"glyphicon glyphicon-thumbs-down\"></span></button>\n" +
    "<button class=\"btn btn-small\" ng-click=\"agree()\">\n" +
    "    <span class=\"glyphicon glyphicon-thumbs-up\"></span></button>\n" +
    "");
}]);

angular.module("templates/client-reply-request.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/client-reply-request.html",
    "");
}]);

angular.module("templates/request-control.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/request-control.html",
    "<button class=\"btn btn-small\" ng-click=\"request()\">\n" +
    "    <span class=\"glyphicon glyphicon-envelope\"></span></button>\n" +
    "");
}]);

angular.module("templates/server-perform.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/server-perform.html",
    "<button class=\"btn btn-small\" ng-click=\"\">\n" +
    "    <span class=\"glyphicon glyphicon-ok\"></span></button>\n" +
    "");
}]);

angular.module("templates/server-propose-discharge-perform.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/server-propose-discharge-perform.html",
    "");
}]);

angular.module("templates/server-reply-propose-discharge-perform.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/server-reply-propose-discharge-perform.html",
    "");
}]);

angular.module("templates/server-reply-request.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/server-reply-request.html",
    "<button class=\"btn btn-small\" ng-click=\"notUnderstood()\">\n" +
    "    <span class=\"glyphicon glyphicon-question-sign\"></span></button>\n" +
    "<button class=\"btn btn-small\" ng-click=\"refuse()\">\n" +
    "    <span class=\"glyphicon glyphicon-thumbs-down\"></span></button>\n" +
    "<button class=\"btn btn-small\" ng-click=\"agree()\">\n" +
    "    <span class=\"glyphicon glyphicon-thumbs-up\"></span></button>\n" +
    "");
}]);

;(function() {
'use strict';                  

angular.module('gebo-client-performatives.request', ['ngRoute', 'ngResource']).
    factory('Request', function () {

        /**
         * The method called when a new message
         * is created
         */
        var _callback;

        function _setCallback(fn) {
            _callback = fn;
          };

        /**
         * Initiate a request
         *
         * @param string
         * @param string
         * @param string
         * @param string
         *
         * @return Object
         */
        function _request(sender, receiver, action, gebo) {
            _callback({
                    sender: sender,
                    receiver: receiver,
                    performative: 'request',
                    action: action,
                    gebo: gebo,
                });
          };

        /**
         * Cancel a request
         *
         * @param Object - social commitment
         * @param string - email of sender
         * @param string - conversation ID
         *
         * @return Object
         */
        function _cancel(sc, email, id) {
            _callback({
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'cancel request',
                    action: sc.action,
                    conversationId: id,
                });
          };

        /**
         * Communicate misunderstanding
         *
         * @param Object - social commitment
         * @param string - email of sender
         * @param string - conversation ID
         *
         * @return Object
         */
        function _notUnderstood(sc, email, id) {
            _callback({
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'not-understood ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                    conversationId: id,
                });
          };

        /**
         * Refuse an agent's assertion
         *
         * @param Object - social commitment
         * @param string - email of sender
         * @param string - conversation ID
         *
         * @return Object
         */
        function _refuse(sc, email, id) {
            _callback({
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'refuse ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                    conversationId: id,
                });
          };

        /**
         * Refuse an agent's assertion
         *
         * @param Object - social commitment
         * @param string - email of sender
         * @param string - conversation ID
         *
         * @return Object
         */
        function _timeout(sc, email, id) {
            _callback({
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'timeout ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                    conversationId: id,
                });
          };

        /**
         * Agree to an agent's assertion
         *
         * @param Object - social commitment
         * @param string - email of sender
         * @param string - conversation ID
         *
         * @return Object
         */
        function _agree(sc, email, id) {
            _callback({
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'agree ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                    conversationId: id,
                });
          };

        /**
         * Signal failure to perform action
         *
         * @param Object - social commitment
         * @param string - email of sender
         * @param string - conversation ID
         *
         * @return Object
         */
        function _failure(sc, email, id) {
            _callback({
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'failure ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                    conversationId: id,
                });
          };

        /**
         * Signal that the request action has been performed 
         *
         * @param Object - social commitment
         * @param string - email of sender
         * @param string - conversation ID
         *
         * @return Object
         */
        function _proposeDischarge(sc, email, id) {
            _callback({
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'propose ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                    conversationId: id,
                });
          };

        /**
         * Get the name of the appropriate directive
         *
         * (This will likely be moved in reorganization)
         *
         * @param Object - social commitment
         * @param string - email of would-be sender
         *
         * @return string
         */
        function _getDirectiveName(sc, email) {

            // Determine the agent's role
            var role = 'server';
            switch(sc.performative) {
                case 'reply request':
                    role = sc.debtor === email? 'server': 'client';
                    break;
                case 'propose discharge|perform':
                    role = sc.debtor === email? 'server': 'client';
                    break;
                case 'reply propose|discharge|perform':
                    role = sc.debtor === email? 'client': 'server';
                    break;
             }

            // Remove spaces and pipes
            return role + '-' + sc.performative.replace(' ', '-').replace(/\|/g, '-');
          };

        return {
            agree: _agree,
            callback: function(msg){ _callback(msg); },
            cancel: _cancel,
            failure: _failure,
            getDirectiveName: _getDirectiveName,
            notUnderstood: _notUnderstood,
            proposeDischarge: _proposeDischarge,
            setCallback: _setCallback,
            refuse: _refuse,
            request: _request,
            timeout: _timeout,
        };
      });
  }());
