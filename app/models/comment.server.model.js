'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var CommentSchema = new Schema({
	body: String,

	created: {
		type: Date,
		default: Date.now
	},

	book: {
		 type: Schema.Types.Mixed,
		 ref: 'Book'

	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}

});

mongoose.model('Comment', CommentSchema);