'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Book Schema
 */
var BookSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Book name',
		trim: true
},
	description: {
        type: String,
        default: '',
        // types have specific functions e.g. trim, lowercase, uppercase (http://mongoosejs.com/docs/api.html#schema-string-js)
        trim: true
    },
    author: String,
    year: Number,
    pages: Number,
    link: String,
    similar: {
        type: String,
        default: ''
    },
    similarimg: {
        type: String,
        default: ''
    },
    similarlink: {
        type: String,
        default: ''
    },
    similar2: {
        type: String,
        default: ''
    },
    similarimg2: {
        type: String,
        default: ''
    },
    similarlink2: {
        type: String,
        default: ''
    },
    similar3: {
        type: String,
        default: ''
    },
    similarimg3: {
        type: String,
        default: ''
    },
    similarlink3: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
	created: {
		type: Date,
		default: Date.now
	},
	comments: {
            type: Schema.ObjectId,
            ref: 'Comment'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}

});

mongoose.model('Book', BookSchema);