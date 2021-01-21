(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showToBuyList = this;

  showToBuyList.buyItem = function (itemIndex) {
     ShoppingListCheckOffService.buyAnItem(itemIndex);
  }


   showToBuyList.items=ShoppingListCheckOffService.getToBeBoughtItems();

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showBoughtList = this;

  showBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBeBought = [];
  itemsToBeBought.push({name: "Gatorade", quantity: 1});
  itemsToBeBought.push({name: "Sprite", quantity: 2});
  itemsToBeBought.push({name: "Red Wine", quantity: 3});
  itemsToBeBought.push({name: "White Wine", quantity: 4});
  itemsToBeBought.push({name: "Orange Juice", quantity: 5});
  itemsToBeBought.push({name: "Apple Juice", quantity: 6});
  itemsToBeBought.push({name: "Sparkling Water", quantity: 10});

  var itemsAlreadyBought = [];

  service.buyAnItem = function (itemIndex) {
  	itemsAlreadyBought.push({name: itemsToBeBought[itemIndex].name, quantity: itemsToBeBought[itemIndex].quantity});
    itemsToBeBought.splice(itemIndex, 1);
  };

  service.getToBeBoughtItems = function () {
    return itemsToBeBought;
  };

  service.getAlreadyBoughtItems = function () {
    return itemsAlreadyBought;
  };

}

})();