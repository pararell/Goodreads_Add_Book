'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Book = mongoose.model('Book'),
	Comment = mongoose.model('Comment'),
	xml2js = require('xml2js'),
	request = require('request'),
	_ = require('lodash');
