/* @flow */

var fs = require("fs")
var path = require("path")
var jade = require("jade")
var express = require("express")

module.exports = function(pathToWorkingDir){
	var app = express()
	app.locals.path = pathToWorkingDir
	app.locals.config = require(path.resolve(app.locals.path, "config.js"))


	// this function provides the HTML code, which one will be displayed to the page
	app.html = function() {
		var layoutPath = path.resolve(app.locals.path, app.locals.config.layout)
		return jade.compileFile(layoutPath)(app.locals)
	}

	// here we can return LESS css, which will only effect the page HTML code
	app.less = function(){
		var lessPath = path.resolve(app.locals.path, app.locals.config.less)
		return fs.readFileSync(lessPath).toString()
	}


	return app
}
