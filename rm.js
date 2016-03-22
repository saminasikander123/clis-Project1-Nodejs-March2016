#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let co = require('co')
let path = require('path')
let argv = require('yargs').argv
//let dir = argv.dir || __dirname


let rm = co.wrap(function* (rootpath) {
	let pathstat = yield fs.stat(rootpath)
	if(pathstat.isFile()) {
		yield fs.unlink(rootpath)
	} else {
		let fileNames = yield fs.readdir(rootpath)
		let promises = []
		for(let fileName of fileNames) {
			promises.push(rm(path.join(rootpath, fileName)))
		}
		yield Promise.all(promises)
		yield fs.rmdir(rootpath)
	}
})

function* main() {
    yield rm(process.argv[2])
}

module.exports = main
