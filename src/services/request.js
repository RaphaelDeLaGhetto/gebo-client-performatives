;(function() {
'use strict';                  

angular.module('gebo-client-performatives', ['ngRoute', 'ngResource']).
    factory('Request', function () {

        /**
         * Initiate a request
         */
        function _request(sender, receiver, action, gebo) {
            return {
                    sender: sender,
                    receiver: receiver,
                    performative: 'request',
                    action: action,
                    gebo: gebo,
                };
          };

        return {
            request: _request,
        };
      });
  }());
