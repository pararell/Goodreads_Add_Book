'use strict';

// Configuring the Articles module
angular.module('books').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Add your own Book recommendation', 'create');
	}
]);