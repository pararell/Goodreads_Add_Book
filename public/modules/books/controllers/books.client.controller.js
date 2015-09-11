'use strict';

// Books controller
angular.module('books').controller('BooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Books', 'Comments',
	function($scope, $stateParams, $location, Authentication, Books, Comments) {
		$scope.authentication = Authentication;
		$scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

        $scope.pageChanged = function() {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
       };

       $scope.alphabet = ['A-Z 0-9', '0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'];

           $scope.filterByAlphabet = function(char) {
            $scope.books = Books.query({ alphabet: char });
            $scope.headingTitle = char;
        };
   


		// Create new Book
		$scope.create = function() {


			// Create new Book object
			var book = new Books ({
				title: this.title,
				description: this.description,
				image: this.image,
				year: this.year,
				author: this.author,
				pages: this.pages,
				link: this.link,
				similar: this.similar,
				similarimg: this.similarimg,
				similarlink: this.similarlink,
				similar2: this.similar2,
				similarimg2: this.similarimg2,
				similarlink2: this.similarlink2,
				similar3: this.similar3,
				similarimg3: this.similarimg3,
				similarlink3: this.similarlink3
			});

			// Redirect after save
			book.$save(function(response) {
				$location.path('/');

				// Clear form fields
				$scope.title = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		// Remove existing Book
		$scope.remove = function(book) {
			if ( book ) { 
				book.$remove();

				for (var i in $scope.books) {
					if ($scope.books [i] === book) {
						$scope.books.splice(i, 1);
					}
				}
			} else {
				$scope.book.$remove(function() {
					$location.path('/');
				});
			}
		};




		// Find a list of Books
		$scope.find = function() {
			$scope.books = Books.query();
		};

		// Find existing Book
		$scope.findOne = function() {
			$scope.book = Books.get({ 
				bookId: $stateParams.bookId
			});
			var book = $scope.book;
			
		$scope.comments = Comments.query({
				bookId: $stateParams.bookId
		});
		};



	$scope.comment = function(comment){
		var book = $scope.book;
	
		var comment = new Comments ({
			body: this.body,
			book: this.book
		});

		comment.$save(function(response) {

		location.path('/' + book._id);
		});

		$scope.body = '';
		$scope.comments.push(comment);
		};
	
		
		


// Update existing Book
		$scope.update = function(book) {
			var comment = Comments.update({
				bookId: $stateParams.bookId,
				body: this.body
			});

			comment.$update(function() {
				$location.path('books/' + book._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			 $scope.displayForm = true;
		};


	$scope.deletecom = function(id, comment) {
	
		Comments.del({
    		bookId: $stateParams.bookId,
    	 	commentId: id
		});

  	  for (var i in $scope.comments) {
					if ($scope.comments [i] === comment) {
						$scope.comments.splice(i, 1);
					}
				}
			};


		

		$scope.bookSearch = function(book) {
            $location.path('/' + book._id + '/view');
        };
	}


]);





angular.module('books').controller('GoodreadsCtrl', ['$scope', 'API',
	function($scope, API) {


 $scope.results = [];
    
    $scope.search = function(query, type) {
   
      type = type || "all";
      console.log( 'searching...', query, type );

  	
      API.search(query, type)
      .then(function(data) {
        $scope.results = data.GoodreadsResponse.search ;
        console.log( $scope.results );
        
      });

    };




 }

]);

