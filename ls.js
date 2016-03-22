#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

// have question

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
			} else if (recursive) {
				promises.push(ls(fullPath, recursive))
				}
				else {  // no -R
					//console.log(fullPath)  // comment this to undisplay directories
					//if(fullPathStat.isFile()) {
						//if (fullPathStat.isFile()) { console.log(fileName) }
					//}
					//promises.push(ls(fullPath, false))
					console.log(fileName)
				}
			}
		yield Promise.all(promises)
	}
})

function* main() {
    yield ls(process.argv[2], argv.R ? true: false)
}

module.exports = main