(function() {
  'use strict';

  angular
    .module('ncwatch')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('crawl', {
        url: '/crawl',
        templateUrl: 'app/crawl/crawl.html',
        controller: 'CrawlController',
        controllerAs: 'crawl'
      });


    $urlRouterProvider.otherwise('/');
  }

})();
