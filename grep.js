#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let co = require('co')
let path = require('path')

let grep = co.wrap(function* (searchString, file) {
	let fileContent = yield fs.readFile(file, 'utf8')
	for(let line of fileContent.split('\n')) {
		if(line.match(searchString)) {
			console.log(line)
		}
	}

})

function* main() {
    yield grep(process.argv[2], process.argv[3])
}

module.exports = main