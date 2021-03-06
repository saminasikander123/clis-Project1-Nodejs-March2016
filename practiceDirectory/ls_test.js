#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let co = require('co')
let path = require('path')
let argv = require('yargs').argv

let ls = co.wrap(function* (rootPath, recursive) {
	let pathStat = yield fs.stat(rootPath)
	if(pathStat.isFile()) {
		console.log(rootPath)
	} else {
		let fileNames = yield fs.readdir(rootPath)
		let promises = []
		for(let fileName of fileNames) {
			let fullPath = path.join(rootPath, fileName)
			let fullPathStat = yield fs.stat(fullPath)
			if(fullPathStat.isFile()) {
				console.log(fullPath)
				/* if (recursive) {
				 	console.log(fullPath)
				 } else {
				 	console.log(fileName)
				 } */
			} else if (recursive) {
			// } else {	
				promises.push(ls(fullPath, recursive))
			}
			//else {
				// promises.push(ls(fullPath, true))
			//	promises.push(ls(rootPath, true))

			//}
		}
		yield Promise.all(promises)
	}
})

function* main() {
    yield ls(process.argv[2], argv.R ? true: false)
}

module.exports = main