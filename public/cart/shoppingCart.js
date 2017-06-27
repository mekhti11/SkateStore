angular.module("cart",[])
.factory("cart",function(){
  var cartdata = [];
  return {
    addProduct : function(id,name,price){
      var added = false;
      for(var i=0 ; i< cartdata.length ; i++){
        if(cartdata[i].id == id){
          cartdata[i].count++;
          added = true;
          break;
        }
      }
      if(!added){
        cartdata.push({
          count : 1 , id : id , price : price , name : name
        });
      }
    },
    removeProduct : function(id){
      for(var i=0 ; i<cartdata.length ; i++){
        if(cartdata[i].id == id){
          cartdata.splice(i,1);
          break;
        }
      }
    },
    getProdct : function(){
      return cartdata;
    }
  }
})
.directive("cartSummary",function(cart){
  return {
    restrict : "E", //means that this directive can be applied only as an element
    templateUrl : "cart/cartSummary.html", //Specifies the URL of a partial view whose contents will be inserted into the directive’s element.
    controller : function($scope){

      var cartdata = cart.getProdct();

      $scope.total = function(){
        var total = 0;
        for(var i=0;i<cartdata.length;i++){
          total+=(cartdata[i].price * cartdata[i].count);
        }
        return total;
      }

      $scope.totalItemCount = function(){
        var total =0;
        for(var i=0;i<cartdata.length;i++){
          total += cartdata[i].count;
        }
        return total;
      }
    }
  };
});
