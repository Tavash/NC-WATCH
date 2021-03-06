(function() {
    'use strict';

    angular
        .module('ncwatch')
        .controller('ShodanController', ShodanController);

    /** @ngInject */
    function ShodanController($mdToast, ShodanService, ToolsService, HowToMessages, InfosMessages) {
        var vm = this;

        vm.shodanHost = shodanHost;
        vm.exportData = exportData;

        vm.SHODAN_HOW_TO = HowToMessages.shodan;
        vm.SHODAN_MESSAGE_INFO = InfosMessages.shodan;
        vm.isLoad = false;

        function shodanHost(){
            var domain = vm.domain;
            vm.saveDomain = domain;

            ShodanService.shodanHost(domain).success(function(res){
                vm.shodanHostResult = res;
                vm.ports = res.ports;
                vm.dataPorts = res.data;
                vm.isLoad = true;
            });
        }

        function exportData() {
            ToolsService.exportDataInFile('shodan', vm.saveDomain, vm.shodanHostResult)
                .success(function() {
                    showSimpleToast('Les résultats de Shodan ont bien été exportés (dossier export de l\'application) !')
                });
        }

        function showSimpleToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom')
                    .hideDelay(3000)
            );
        }

    }
})();