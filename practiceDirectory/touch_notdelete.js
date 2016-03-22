#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let path = require('path')

function* touch() {
	let filename = process.argv[2] ? process.argv[2] : __filename
	let newtime = new Date()
	let fileopen = yield fs.open(path.join(process.cwd(), filename), 'a')
	yield fs.utimes(filename, newtime, newtime)
}

module.exports = touch
