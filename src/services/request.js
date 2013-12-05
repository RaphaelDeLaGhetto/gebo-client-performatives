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
         * The method called when the server is 
         * able to perform a gebo-defined action. 
         * It is meant to be overwritten.
         * This function is simply defined to give 
         * feedback while the system is being 
         * configured
         */
        var _performCallback = function(msg) {
            console.log(msg);
          };

        function _setPerformCallback(fn) {
            _performCallback = fn;
          };

        /**
         * Get an initial request message
         *
         * @param string
         * @param string
         * @param string
         * @param string
         * @param Object
         *
         * @return Object
         */
        function _make(sender, receiver, action, gebo, content) {
            return {
                    sender: sender,
                    receiver: receiver,
                    performative: 'request',
                    action: action,
                    gebo: gebo,
                    content: content,
                };
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
                    content: sc.message.content,
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
                    content: sc.message.content,
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
                    content: sc.message.content,
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
                    content: sc.message.content,
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
                    content: sc.message.content,
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
                    content: sc.message.content,
                });
          };

        /**
         * Perform the request action by passing the
         * given parameters to the _performCallback function
         *
         * @param Object - social commitment
         * @param string - email of sender
         * @param string - conversation ID
         *
         * @return Object
         */
        function _perform(sc, email, id) {
            _performCallback({
                    sender: email,
                    receiver: email, //sc.debtor === email? sc.creditor: sc.debtor,
                    performative: 'perform',
                    action: sc.action,
                    conversationId: id,
                    content: sc.message.content,
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
                    content: sc.message.content,
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
            callback: function(msg) { _callback(msg); },
            cancel: _cancel,
            failure: _failure,
            getDirectiveName: _getDirectiveName,
            make: _make,
            notUnderstood: _notUnderstood,
            perform: _perform,
            performCallback: function(msg) { _performCallback(msg); },
            proposeDischarge: _proposeDischarge,
            setCallback: _setCallback,
            setPerformCallback: _setPerformCallback,
            refuse: _refuse,
            timeout: _timeout,
        };
      });
  }());
