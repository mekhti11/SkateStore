angular.module("cart", [])
.factory("cart", function () {

    var cartData = [];

    return {

        addProduct: function (id, name, price) {
            var added = false;
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].id == id) {
                    cartData[i].count++;
                    added = true;
                    break;
                }
            }
            if (!added) {
                cartData.push({
                    count: 1, id: id, price: price, name: name
                });
            }
        },

        removeProduct: function (id) {
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].id == id) {
                    cartData.splice(i, 1);
                    break;
                }
            }
        },

        getProducts: function () {
            return cartData;
        }
    }
})
.directive("cartSummary", function (cart) {
    return {
        restrict: "E", //means that this directive can be applied only as an element
        templateUrl: "components/cart/cartSummary.html", //Specifies the URL of a partial view whose contents will be inserted into the directive’s element.
        controller: function ($scope) {

            var cartData = cart.getProducts();

            $scope.total = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += (cartData[i].price * cartData[i].count);
                }
                return total;
            };

            $scope.itemCount = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += cartData[i].count;
                }
                return total;
            };
        }
    };
});
