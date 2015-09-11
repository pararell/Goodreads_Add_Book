'use strict';

//Books service used to communicate Books REST endpoints
angular.module('books').factory('Books', [ '$http' , '$resource',
	function( $http, $resource) {
		
		return $resource('books/:bookId', { bookId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
     

	}
]);


angular.module('books').factory('Comments', [ '$resource',
function( $resource) {

		return $resource('books/:bookId/comments/:commentId', { bookId: '@book._id', commentId: '@id'
		}, {
			update: {
				method: 'PUT'
			}, del: {
				method: 'DELETE'
			}
		});
     

	}
]);



angular.module('books').factory("API", function APIFactory($http) {
  var url;
  var proxyURL = 'http://localhost:3000/';
  var apiKey = 'kD2KObyo4cN4uLQmc7yQ';
  var callbackName = 'JSON_CALLBACK';
  
  return {
    search: function(query, type) {
      url = "/search/index.xml";
      return $http.jsonp(url, {params: {'key': apiKey, q: query, 'search[field]': type, 'jsonCallback': callbackName}});
    },
    searchAuthor: function(authorName) {
      url = proxyURL + "api/author_url/" + encodeURIComponent(authorName);
      return $http.jsonp(url, {params: {'key': apiKey, 'jsonCallback': callbackName}});
    },
    searchReviews: function (title, author, rating) {
      url = proxyURL + "book/title.xml";
      return $http.jsonp(url, {params: {'key': apiKey, 'title': title, 'author': author, 'rating': rating, 'jsonCallback': callbackName}});
    },
    reviewStats: function (isbns) {
      url = proxyURL + "book/review_counts.json";
      return $http.jsonp(url, {params: {'key': apiKey, isbns: isbns, format: 'json', 'jsonCallback': callbackName}});
    },
    findAGroup: function (group) {
      url = proxyURL + "group/search.xml";
      return $http.jsonp(url, {params: {'key': apiKey, q: group, 'jsonCallback': callbackName}});
    },
    recentReviews: function () {
      url = proxyURL + "review/recent_reviews.xml";
      return $http.jsonp(url, {params: {'key': apiKey, 'jsonCallback': callbackName}});
    }
  };
});