'use strict';
var xml2js = require('xml2js'),
	request = require('request'),
	_ = require('lodash');


module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller'),
	books = require('../../app/controllers/books.server.controller');
	
	

	// Books Routes
	app.route('/books')
		.get(books.list)
		.post(users.requiresLogin, books.create);

	app.route('/books/:bookId')
		.get(books.read)
		.put(users.requiresLogin, books.update)
		.delete(users.requiresLogin, books.hasAuthorization, books.delete);

app.route('/books/:bookId/comments')
		.post(users.requiresLogin, books.comment)
		.get(books.coment);

    app.route('/books/:bookId/comments/:commentId')
    .delete(users.requiresLogin, books.deletecom);





	// Finish by binding the Book middleware
	app.param('bookId', books.bookByID);
	app.param('commentId', books.commentByID);




// proxy routes to Goodreads API, since it mostly doesn't support JSONP currently

  app.get('/search/index.xml', function(req, res) {

var parser = xml2js.Parser({
    explicitArray: false,
    normalizeTags: true
  });

  function constructUrl() {
  var host = 'https://www.goodreads.com/search/index.xml?key=kD2KObyo4cN4uLQmc7yQ&q=' + req.params.query;

        return host;
    }



request.get(constructUrl(), function(error, response, body) {
if (!error && response.statusCode === 200) {
res.type('application/javascript');
parser.parseString(body, function(err, result) {
          console.log(result);
   var datov = result.goodreadsresponse.search.query;
        
         console.log(datov);

 });
};
});
  });
    
   
};


