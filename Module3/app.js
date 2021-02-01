(function() {

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', foundItems);

  function foundItems() {
    var ddo = {
      templateUrl : 'loader/itemsloaderindicator.template.html',
      scope : {
        list : '<',
        onRemove : '&'
      }
    };
    return ddo;

  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var ndc = this;
    ndc.searchtext = "";
    ndc.novalue = "";

    ndc.getallitems = function() {
      ndc.novalue = "";
      var promise = MenuSearchService.getMatchedMenuItems();
      promise.then(function(response) {
        if(ndc.searchtext.trim() == ""){
          ndc.novalue = "Nothing found";
          ndc.itemlist = ""
        }
        else {
        ndc.itemlist = response.data;
        MenuSearchService.additemsinarray(ndc.itemlist.menu_items);
          ndc.itemlist.menu_items = MenuSearchService.filterarrayelements(ndc.searchtext);
          if(ndc.itemlist.menu_items.length <= 0){
            ndc.novalue = "Nothing found";
          }
        }

        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    };

    ndc.onremove = function(itemindex) {
      ndc.itemlist.menu_items = MenuSearchService.deleteentry(itemindex);
      if(ndc.itemlist.menu_items.length <= 0){
        ndc.novalue = "Nothing found";
      }
    }

  }

  MenuSearchService.$inject = ["$http","ApiBasePath","$rootScope"];
  function MenuSearchService($http,ApiBasePath,$rootScope) {
    var service = this;
    var menu = [];
    var found = [];

    service.getMatchedMenuItems = function() {
      var response = $http({
        url : (ApiBasePath + "/menu_items.json")
      });

      return response;
    };

    service.deleteentry = function(itemindex) {
      found.splice(itemindex,1);
      return found;
    };

    service.additemsinarray = function(values) {
      var i =0;
      menu = [];
        for(i=0;i<values.length;i++){
          menu.push(values[i]);
        }
        return menu;

    }

    service.filterarrayelements = function(textvalue) {
      var i=0;
      found =  [];
      for(i=0;i<menu.length;i++){
        if(menu[i].name.toUpperCase().includes(textvalue.toUpperCase())){
          found.push(menu[i]);
        }
      }

      return found;
    }


  }
}

)();