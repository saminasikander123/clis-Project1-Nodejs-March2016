#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise

function* echo() {
    // Use 'yield' in here
    // Your implementation here
    let data = process.argv[2] ? process.argv[2] : 'Default: Hello World'
    process.stdout.write(data + '\n')
    // console.log(yield fs.readFile(__filename, console.log))
}

module.exports = echo
