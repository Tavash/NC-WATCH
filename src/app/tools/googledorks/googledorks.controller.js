(function () {
    'use strict';

    angular
        .module('ncwatch')
        .controller('GoogleDorksController', GoogleDorksController);

    /** @ngInject */
    function GoogleDorksController($window, GoogleDorksService, HowToMessages, InfosMessages, ToolsService) {
        var vm = this;
        //ToolsService.saveGoogleDorks(vm);
        vm.search = search;
        vm.changedValue = changedValue;
        //var googleLink = https://www.google.com/webhp?ie=utf-8&oe=utf-8gfe_rd=cr&ei=ILFGV6GTL7Ss8wer_7igAw#safe=off&q=";
        var googleGroupsLink = "https://groups.google.com/forum/#!search/";
        vm.GOOGLEDORKS_HOW_TO = HowToMessages.googleDorks;
        vm.GOOGLEDORKS_MESSAGE_INFO = InfosMessages.googleDorks;

        vm.dorkSelected = '';
        vm.dorkSelectedDetail = '';
        vm.customDork = '';
        vm.dorksList = [
            {dork: 'filetype:pdf site:', name: 'PDFs'},
            {dork: 'filetype:xls OR filetype:xlsx site:', name: 'Excels'},
            {dork: '@domain -www. domain', name: 'Emails'}, // TO DO
            {dork: googleGroupsLink, name: 'Google Groupes'},
            {dork: 'filetype:ppt OR filetype:pptx site:', name: 'PowerPoint'},
            {dork: 'filetype:doc OR filetype:docx site:', name: 'Words'},
            {dork: 'filetype:xls OR filetype:ppt OR filetype:doc site:', name: 'Office 2003'},
            {dork: 'filetype:xlsx OR filetype:pptx OR filetype:docx site:', name: 'Office 2007'},
            {dork: 'filetype:rtf site:', name: 'RTF'},
            {dork: 'site:domain -domain', name: 'Recherche'}, // TO DO
            {dork: 'filetype:txt site:', name: 'TXTs'},
            {dork: 'site:github.com filetype:js | filetype:txt | filetype:cpp | filetype:c | filetype:py | filetype:php | filetype:h | filetype:hpp | filetype:cs | filetype:vb | filetype:java | filetype:md intext:"', name: 'Code source github.com'},
            {dork: 'site:pastebin.com filetype:js | filetype:txt | filetype:cpp | filetype:c | filetype:py | filetype:php | filetype:h | filetype:hpp | filetype:cs | filetype:vb | filetype:java | filetype:md intext:"', name: 'Code source pastebin.com'},
            {dork: '', name: 'Personnalisé'}
        ];

        function search() {
            var domain = vm.domain;
            var dorkSelected = JSON.parse(vm.dorkSelected);
            var query;

            switch (dorkSelected.name) {
                case 'Emails':
                    query = '"@' + domain + '" -www. ' + domain;
                    break;
                case 'Recherche':
                    query = "site:" + domain + " -www." + domain;
                    break;
                case 'Google Groupes':
                    $window.open(dorkSelected.dork + domain);
                    break;
                case 'Code source github.com':
                case 'Code source pastebin.com':
                    var site = domain.split('.');
                    query = dorkSelected.dork + site[0]+'"';
                    break;
                case 'Personnalisé' :
                    query = vm.customDork;
                    break;
                default:
                    query = dorkSelected.dork + domain;
                    console.log(query);
                    break;
            }
            if (dorkSelected.name != 'Google Groupes') {
                GoogleDorksService.googleSearch(query).success(function (res) {
                    var desc;
                    var word = vm.domain;

                    for (var i = res.length - 1; i >= 0; i--) {
                        res[i].description = makeBold(word, res[i].description);
                        res[i].title = makeBold(word, res[i].title);
                    }

                    if (res.length > 0) {
                        vm.googleSearchResult = res;
                        vm.hasResult = true;
                    } else vm.hasResult = false;

                }).error(function (err) {
                    console.log(err);
                });
            }
        }

        function changedValue(selected) {
            selected = JSON.parse(selected);
            vm.dorkSelectedDetail = selected;
        }

        function makeBold(toBold, phrase) {
            var reg = new RegExp("(" + toBold + ")", "gi");
            return phrase.replace(reg, "<b>$1</b>");
        }
    }
})();