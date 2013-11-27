;
(function () {
  'use strict';
  angular.module('gebo-client-performatives', [
    'ngRoute',
    'ngResource'
  ]).factory('Request', function () {
    function _request(sender, receiver, action, gebo) {
      return {
        sender: sender,
        receiver: receiver,
        performative: 'request',
        action: action,
        gebo: gebo
      };
    }
    ;
    function _cancel(sc, email) {
      return {
        sender: email,
        receiver: sc.debtor === email ? sc.creditor : sc.debtor,
        performative: 'cancel request',
        action: sc.action
      };
    }
    ;
    function _notUnderstood(sc, email) {
      return {
        sender: email,
        receiver: sc.debtor === email ? sc.creditor : sc.debtor,
        performative: 'not-understood ' + sc.performative.split(' ').pop(),
        action: sc.action
      };
    }
    ;
    function _refuse(sc, email) {
      return {
        sender: email,
        receiver: sc.debtor === email ? sc.creditor : sc.debtor,
        performative: 'refuse ' + sc.performative.split(' ').pop(),
        action: sc.action
      };
    }
    ;
    function _timeout(sc, email) {
      return {
        sender: email,
        receiver: sc.debtor === email ? sc.creditor : sc.debtor,
        performative: 'timeout ' + sc.performative.split(' ').pop(),
        action: sc.action
      };
    }
    ;
    function _agree(sc, email) {
      return {
        sender: email,
        receiver: sc.debtor === email ? sc.creditor : sc.debtor,
        performative: 'agree ' + sc.performative.split(' ').pop(),
        action: sc.action
      };
    }
    ;
    function _failure(sc, email) {
      return {
        sender: email,
        receiver: sc.debtor === email ? sc.creditor : sc.debtor,
        performative: 'failure ' + sc.performative.split(' ').pop(),
        action: sc.action
      };
    }
    ;
    function _proposeDischarge(sc, email) {
      return {
        sender: email,
        receiver: sc.debtor === email ? sc.creditor : sc.debtor,
        performative: 'propose ' + sc.performative.split(' ').pop(),
        action: sc.action
      };
    }
    ;
    function _getDirectiveName(sc, email) {
      var role = 'server';
      switch (sc.performative) {
      case 'reply request':
        role = sc.debtor === email ? 'server' : 'client';
        break;
      case 'propose discharge|perform':
        role = sc.debtor === email ? 'server' : 'client';
        break;
      case 'reply propose|discharge|perform':
        role = sc.debtor === email ? 'client' : 'server';
        break;
      }
      return role + '-' + sc.performative.replace(' ', '-').replace(/\|/g, '-');
    }
    ;
    return {
      agree: _agree,
      cancel: _cancel,
      failure: _failure,
      getDirectiveName: _getDirectiveName,
      notUnderstood: _notUnderstood,
      proposeDischarge: _proposeDischarge,
      refuse: _refuse,
      request: _request,
      timeout: _timeout
    };
  });
}());
;
(function () {
  'use strict';
  angular.module('gebo-client-performatives', []).directive('clientReplyRequest', function () {
    return {
      restrict: 'A',
      template: ''
    };
  });
}());
;
(function () {
  'use strict';
  angular.module('gebo-client-performatives', []).directive('serverReplyRequest', function () {
    return {
      restrict: 'A',
      template: '<button class="btn btn-small" ng-click="agree(sc._id, $event)">' + '    <span class="glyphicon glyphicon-question-sign"></span></button>' + '<button class="btn btn-small" ng-click="refuse(sc._id, $event)">' + '    <span class="glyphicon glyphicon-thumbs-down"></span></button>' + '<button class="btn btn-small" ng-click="agree(sc._id, $event)">' + '    <span class="glyphicon glyphicon-thumbs-up"></span></button>'
    };
  });
}());
