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
    return {
      agree: _agree,
      cancel: _cancel,
      failure: _failure,
      notUnderstood: _notUnderstood,
      proposeDischarge: _proposeDischarge,
      refuse: _refuse,
      request: _request,
      timeout: _timeout
    };
  });
}());