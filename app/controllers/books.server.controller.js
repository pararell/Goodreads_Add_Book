'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Book = mongoose.model('Book'),
	Comment = mongoose.model('Comment'),
	xml2js = require('xml2js'),
	request = require('request'),
	_ = require('lodash');

/**
 * Create a Book
 */



exports.create = function(req, res, next) {

  var parser = xml2js.Parser({
    explicitArray: false,
    normalizeTags: true
  });

  var bookTitle = req.body.title
  .replace(/ /g, '+');

	request('https://www.goodreads.com/book/title.xml?key=kD2KObyo4cN4uLQmc7yQ&title=' + bookTitle , function (error, response, body) {
    if (!error && response.statusCode === 200) {
    	parser.parseString(body, function(err, result) {
        var vysledok = result.goodreadsresponse.book;
        var similarbok = result.goodreadsresponse.book.similar_books;
        var autor = result.goodreadsresponse.book.authors.author.name;
        if(!autor){
        	var autor = result.goodreadsresponse.book.authors.author[0].name;
        };
       var meno = vysledok.title;
       var popis = vysledok.description.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
console.log(vysledok);
var showww1 = result.goodreadsresponse.book.similar_books;
if(showww1){
var showimgg = showww1.book[0].small_image_url;
var showww = showww1.book[0].title;
var showwwlink = showww1.book[0].link;
var showimgg2 = showww1.book[1].small_image_url;
var showww2 = showww1.book[1].title;
var showwwlink2 = showww1.book[1].link;
var showimgg3 = showww1.book[2].small_image_url;
var showww3 = showww1.book[2].title;
var showwwlink3 = showww1.book[2].link;
console.log(showww);
};
        var book = new Book({title : meno, description: popis, image: vysledok.image_url, author: autor, year: vysledok.publication_year, pages: vysledok.num_pages, link: vysledok.url, similar: showww, similarimg: showimgg, similarlink: showwwlink, similar2: showww2, similarimg2: showimgg2, similarlink2: showwwlink2, similar3: showww3, similarimg3: showimgg3, similarlink3: showwwlink3 });
	book.user = req.user;

	book.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(book);
		}
	});

    });
}
});

		
};

/**
 * Show the current Book
 */
exports.read = function(req, res, next) {
	req.book.populate('comments', function(err, book){
		if (err) { return next(err); }
	res.jsonp(book);
});
};

/**
 * Update a Book
 */
exports.update = function(req, res) {
	var comment = req.comment;

	comment = _.extend(comment , req.body);

	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comment);
		}
	});
};

/**
 * Delete an Book
 */
exports.delete = function(req, res) {
	var book = req.book ;

	book.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(book);
		}
	});
};

/**
 * List of Books
 */
exports.list = function(req, res) { 
	var query = Book.find();
	if(req.query.alphabet) {
		 query.where({ title: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
			}
	query.sort('-created').populate('user', 'displayName').exec(function(err, books) {
		
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(books);
		}
	});
};




/**
 * Book middleware
 */
exports.bookByID = function(req, res, next, id) { 
	Book.findById(id).populate('user', 'displayName').populate('comments', 'body').exec(function(err, book) {
		if (err) return next(err);
		if (! book) return next(new Error('Failed to load Book ' + id));
		req.book = book ;
		next();
	});
};

/**
 * Book authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.book.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};


exports.comment = function(req, res, next) {
	var comment = new Comment(req.body);
	comment.book = req.book;
	comment.user = req.user;

	comment.save(function(err, comment){
		 if(err){ return next(err); }

		 	res.jsonp(comment);
		
	});
};


exports.hasAuthorization2 = function(req, res, next) {
	if (req.comment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.commentByID = function(req, res, next, id){
Comment.findById(id).exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }
    req.comment = comment;
    return next();
  });
};


exports.deletecom = function(req, res) {
	var comment = req.comment ;

	comment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comment);
		}
	});
};

exports.coment = function(req, res) {
	Comment.find().populate('user', 'displayName').exec(function(err, comment) {
	if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
	res.json(comment);
}
	});
};

