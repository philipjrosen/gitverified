'use strict';

angular.module('tikrApp')
  .controller('MessageCtrl', ['$scope', '$state', 'messageService', function ($scope, $state, messageService) {

    /**
     * Set $state on the scope to access it in the views
     */
    $scope.$state = $state;

    /**
     * Fetches a messages list that belongs to the authenticated user
     */
    $scope.inbox = function () {
      messageService.inbox().then(function (messages) {
        $scope.messages = messages;
      });
    };

    /**
     * Fetches a message
     */
    $scope.show = function (message) {
      messageService.update(message, { read: true }).then(function (doc) {
        $scope.message = doc;
        message.read = true;
      });
    };

    /**
     * Prioritizes the message for the user
     */
    $scope.starred = function (message) {
      messageService.update(message, { starred: true }).then(function (doc) {
        message.starred = true;
      });
    };

    /**
     * Creates a new private message to a user
     */
    $scope.create = function (newMessage) {
      messageService.create(newMessage).then(function (doc) {
        $scope.messages.push(doc);
        $state.transitionTo('inbox.messages');
      }, function () {
        $state.transitionTo('inbox.messages.create');
      });
    };

    $scope.inbox();
    $state.transitionTo('inbox.messages');

  }]);
