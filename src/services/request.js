;(function() {
'use strict';                  

angular.module('gebo-client-performatives.request', ['ngRoute', 'ngResource']).
    factory('Request', function () {

        /**
         * The method called when a new message
         * is created. It is meant to be overwritten.
         * This function is simply defined to give 
         * feedback while the system is being 
         * configured
         */
        var _callback = function(msg) {
            console.log(msg);
          };

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

            if (typeof sc === 'string') {
              sc = JSON.parse(sc);
            }

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
