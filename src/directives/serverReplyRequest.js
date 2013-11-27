;(function() {
'use strict';                  

angular.module('gebo-client-performatives', []).
    directive('serverReplyRequest', function () {
        return {
            restrict: 'A',
            template: '<button class="btn btn-small" ng-click="agree(sc._id, $event)">' +
                      '    <span class="glyphicon glyphicon-question-sign"></span></button>' +
                      '<button class="btn btn-small" ng-click="refuse(sc._id, $event)">' +
                      '    <span class="glyphicon glyphicon-thumbs-down"></span></button>' +
                      '<button class="btn btn-small" ng-click="agree(sc._id, $event)">' +
                      '    <span class="glyphicon glyphicon-thumbs-up"></span></button>',
         };
      });
  }());

