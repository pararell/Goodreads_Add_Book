'use strict';

//Setting up route
angular.module('books').config(['$stateProvider',
	function($stateProvider) {
		// Books state routing
		$stateProvider.
		state('listBooks', {
			url: '/',
			templateUrl: 'modules/books/views/list-books.client.view.html'
		}).
		state('createBook', {
			url: '/create',
			templateUrl: 'modules/books/views/create-book.client.view.html'
		}).
		state('viewBook', {
			url: '/:bookId/view',
			templateUrl: 'modules/books/views/view-book.client.view.html'
		}).
		state('editBook', {
			url: '/:bookId/edit',
			templateUrl: 'modules/books/views/edit-book.client.view.html'
		}).
		state('viewComments', {
			url: '/:bookId/comments'
		}).
		state('comment', {
			url: '/:bookId/comments/:commentId'
		}).
		state('search', {
			url: '/search',
			templateUrl: 'modules/books/views/create-book.client.view.html'
		});
	}
]);