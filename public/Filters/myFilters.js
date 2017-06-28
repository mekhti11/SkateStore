angular.module("myFilters",[])
.filter("unique", function () {
  return function (data, propertyName) {
    if (angular.isArray(data) && angular.isString(propertyName)) {
      var results = [];
      var keys = {};
      for (var i = 0; i < data.length; i++) {
        var val = data[i][propertyName];
        if (angular.isUndefined(keys[val])) {
          keys[val] = true;
          results.push(val);
        }
      }
      return results;
    }
    else {
        return data;
    }
  }
})

.filter("range",function($filter){
  return function(data,page,size){
    if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
      var start = (page - 1) * size ;
      if(data.length < start)
        return [];
      else
        return $filter("limitTo")(data.splice(start),size);//???
    }
    else
      return data ;
  }
})

.filter("pageCount",function(){
  return function(data , size){
    if(angular.isArray(data)){
      var result = [];
      for(var i=0 ; i<Math.ceil(data.length/size);i++)
        result.push(i)
      return result;
    }else
      return data;
  }
});
/*
pageCount filter is a dirty —but convenient— hack. The ng-repeat directive makes it easy to generate
content, but it works only on data arrays. You can’t, for example, have it repeat a specified number of times. My filter
works out how many pages an array can be displayed in and then creates an array with that many numeric values. So,
for example, if a data array can be displayed in three pages, then the result from the pageCount filter would be an array
containing the values 1, 2, and 3. You’ll see why this is useful in the next section.
*/
