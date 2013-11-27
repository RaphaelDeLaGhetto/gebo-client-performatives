;(function() {
'use strict';                  

angular.module('gebo-client-performatives', ['ngRoute', 'ngResource']).
    factory('Request', function () {

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
            return {
                    sender: sender,
                    receiver: receiver,
                    performative: 'request',
                    action: action,
                    gebo: gebo,
                };
          };

        /**
         * Cancel a request
         *
         * @param Object - social commitment
         * @param string - email of sender
         *
         * @return Object
         */
        function _cancel(sc, email) {
            return {
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'cancel request',
                    action: sc.action,
                };
          };

        /**
         * Communicate misunderstanding
         *
         * @param Object - social commitment
         * @param string - email of sender
         *
         * @return Object
         */
        function _notUnderstood(sc, email) {
            return {
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'not-understood ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                };
          };

        /**
         * Refuse an agent's assertion
         *
         * @param Object - social commitment
         * @param string - email of sender
         *
         * @return Object
         */
        function _refuse(sc, email) {
            return {
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'refuse ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                };
          };

        /**
         * Refuse an agent's assertion
         *
         * @param Object - social commitment
         * @param string - email of sender
         *
         * @return Object
         */
        function _timeout(sc, email) {
            return {
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'timeout ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                };
          };

        /**
         * Agree to an agent's assertion
         *
         * @param Object - social commitment
         * @param string - email of sender
         *
         * @return Object
         */
        function _agree(sc, email) {
            return {
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'agree ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                };
          };

        /**
         * Signal failure to perform action
         *
         * @param Object - social commitment
         * @param string - email of sender
         *
         * @return Object
         */
        function _failure(sc, email) {
            return {
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'failure ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                };
          };

        /**
         * Signal that the request action has been performed 
         *
         * @param Object - social commitment
         * @param string - email of sender
         *
         * @return Object
         */
        function _proposeDischarge(sc, email) {
            return {
                    sender: email,
                    receiver: sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'propose ' + sc.performative.split(' ').pop(),
                    action: sc.action,
                };
          };

        return {
            agree: _agree,
            cancel: _cancel,
            failure: _failure,
            notUnderstood: _notUnderstood,
            proposeDischarge: _proposeDischarge,
            refuse: _refuse,
            request: _request,
            timeout: _timeout,
        };
      });
  }());
