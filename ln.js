#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let co = require('co')
let path = require('path')

let ln = co.wrap(function* (source, target) {
	yield fs.symlink(source, target)
})

function* main() {
    yield ln(process.argv[2], process.argv[3])
}

module.exports = main