(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.found = [];

  menu.updateTitle = function (){
    if (menu.found.length == 0){
        menu.title = "Nothing found";
      }else{
        menu.title = "Items found :" + menu.found.length;
      }
    };

  menu.title = "Press the button above to search"

  menu.logMenuItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    menu.found = [];
    menu.title = "Searching...";
    promise.then(function (response) {
      menu.found = response;
      console.log(menu.found.length);
      menu.updateTitle();

    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
      console.log(error);
    })

  };



  menu.removeItem = function (index) {
      this.found.splice(index, 1);
      menu.updateTitle();
  };


}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = []

  service.getMatchedMenuItems = function (searchTerm) {
    var items = [];
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    })
    .then(function (result) {
      // process result and only keep items that match
      var items = result.data.menu_items;
      foundItems = [];
      for (var index = 0; index < items.length; index++) {
        if (items[index].description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
          foundItems.push(items[index].id + " : "+  items[index].name + " ("+ items[index].description+")");
        }
      }
      // return processed items
      return foundItems;
    });


  };


}




function FoundItems() {
  var ddo = {
      templateUrl: 'menu_item.html',
      scope: {
        found: '<',
        title: '@',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'narrow',
      bindToController: true,
    };
   return ddo;
 }



} )();