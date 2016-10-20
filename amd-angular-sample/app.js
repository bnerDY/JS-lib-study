console.log("app.js")
define(['angular'], function (angular) {
  console.log('angular.js file loaded');

  var app = angular.module('plunker', []);

  app.init = function () {
    console.log('app.init called');
    angular.bootstrap(document, ['plunker']);
  };
  
  return app;
});