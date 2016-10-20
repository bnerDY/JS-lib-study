console.log("main.js");

require.config({
    //required to use requirejs on plunker
    baseUrl: document.location.href,    
    //using cdn urls. You may decide to replace them with local ones
    paths: {
        'angular': 
          ['https://code.angularjs.org/1.3.5/angular',
          //If the CDN location fails, load from this location
          'lib/angular']
    },
    shim: {
      angular: {
          exports : 'angular'
      }
    }
});

//requirejs dependencies replace script loading order
//for angular dependencies to work we only need the files
//to load as they are applied on instantiation.
// Eg: changing services and controllers file order doesn't
//   create any errors even when controllers depend on services
//   they are only instantiated by DI after angular has been 
//   bootstrapped
require(['app', 'services', 'controllers'], function (app) {
  console.log('app.js, services.js and controllers.js files loaded');
  app.init();
});